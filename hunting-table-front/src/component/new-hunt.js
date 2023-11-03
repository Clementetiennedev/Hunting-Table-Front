import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {DataGrid} from '@mui/x-data-grid';

const NewHunt = () => {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [society, setSociety] = useState();
  const [participant, setParticipant] = useState();
  const [description, setDescription] = useState();
  const [specie, setSpecie] = useState();
  const [number, setNumber] = useState();
  const [rows, setRows] = useState([]);

  const addToRows = () => {
    const newRow = {
      id: generateUniqueId(),
      species: specie,
      number: number,
    };

    setRows([...rows, newRow]);
    console.log(rows)
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };


  const columns = [
    {field: 'species', headerName: 'Espèce chassé', sortable: false, flex: 1},
    {field: 'number', headerName: 'Nombre d\'animal prélevé', sortable: false, flex: 1},
    {field: 'details', headerName: 'Supprimer', sortable: false, renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRow(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

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
        }}>Nouvelle chasse</h2>
        </div>
        <TextField
          id="outlined-title-input"
          label="Titre"
          type="text"
          sx={{
            width: '640px'
          }}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          id="outlined-date-input"
          label=""
          type="date"
          sx={{
            width: '640px'
          }}
          onChange={e => setDate(e.target.value)}
          required
        />
        <TextField
          id="outlined-society-input"
          label="Société"
          type="text"
          sx={{
            width: '640px'
          }}
          onChange={e => setSociety(e.target.value)}
          required
        />
        <TextField
          id="outlined-participant-input"
          label="Participant"
          type="Text"
          sx={{
            width: '640px'
          }}
          onChange={e => setParticipant(e.target.value)}
          required
        />
        <TextField
          id="outlined-description-input"
          label="Description"
          multiline
          rows={3}
          sx={{
            width: '1300px'
          }}
          onChange={e => setDescription(e.target.value)}
          required
        />



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
            <TextField
              id="outlined-select-specie-input"
              label="Espèce"
              type="Text"
              sx={{
                width: '300px'
              }}
              onChange={e => setSpecie(e.target.value)}
              required
            />
            <TextField
              id="outlined-number-input"
              label="Nombre "
              type="number"
              sx={{
                width: '300px'
              }}
              InputProps={{
                inputProps: { 
                    max: 1000, min: 0 
                }
            }}
              onChange={e => setNumber(e.target.value)}
              required
            />
            <Button onClick={addToRows} variant="contained" style={{backgroundColor: '#8D664C'}} sx={{width: '300px'}}>
              Ajouter
            </Button>
        </Stack>



        <DataGrid
                rows={rows}
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
            />
        <Button variant="contained" type="submit" style={{backgroundColor: '#8D664C'}} sx={{width: '1300px'}}>
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
};

export default NewHunt;