import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@mui/material";

import RestClient from '../utils/RestClient';
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Register = (props) => {
  
  const navigate = useNavigate();
  
  const {setMessage} = React.useContext(AppContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    RestClient.register({ username, password }).then(res => {
      navigate('/login');
    }).catch(err => setMessage?.({
      text: 'Registered Failed',
      severity: 'error'
    }))
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid>
        <h1> Register </h1>
        <Grid>
          <FormControl margin="normal" required>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>
        </Grid>
        <FormControl margin="normal" required>
          <TextField
            label="password"
            aria-label="password"
            type="password"
            name="password"
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