
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import "./App.scss";
import AppContext from "./contexts/AppContext";
import Header from './components/Header';
import SideNav from './components/SideNav';
import HomePage from './pages/HomePage';
import SurveyList from './pages/SurveyList';
import EditSurvey from "./pages/EditSurvey";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnswerSurvey from "./pages/AnswerSurvey"
import SurveyResults from "./pages/SurveyResults";
import Answered from "./pages/Answered"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    severity: "success",
  });

  const handleCloseMessage = () => {
    setMessage({ text: "", severity: message.severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
  };

  //Show the snackbar when there's a message available
  useEffect(() => {
    if (message?.text) {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [message]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div id="app">
        <AppContext.Provider
          value={{ showSidebar, setShowSidebar, loggedIn, setLoggedIn, setMessage }}
        >
          <Router>
          <Header />
            <div id="appContent">
              <Routes>
                <Route path="/survey" element={<SurveyList />} />
                <Route path="/survey/:surveyId/edit" element={<EditSurvey />} />
                <Route path="/survey/:surveyId" element={<AnswerSurvey/>}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/survey/:surveyId/results" element={<SurveyResults/>} />
                <Route path="/answered" element={<Answered />}/>
              </Routes>
              <SideNav />
            </div>
          </Router>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleCloseMessage}
              severity={message?.severity}
            >
              {message?.text}
            </Alert>
          </Snackbar>
        </AppContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
