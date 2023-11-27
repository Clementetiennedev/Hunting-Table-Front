import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import HuntingTableService from '../service/HuntingTableService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';

const DEFAULT_STATE = {
  animal: '',
  number: '',
  rows: [],
  limit: 10,
  page: 0,
};

const NewHunt = () => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();

  const addToRows = () => {
    const isSpeciesExists = state.rows.some((row) => row.animal === state.animal);
  
    if (!isSpeciesExists && state.animal) {
      const newRow = {
        id: state.animal,
        animal: state.animal,
        number: state.number,
      };
  
      setState((prev) => ({
        ...prev,
        rows: [...prev.rows, newRow],
        animal: '',
        number: '',
      }));
    }
  };
  
const handleDeleteRow = (animal) => {
  console.log('Deleting row with species:', animal);
  const updatedRows = state.rows.filter((row) => row.animal !== animal);
  console.log('Updated rows:', updatedRows);
  setState((prev) => ({ ...prev, rows: updatedRows }));
};

  const handleChangePage = (event, newPage) => {
    setState((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setState((prev) => ({ ...prev, limit: newLimit, page: 0 }));
  };

  const post = async (event) => {
    event.preventDefault();
  
    try {
      const response = await  HuntingTableService.poststore(
        title,
        date,
        description,
        state.rows
      );
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  const columns = [
    { field: 'animal', headerName: 'Espèce chassée', flex: 1 },
    { field: 'number', headerName: 'Nombre d\'animaux prélevés', flex: 1 },
    {
      field: 'details',
      headerName: 'Supprimer',
      sortable: false,
      renderCell: (params) => {
        console.log('Rendering cell for row:', params.row);
        return (
          <IconButton onClick={() => handleDeleteRow(params.row && params.row.animal)}>
          <DeleteIcon />
        </IconButton>
        );
      },
      
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
          }}>Nouvelle chasse</h2>
        </div>
        <TextField
          id="outlined-title-input"
          label="Titre"
          type="text"
          sx={{
            width: '640px',
          }}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          id="outlined-date-input"
          type="date"
          sx={{
            width: '640px',
          }}
          onChange={e => setDate(e.target.value)}
          required
        />
        <TextField
          id="outlined-description-input"
          label="Description"
          multiline
          rows={3}
          sx={{
            width: '1300px',
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
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-specie-input"
            label="Espèce"
            type="Text"
            sx={{
              width: '300px',
            }}
            value={state.animal}
            onChange={(e) => setState((prev) => ({ ...prev, animal: e.target.value }))}
            required
          />
          <TextField
            id="outlined-number-input"
            label="Nombre"
            type="number"
            sx={{
              width: '300px',
            }}
            value={state.number}
            InputProps={{
              inputProps: {
                max: 1000, min: 0,
              },
            }}
            onChange={(e) => setState((prev) => ({ ...prev, number: e.target.value }))}
            required
          />
          <Button onClick={addToRows} variant="contained" style={{ backgroundColor: '#8D664C' }} sx={{ width: '300px' }}>
            Ajouter
          </Button>
        </Stack>

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
              {state.rows
                .slice(state.page * state.limit, state.page * state.limit + state.limit)
                .map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.field} align="left">
                        {column.renderCell ? column.renderCell(row) : row[column.field]}
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
          count={state.rows.length}
          rowsPerPage={state.limit}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Button variant="contained" type="submit" onClick={post} style={{ backgroundColor: '#8D664C' }} sx={{ width: '1300px' }}>
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
};

export default NewHunt;
