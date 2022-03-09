import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Typography,
  Button,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import RestClient from '../utils/RestClient';
import AppContext from '../contexts/AppContext';
import NewSurveyDialog from '../components/NewSurveyDialog';

const useStyles = makeStyles({
});

const SurveyList = () => {
  // const classes = useStyles();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Fetch the surveys on load
    fetchSurveys()
  }, []);

  // Perform GET and save to state
  const fetchSurveys = () => {
    RestClient.getSurveys()
      .then(res => {
        console.log(res)
        setSurveys(res.data)
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey fetch failed',
        severity: 'error'
      }))
  }

  // Delete the selected survey
  const handleDelete = id => {
    RestClient.deleteSurvey(id)
      .then(res => {
        console.log(res)
        fetchSurveys()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey delete failed',
        severity: 'error'
      }))
  }

  const handleEdit = id => {
    navigate(`/survey/${id}`)
  }

  // Render a survey on the surveys page
  const renderSurvey = survey => {
    return (
      <Box
        key={survey.id}
        sx={{
          padding: '10px',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          borderRadius: '4px',
          margin: '12px 40px',
          display: 'flex',
          alignItems: 'center'
        }}>
        <Box sx={{ marginLeft: '12px' }}>{survey.id}.</Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box>{survey.name}</Box>
          <Typography>Number of questions: TODO?</Typography>
          <Typography>Number of responses: TODO?</Typography>
        </Box>
        <IconButton
          color="inherit"
          onClick={() => handleDelete(survey.id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => handleEdit(survey.id)}
        >
          <EditIcon />
        </IconButton>
      </Box>
    )
  };

  const handleSubmit = name => {
    // Perform the REST call
    RestClient.createSurvey(name)
      .then(() => {
        handleClose()
        // Do another GET for surveys
        fetchSurveys()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey creation failed',
        severity: 'error'
      }));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Surveys Page</h1>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen} sx={{ marginBottom: '24px' }}>Create New Survey</Button>
      <NewSurveyDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
      <div>
        {surveys.length === 0 ?
          <Typography variant="body1">No surveys yet</Typography> : surveys.map(renderSurvey)}
      </div>
    </div>
  );
};

export default SurveyList;