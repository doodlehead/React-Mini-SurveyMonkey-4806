import React from 'react'
import {
  IconButton,
  Typography,
  Button,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Question = ({ question, onDelete, onEdit }) => {

  const renderQuestionDetails = () => {
    if (question.type === 'MC') {
      return <>
        <Box>Choices:</Box>
        {question.choices.map(c => <Box>{c}</Box>)}
      </>

    } else if (question.type === 'RANGE') {
      return <>
        <Box>Min: {question.min}</Box>
        <Box>Max: {question.max}</Box>
      </>
    } else {
      return []
    }
  }

  return (
    <Box
      key={question.id}
      sx={{
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        borderRadius: '4px',
        margin: '12px 0',
        display: 'flex',
        alignItems: 'center'
      }}>
      <Box sx={{ marginLeft: '12px' }}>{question.id}.</Box>
      <Typography sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box>Prompt: {question.question}</Box>
          <Box>Type: {question.type}</Box>
          {renderQuestionDetails()}
        </Box>
      </Typography>
      <IconButton
        color="inherit"
        onClick={() => onDelete(question.id)}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        disabled
        color="inherit"
        onClick={() => onEdit(question.id)}
      >
        <EditIcon />
      </IconButton>
    </Box>
  )
};

export default Question;