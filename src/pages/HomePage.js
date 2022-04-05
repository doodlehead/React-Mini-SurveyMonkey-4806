import React, {useEffect} from "react";
import { makeStyles } from '@mui/styles';
import AppContext from "../contexts/AppContext";
import {Button} from "@mui/material";

const useStyles = makeStyles({
});

const Homepage = () => {
  const classes = useStyles();
  const isLoggedIn = window.localStorage.getItem('login')

  return (
    <div>
      <h1>Welcome to 4806 Mini Survey Monkey</h1>
        {isLoggedIn
            ? <Button
                style={{ fontSize: '2rem' }}
                href="/survey">
                Get Started</Button>
            : <Button
                style={{ fontSize: '2rem' }}
                href="/register">
                Get Started</Button>
        }
    </div>
  );
};

export default Homepage;