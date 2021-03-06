import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  Button,
  Box
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import RestClient from '../utils/RestClient';
import AppContext from '../contexts/AppContext';
import NewQuestionDialog from '../components/NewQuestionDialog';
import Question from '../components/Question';

const EditSurvey = () => {
  const appContext = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Fetch the survey on load
    fetchSurvey()
  }, []);

  // Get current survey and store in state
  const fetchSurvey = () => {
    RestClient.getSurvey(params.surveyId)
      .then(res => {
        console.log(res)
        setSurvey(res.data)
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey fetch failed',
        severity: 'error'
      }))
  }

  // Values is a JSON of the form values
  const handleSubmit = values => {
    console.log(values)
    // Add survey field
    values.survey = {
      id: params.surveyId
    }

    // Create question
    RestClient.createQuestion(values)
      .then(res => {
        console.log(res)
        handleClose()
        fetchSurvey()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Question creation failed',
        severity: 'error'
      }))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuestionDelete = id => {
    RestClient.deleteQuestion(id)
      .then(res => {
        console.log(res)
        fetchSurvey()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Question delete failed',
        severity: 'error'
      }))
  }

  const handleBack = () => {
    navigate('/survey')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 30px' }}>
      <h1>Edit Survey: {survey?.name}</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ mb: 3, flexBasis: '900px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>Back to Survey List</Button>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>Add New Question</Button>
        </Box>
      </Box>
      <NewQuestionDialog open={open} handleClose={handleClose} onSubmit={handleSubmit} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{flexBasis: "900px" }}>
          {survey?.questions?.map((q, i) =>
            <Question key={i} question={q} onDelete={handleQuestionDelete} displayType={"display"} />)}
        </Box>
      </Box>
    </Box>
  );
}

export default EditSurvey