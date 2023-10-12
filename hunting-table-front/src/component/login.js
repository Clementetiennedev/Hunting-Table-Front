import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
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
        <h2>Login</h2>
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
        <Button variant="contained" type="submit" style={{backgroundColor: '#8D664C'}}>
          Login
        </Button>
      </Stack>
    </div>
  );
};

export default Login;