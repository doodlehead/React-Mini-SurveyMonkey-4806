import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Box
} from "@mui/material";

import RestClient from '../utils/RestClient';
import AppContext from '../contexts/AppContext';
import Question from '../components/Question';

const AnswerSurvey = () => {
  const appContext = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null)
  const [answer, setAnswer] = useState([]);
  useEffect(() => {
    // Fetch the survey on load
    fetchSurvey()
  }, []);

  // Get current survey and store in state
  const fetchSurvey = () => {
    RestClient.getSurvey(params.surveyId)
      .then(res => {
        setSurvey(res.data)
        setAnswer(Array(res.data.questions.length).fill(null))
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey fetch failed',
        severity: 'error'
      }))
  }

  const answerSurvey = () => {
    RestClient.answerSurvey(params.surveyId, answer)
      .then(res => {
        navigate("/survey")
        appContext.setMessage?.({
          text: 'Survey Answered',
          severity: 'success'
        })
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey Answering failed',
        severity: 'error'
      }))
  }

  const onAnswer = (i, ans) => {
    const answerCopy = [...answer];
    answerCopy[i] = ans;
    setAnswer(answerCopy);
  }

  const renderContent = () => {
    if (survey?.closed) {
      return 'Survey is closed'
    } else if (!survey?.published) {
      return 'Survey is not yet published'
    } else {
      return <Box style={{maxWidth: "50%", marginLeft: "25%"}}>
        {survey?.questions?.map((q, index) =>
        <Question question={q} displayType={"answer"} onAnswer={onAnswer.bind(null, index)}/>)}
        <Button onClick={answerSurvey} disabled={answer.some((ans) => {return ans === null || ans === ""})}>Submit</Button>
      </Box>
    }
  }

  return (
    <Box sx={{ padding: '0 30px' }}>
      <h1>{survey?.name}</h1>
      {renderContent()}
    </Box>
  );
}

export default AnswerSurvey