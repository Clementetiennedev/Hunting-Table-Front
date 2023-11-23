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
    {field: 'id', headerName: 'Jour', flex: 1},
    {field: 'title', headerName: 'Titre', flex: 1},
    {field: 'date', headerName: 'Date', flex: 1},
    {field: 'hunter_id', headerName: 'Animaux prélever', flex: 1},
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
    hunts: [],
    availableHunts: [],
    id: '',
    title: '',
};

class HistoriqueDesChasses extends React.Component {
    state = DEFAULT_STATE;

    componentDidMount() {
        HuntingTableService.getHunts().then((res) => {
            this.setState({
                availableHunts: res.data,
            });
        }).catch((error) => {
            console.log(error);
        });

        this.setState({
            id: this.props.id,
            title: this.props.title
        }, this.updateData);
    }
    
    updateId = (model) => {
        this.setState({ id: model.target.value });
    }
    
    updateTitle = (model) => {
        this.setState({ title: model.target.value });
    }

    updateData = () => {
        const { page, limit, id, title } = this.state;
    
        this.setState({ loading: true }, () => {
            HuntingTableService.getPageOfHunt({ page, limit, id, title })
                .then(res => {
                    const hunts = Array.isArray(res.data.data) ? res.data.data : [];
                    this.setState({ hunts, loading: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loading: false });
                });
        });
    };
    

    resetFiltersAndUpdateData = () => {
        this.setState({...DEFAULT_STATE, availableHunts: this.state.availableHunts}, this.updateData);
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
                    }}>Historique Des Chasses</h2>
                </div>
                    <FormControl sx={{my: 1, mx: 0.5, width: 400}}>
                        <TextField 
                          id="outlined-search"
                          label="Jour"
                          type="search"
                          value={this.state.id}
                          onChange={this.updateId}
                          />
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5, width: 600}}>
                    <TextField 
                          id="outlined-search"
                          label="Titre"
                          type="search"
                          value={this.state.title}
                          onChange={this.updateTitle}
                          />
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5}}>
                        <Button variant="outlined" style={{minHeight: '56px'}} onClick={this.updateData} size="large">Search</Button>
                    </FormControl>

                    <FormControl sx={{my: 1, mx: 0.5}}>
                        <Button color="warning" variant="outlined" style={{minHeight: '56px'}} onClick={this.resetFiltersAndUpdateData} size="large">Reset</Button>
                    </FormControl>

                    <DataGrid
                        rows={this.state.hunts || []}
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

export default HistoriqueDesChasses;