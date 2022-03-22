import React from 'react'
import {
  IconButton,
  Typography,
  Button,
  InputLabel,
  Box,
  Select,
  MenuItem,
  FormControl,
  TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Question = ({ question, display, onDelete, onEdit, onAnswer }) => {
  if (display) {
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
  } else {
    //answer question

    const renderQuestionDetails = () => {
      if (question.type === 'MC') {

        return <FormControl fullWidth>
          <InputLabel id="select-label">Select an Answer</InputLabel>
          <Select
            label="Select an Answer"
            onChange={e => onAnswer(e.target.value)}
          >
            {question.choices.map(q =>
              <MenuItem value={q}>{q}</MenuItem>
            )}
          </Select>
        </FormControl>

      } else if (question.type === 'RANGE') {
          const onRangeChange = e => {
              if (e.target.value > question.max){
                  e.target.value = question.max;
              } else if (e.target.value < question.min){
                  e.target.value = question.min;
              } else {
                  onAnswer(parseInt(e.target.value));
              }
          }
          return <FormControl fullWidth>
              <TextField
                  type="number"
                  inputProps={{
                      max: question.max, min: question.min
                  }}
                  label={`Range ${question.min} to ${question.max}`}
                  onChange={e => onRangeChange(e)}
              />
          </FormControl>
      } else {
        return <FormControl fullWidth>
        <TextField
          label="Fill in"
          onChange={e => onAnswer(e.target.value)}
        />
      </FormControl>
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
            <h3>{question.question}</h3>
            <Box px={5}>{renderQuestionDetails()}</Box>

          </Box>
        </Typography>
      </Box>
    )
  }

};

export default Question;