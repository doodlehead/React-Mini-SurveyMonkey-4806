import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Box
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import RestClient from '../utils/RestClient';
import AppContext from '../contexts/AppContext';
import Question from '../components/Question';

const AnswerSurvey = () => {
  const appContext = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null)
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    // Fetch the survey on load
    fetchSurvey()
    fetchAnswers()
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

  const fetchAnswers = () => {
    RestClient.getAnswersOfSurvey(params.surveyId)
      .then(res => {
        console.log(res.data)
        setAnswers(res.data)
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey answers fetch failed',
        severity: 'error'
      }))
  }

  const getAnswers = i => {
    const temp = [];
    for (const a of answers){
      temp.push(a.answer[i])
    }
    return temp;
  }

  const handleBack = () => {
    navigate('/survey')
  }

  return (
    <Box sx={{ padding: '0 30px' }}>
      <h1>{survey?.name}</h1>
      <h3>Total Answers {answers.length}</h3>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>Back to Survey List</Button>
      </Box>
      <Box>
        {survey?.questions?.map((q, index) =>
          <Question question={q} displayType={"results"} answers={getAnswers(index)}/>)}
      </Box>
    </Box>
  );
}

export default AnswerSurvey