import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import HuntingTableService from '../service/HuntingTableService';
import { useNavigate } from 'react-router';
import { MuiTelInput } from 'mui-tel-input'

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [role_id, setRole] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  // const [phoneHunter, setPhoneHunter] = useState();
  // const [phoneSociety, setPhoneSociety] = useState();
  const [federations, setFederations] = useState([]);
  const [federation_id, setFederationId] = useState(null);

  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };


  const handleChange = (newPhone) => {
      setPhone(newPhone)
    }

  // const handleChangeTelSociety = (newPhone) => {
  //   setPhoneSociety(newPhone)
  // }

  // const handleChangeTelHunter = (newPhone) => {
  //   setPhoneSociety(newPhone)
  // }

  useEffect(() => {
    // Récupérer les fédérations lors du montage du composant
    HuntingTableService.getFederations()
      .then((response) => {
        setFederations(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des fédérations:', error);
      });
  }, []);

  const register = (event) => {
    event.preventDefault();
    HuntingTableService.register({ email, password, confirm_password, role_id, name, description, firstName, lastName, phone, federation_id })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/');
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
    <div style={{ marginTop: '8%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', padding: '10vh' }}>
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
        <h2>Inscription</h2>
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
        <TextField
          id="outlined-confirm-password-input"
          label="Confirmation mot de passe"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <FormControl component="fieldset">
            <RadioGroup row aria-label="Account" name="Account" onChange={handleRadioChange} required>
                <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Chasseur"
                    labelPlacement="start"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label="Société de chasse"
                  labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
        {role_id === '3' && (
          <React.Fragment>
            <TextField
              id="outlined-name-input"
              label="Nom de la société"
              type="text"
              onChange={e => setName(e.target.value)}
              required
            />
            <TextField
             id="outlined-description-input"
             label="Description"
             multiline
             rows={3}
             type="text"
             onChange={e => setDescription(e.target.value)}
             required
            />
            {/* <MuiTelInput
             id="outlined-phoneS-input"
             label="Téléphone"
             value={phoneSociety}
             onChange={e => setPhoneSociety(e.target.value)}
             required
            /> */}
            <MuiTelInput value={phone} onChange={handleChange} />
            <Select
              labelId="federation-label"
              id="federation-select"
              value={federation_id}
              onChange={(e) => setFederationId(e.target.value)}
              required
              sx={{ width: '100%' }}
            >
              {federations.map((federation) => (
                <MenuItem key={federation.id} value={federation.id}>
                  {federation.name}
                </MenuItem>
              ))}
            </Select>
          </React.Fragment>
      )}
      {role_id === '2' && (
        <React.Fragment>
        <TextField
          id="outlined-firstname-input"
          label="Prénom"
          type="text"
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <TextField
        id="outlined-lastname-input"
        label="Nom"
        type="text"
        onChange={e => setLastName(e.target.value)}
        required
      />
      <MuiTelInput value={phone} onChange={handleChange} />
        </React.Fragment>

      )}
        <Button variant="contained" type="submit" onClick={register} style={{backgroundColor: '#8D664C'}}>
          Register
        </Button>
      </Stack>
    </div>
  );
};

export default Register;