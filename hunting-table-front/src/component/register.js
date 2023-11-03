import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [selectedValue, setSelectedValue] = useState();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
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
                    value="Chasseur"
                    control={<Radio color="primary" />}
                    label="Chasseur"
                    labelPlacement="start"
                />
                <FormControlLabel
                  value="Société"
                  control={<Radio color="primary" />}
                  label="Société de chasse"
                  labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
        {selectedValue === 'Société' && (
        <TextField
          id="outlined-name-input"
          label="Name"
          type="text"
          required
        />
      )}
        <Button variant="contained" type="submit" style={{backgroundColor: '#8D664C'}}>
          Register
        </Button>
      </Stack>
    </div>
  );
};

export default Register;