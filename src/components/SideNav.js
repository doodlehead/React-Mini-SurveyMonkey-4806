import React, { useEffect, useContext } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import AppContext from "../contexts/AppContext";


const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const SideNav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(AppContext);

  useEffect(() => {
    setShowSidebar?.(false);
  }, [location]);

  const renderListItems = () => {
    return (
      <div className={classes.list} role="presentation">
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => navigate("/survey")}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Survey"} />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };

  return (
    <Drawer
      anchor={"left"}
      open={showSidebar}
      onClose={() => setShowSidebar?.(false)}
    >
      {renderListItems()}
    </Drawer>
  );
};

export default SideNav;