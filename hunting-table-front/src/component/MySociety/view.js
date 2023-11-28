import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import HuntingTableService from '../../service/HuntingTableService';
import { useNavigate } from 'react-router';
import { TextField, Button } from '@mui/material';

const Quota = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [animal, setAnimal] = useState();
  const [quota, setQuota] = useState();

  const postQuota = async (event) => {
    event.preventDefault();
  
    try {
      const response = await  HuntingTableService.postQuota(
        title,
        dateStart,
        dateEnd,
        animal,
        quota,
      )
      if (response.status === 200) {
        navigate('/society');
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

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
          }}>Ajouter un Quota</h2>
        </div>
        <TextField
          id="outlined-title-input"
          label="Titre"
          type="text"
          sx={{
            width: '1300px',
          }}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          id="outlined-date-debut-input"
          type="date"
          sx={{
            width: '640px',
          }}
          onChange={e => setDateStart(e.target.value)}
          required
        />
        <TextField
          id="outlined-date-fin-input"
          type="date"
          sx={{
            width: '640px',
          }}
          onChange={e => setDateEnd(e.target.value)}
          required
        />
        <TextField
          id="outlined-animal-input"
          label="Animal"
          sx={{
            width: '640px',
          }}
          onChange={e => setAnimal(e.target.value)}
          required
        />
        <TextField
          id="outlined-number-input"
          label="Quota"
          type="number"
          sx={{
            width: '640px',
          }}
          onChange={e => setQuota(e.target.value)}
          required
        />

        <Button variant="contained" type="submit" onClick={postQuota} style={{ backgroundColor: '#8D664C' }} sx={{ width: '1300px' }}>
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
};

export default Quota;
