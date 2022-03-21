import React from "react";
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
  const {loggedIn, setLoggedIn} = React.useContext(AppContext);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await RestClient.login({ username, password });
    setLoggedIn(true);
    navigate('/home');
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid>
        <h1> Login </h1>

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
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;