import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import HuntingTableService from '../service/HuntingTableService';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [role_id, setRole] = useState();

  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };

  const register = (event) => {
    event.preventDefault();
    HuntingTableService.register({ name, email, password, confirm_password, role_id })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response['token']);
        navigate('/')
        window.location.reload(); 
      } else {
        console.log('Erreur lors de l\'enregistrement du compte');
      }
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', padding: '10vh' }}>
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
        <h2>Register</h2>
        <TextField
          id="outlined-name-input"
          label="Name"
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <TextField
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <FormControl component="fieldset">
            <RadioGroup row aria-label="Account" name="Account" onChange={handleRadioChange} required>
                <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Chasseur"
                    labelPlacement="start"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="Société de chasse"
                  labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
        {role_id === 'Société' && (
        <TextField
          id="outlined-name-input"
          label="Name"
          type="text"
          required
        />
      )}
        <Button variant="contained" type="submit" onClick={register} style={{backgroundColor: '#8D664C'}}>
          Register
        </Button>
      </Stack>
    </div>
  );
};

export default Register;