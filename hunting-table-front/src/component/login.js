import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HuntingTableService from '../service/HuntingTableService';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = (event) => {
    event.preventDefault();
    HuntingTableService.login({ email, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          console.log('Token après la connexion:', response.data.access_token);
          navigate('/history');
        } else {
          console.log('Erreur lors de l\'enregistrement du compte');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ marginTop: '8%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Stack
        component="form"
        sx={{
          width: '300px',
          textAlign: 'center',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <h2>Connexion</h2>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          id="outlined-password-input"
          label="Mot de passe"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit" onClick={login} style={{backgroundColor: '#8D664C'}}>
          Login
        </Button>
      </Stack>
    </div>
  );
};

export default Login;