import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';

const columns = [
    {field: 'id', headerName: 'Jour', flex: 1},
    {field: 'name', headerName: 'Titre', flex: 1},
    {field: 'email', headerName: 'Date', flex: 1},
    {field: 'test', headerName: 'Animaux prélever', flex: 1},
    {field: 'details', headerName: 'Details', sortable: false, renderCell: (cellValue) => {
        return <IconButton aria-label="details"
                           color="primary"
                           component={Link}
                           to={`/Brands/${cellValue.id}`}>
            <ArrowForwardIcon />
        </IconButton>;
    }},
];

const DEFAULT_STATE = {
    loading: false,
    limit: 100,
    page: 1,
    brands: [],
    availableBrands: [],
    id: '',
    name: '',
};

class HistoriqueDesChasses extends React.Component {
    state = DEFAULT_STATE;
    
    updateId = (model) => {
        this.setState({id: model.target.value});
    }

    updateName = (model) => {
        this.setState({name: model.target.value});
    }

    resetFiltersAndUpdateData = () => {
        this.setState({...DEFAULT_STATE, availableBrands: this.state.availableBrands}, this.updateData);
    }

    render() {
        return (
            <Stack
            component="form"
            sx={{
                width: '500px',
                textAlign: 'center',
              }}
            spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"
            noValidate
            autoComplete="off"
        >
            <h1>Historique Des Chasses</h1>
                <FormControl sx={{my: 1, mx: 0.5, width: 100}}>
                    <TextField 
                      id="outlined-search"
                      label="Jour"
                      type="search"
                      value={this.state.id}
                      onChange={this.updateId}
                      />
                </FormControl>

                <FormControl sx={{my: 1, mx: 0.5, width: 300}}>
                <TextField 
                      id="outlined-search"
                      label="Titre"
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
                    rows={this.state.brands}
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
        );
    }
}

export default HistoriqueDesChasses;