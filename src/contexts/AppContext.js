import React from "react";

const AppContext = React.createContext({
  showSidebar: false,
  loggedIn: false
});

export default AppContext;