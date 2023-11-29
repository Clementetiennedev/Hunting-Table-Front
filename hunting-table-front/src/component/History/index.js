import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import HuntingTableService from '../../service/HuntingTableService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';


const columns = [
    {field: 'title', headerName: 'Titre', flex: 4},
    {field: 'date', headerName: 'Date', flex: 0.5},
    {field: 'details', headerName: 'Details', sortable: false, renderCell: (cellValue) => {
        return <IconButton aria-label="details"
                           color="primary"
                           component={Link}
                           to={`${cellValue.id}`}>
            <ArrowForwardIcon />
        </IconButton>;
    }},
];

const DEFAULT_STATE = {
    loading: false,
    limit: 100,
    page: 0,
    hunts: [],
    availableHunts: [],
};

class HistoriqueDesChasses extends React.Component {
    state = DEFAULT_STATE;

    componentDidMount() {
        this.setState({ loading: true }, () => {
            HuntingTableService.getHuntsForCurrentUser()
              .then((res) => {
                  const hunts = Array.isArray(res.data.data) && res.data.data.length > 0 ? res.data.data[0] : [];
                this.setState({ hunts, loading: false });
              })
              .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
              });
          });
    }

      handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
      };
    
      handleChangeRowsPerPage = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        this.setState({ limit: newLimit, page: 0 });
      };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Stack
                component="form"
                sx={{
                  width: '1300px',
                  textAlign: 'center',
                }}
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                noValidate
                autoComplete="off"
              >
                <div>       
                    <h2 style={{
                        width: '1300px',
                        textAlign: 'center',
                        marginTop: '8%',
                    }}>Historique Des Chasses</h2>
                </div>
                    <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell key={column.field} align="left" style={{ minWidth: column.flex }}>
                                  {column.headerName}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.hunts
                              .slice(this.state.page * this.state.limit, this.state.page * this.state.limit + this.state.limit)
                              .map((hunt) => (
                                <TableRow key={hunt.id}>
                                  {columns.map((column) => (
                                    <TableCell key={column.field} align="left">
                                      {column.renderCell ? column.renderCell(hunt) : hunt[column.field]}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                    </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={this.state.hunts.length}
                  rowsPerPage={this.state.limit}
                  page={this.state.page}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
        </Stack>
      </div>
    );
  }
}

export default HistoriqueDesChasses;