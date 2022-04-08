import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import AppContext from "../contexts/AppContext";
import RestClient from '../utils/RestClient';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {setMessage, setLoggedIn } = React.useContext(AppContext);
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
  
  const handleLogin = async (event) => {
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
      RestClient.login({ username, password })
      .then(res => {
        window.localStorage.setItem('login', 'true')
        navigate('/survey');
        setLoggedIn(true);
      }).catch(err => setMessage?.({
        text: 'Login Failed',
        severity: 'error'
      }))
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid>
        <h1> Login </h1>
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
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;