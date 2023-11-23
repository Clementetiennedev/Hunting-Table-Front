import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import HuntingTableService from '../../service/HuntingTableService';

const columns = [
    {field: 'id', headerName: 'Numéro de société', flex: 1},
    {field: 'name', headerName: 'Nom', flex: 1},
    {field: 'dept', headerName: 'Département', flex: 1},
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
    page: 1,
    societies: [],
    availableSocieties: [],
    id: '',
    name: '',
};

class Societe extends React.Component {
    state = DEFAULT_STATE;

    componentDidMount() {
      HuntingTableService.getSocieties().then((res) => {
          this.setState({
            availableSocieties: res.data,
          });
      }).catch((error) => {
          console.log(error);
      });

      this.setState({
          id: this.props.id,
          name: this.props.name
      }, this.updateData);
  }
    
    updateId = (model) => {
        this.setState({id: model.target.value});
    }

    updateName = (model) => {
        this.setState({name: model.target.value});
    }

    updateData = () => {
      const { page, limit, id, name } = this.state;

      this.setState({ loading: true }, () => {
          HuntingTableService.getPageOfSociety({ page, limit, id, name })
              .then(res => {
                  const societies = Array.isArray(res.data.data) ? res.data.data : [];
                  this.setState({ societies, loading: false });
              })
              .catch((error) => {
                  console.log(error);
                  this.setState({ loading: false });
              });
      });
    };

    resetFiltersAndUpdateData = () => {
        this.setState({...DEFAULT_STATE, availableSocieties: this.state.availableSocieties}, this.componentDidMount);
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack
                component="form"
                sx={{
                    width: '1300px',
                    textAlign: 'center',
                  }}
                spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"
                noValidate
                autoComplete="off"
                >
                <div>       
                    <h2 style={{
                        width: '1300px',
                        textAlign: 'center',
                    }}>Recherche de société</h2>
                </div>
                    <FormControl sx={{my: 1, mx: 0.5, width: 325}}>
                        <TextField 
                          id="outlined-search"
                          label="Numéro société"
                          type="search"
                          value={this.state.id}
                          onChange={this.updateId}
                          />
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5, width: 325}}>
                    <TextField 
                          id="outlined-search"
                          label="Nom"
                          type="search"
                          value={this.state.name}
                          onChange={this.updateName}
                          />
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5, width: 325}}>
                    <TextField 
                          id="outlined-search"
                          label="Département"
                          type="search"
                          value={this.state.name}
                          onChange={this.updateName}
                          />
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5}}>
                        <Button variant="outlined" style={{minHeight: '56px'}} onClick={this.updateData} size="large">Search</Button>
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5}}>
                        <Button color="warning" variant="outlined" style={{minHeight: '56px'}} onClick={this.resetFiltersAndUpdateData} size="large">Reset</Button>
                    </FormControl>

                    <DataGrid
                        rows={this.state.societies}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 10,
                            },
                          },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        loading={this.state.loading}
                    />
            </Stack>
            </div>
        );
    }
}

export default Societe;