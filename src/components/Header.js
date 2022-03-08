import React from "react";
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
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </AppContext.Consumer>
    );
  };
  
  export default Header;