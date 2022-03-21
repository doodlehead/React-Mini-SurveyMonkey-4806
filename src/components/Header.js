import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { createStyles, makeStyles } from '@mui/styles';
import AppContext from "../contexts/AppContext";
import RestClient from "../utils/RestClient"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    "@media only screen and (min-width: 768px)": {
      title: {
        flexGrow: 1,
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = React.useContext(AppContext);

  const handleLogout = async() => {
    await RestClient.logout();
    setLoggedIn(false);
  }

  return (
    <AppContext.Consumer>
      {({ setShowSidebar }) => (
        <div className="header">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSidebar?.(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                Mini SurveyMonkey
              </Typography>
              {!loggedIn && <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}>Login</Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}>Register</Button>
              </>
              }
              {loggedIn &&
                <Button
                  color="inherit"
                  onClick={() => handleLogout()}>Logout</Button>
              }
            </Toolbar>
          </AppBar>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Header;