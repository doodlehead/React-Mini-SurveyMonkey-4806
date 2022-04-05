import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  Button,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import RestClient from '../utils/RestClient';
import AppContext from '../contexts/AppContext';
import NewSurveyDialog from '../components/NewSurveyDialog';

const SurveyList = () => {
  // const classes = useStyles();
  const appContext = useContext(AppContext);
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the surveys on load
    fetchSurveys()
  }, []);

  // Perform GET and save to state
  const fetchSurveys = () => {
    RestClient.getSurveys()
      .then(res => {
        setSurveys(res.data)
      })
      .catch(err => {
        if (err.response?.status === 401) {
          window.localStorage.removeItem('login')
          setLoggedIn(false)
          navigate('/login')
          appContext.setMessage?.({
            text: 'You must login to access the Surveys page',
            severity: 'error'
          })
        } else {
          appContext.setMessage?.({
            text: 'Survey fetch failed',
            severity: 'error'
          })
        }
      })
  }

  // Delete the selected survey
  const handleDeleteSurvey = id => {
    RestClient.deleteSurvey(id)
      .then(res => {
        fetchSurveys()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey delete failed',
        severity: 'error'
      }))
  }

  const handleCloseSurvey = id => {
    RestClient.closeSurvey(id)
      .then(res => {
        fetchSurveys();
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey close failed',
        severity: 'error'
      }))
  }

  const handleViewSurveyResults = id => {
    RestClient.getAnswersOfSurvey(id)
      .then(res => {
        navigate(`/survey/${id}/results`);
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey fetch failed',
        severity: 'error'
      }))
  }

  const handleEdit = id => {
    navigate(`/survey/${id}/edit`)
  }

  const renderResultsButton = survey => {
    if (survey.closed) {
      return (
        <IconButton
          color="inherit"
          onClick={() => handleViewSurveyResults(survey.id)}
        >
          <AnalyticsIcon />
        </IconButton>
      )
    } else {
      return (
        <Button onClick={() => handleCloseSurvey(survey.id)}>
          Close
        </Button>
      )
    }
  }

  // Copy to clipboard
  const handleCopy = id => {
    navigator.clipboard.writeText(`${window.location.origin}/survey/${id}`);

    appContext.setMessage?.({
      text: 'Survey link copied to clipboard',
      severity: 'success'
    })
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
        <Button
          sx={{ flexGrow: 1 }}
          onClick={() => handleCopy(survey.id)}
          disabled={survey.closed}>
          {survey.name}
        </Button>
        {
          !survey.published && <IconButton
            title="Publish"
            color="inherit"
            onClick={() => handlePublish(survey.id)}
          >
            <PublishIcon />
          </IconButton>
        }
        <IconButton
          title="Delete"
          color="inherit"
          onClick={() => handleDeleteSurvey(survey.id)}
        >
          <DeleteIcon />
        </IconButton>
        {
          !survey.closed && !survey.published && 
            <IconButton
              title="Edit"
              color="inherit"
              onClick={() => handleEdit(survey.id)}
            >
              <EditIcon />
            </IconButton>
        }
        {renderResultsButton(survey)}
      </Box>
    )
  };

  const handleCreateSurvey = name => {
    // Perform the REST call
    RestClient.createSurvey(name)
      .then(res => {
        setOpen(false);
        navigate(`/survey/${res.data.id}/edit`)
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey creation failed',
        severity: 'error'
      }));
  }

  const handlePublish = id => {
    RestClient.publishSurvey(id)
      .then(res => {
        appContext.setMessage?.({
          text: 'Survey published',
          severity: 'success'
        })
        fetchSurveys()
      })
      .catch(err => appContext.setMessage?.({
        text: 'Survey publish failed',
        severity: 'error'
      }));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Surveys</h1>
      <Box>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ marginBottom: '24px' }}>Create New Survey</Button>
      </Box>
      <NewSurveyDialog open={open} handleClose={() => setOpen(false)} handleSubmit={handleCreateSurvey} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{flexBasis: "900px" }}>
          {surveys.length === 0 ?
            <Typography variant="body1">No surveys yet</Typography> : surveys.map(renderSurvey)}
        </Box>
      </Box>
    </Box>
  );
};

export default SurveyList;