import React, {useState} from "react";
import {
  Grid,
  Button,
  FormControl,
  TextField,
} from "@mui/material";

import RestClient from '../utils/RestClient';
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Register = () => {
  const navigate = useNavigate();
  
  const {setMessage} = React.useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleUserChange = e => {
    if (e.target.value) {
      delete errors.username
      setErrors({...errors})
    }
    setUsername(e.target.value)
  }

  const handlePassChange = e => {
    if (e.target.value) {
      delete errors.password
      setErrors({...errors})
    }
    setPassword(e.target.value)
  }

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username) {
      errors.username = 'Username cannot be empty'
      setErrors({...errors})
    } else {
      delete errors.username
      setErrors({...errors})
    }

    if (!password) {
      errors.password = 'Password cannot be empty'
      setErrors({...errors})
    } else {
      delete errors.password
      setErrors({...errors})
    }

    if (username && password) {
      RestClient.register({ username, password }).then(res => {
        navigate('/login');
      }).catch(err => setMessage?.({
        text: 'Registered Failed',
        severity: 'error'
      }))
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid>
        <h1> Register </h1>
        <Grid>
          <FormControl margin="normal" required>
            <TextField
              error={errors?.username}
              helperText={errors?.username}
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              onChange={handleUserChange}
            />
          </FormControl>
        </Grid>
        <FormControl margin="normal" required>
          <TextField
            error={errors?.password}
            helperText={errors?.password}
            label="password"
            aria-label="password"
            type="password"
            name="password"
            onChange={handlePassChange}
          />
        </FormControl>
        <Grid>
          <Button type="submit" variant="contained" size="large">
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;