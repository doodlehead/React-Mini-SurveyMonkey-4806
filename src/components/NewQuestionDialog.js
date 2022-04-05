import React, { useEffect, useState, useContext } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material'
import AppContext from "../contexts/AppContext";

// Form to create a new survey
const NewQuestionDialog = ({ open, handleClose, onSubmit }) => {
  const [qType, setQType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [choices, setChoices] = useState('');
  const [valid, setValid] = useState();
  const appContext = useContext(AppContext);

  // validate min and max values
  useEffect(() => {
    setValid(min && max && (parseInt(max) > parseInt(min)))
  }, [min, max])

  // Return the relevant values
  const handleSubmit = () => {
    let values = {
      question: prompt,
      type: qType,
    };

    if (values.question === "") {
      appContext.setMessage?.({
        text: 'Please enter a question',
        severity: 'error'
      })
      return;
    }

    // Optional fields depending on question type
    if (qType === 'MC') {
      values.choices = choices.split(',').filter(Boolean); // filter ignores empty spaces
      if (values.choices.length > 1) {
        values.choices = values.choices.map(elem => elem.trim())
      } else {
        appContext.setMessage?.({
          text: 'Please enter 2 or more choices',
          severity: 'error'
        })
        return;
      }

    } else if (qType === 'RANGE') {
      values.min = min;
      values.max = max;
    }

    onSubmit?.(values);
  }

  const renderQuestionDetails = () => {
    if (qType === 'TEXT') {
      return;
    } else if (qType === 'MC') {
      return <TextField
        value={choices}
        onChange={e => setChoices(e.target.value)}
        margin="normal"
        label="Question Choices, separated by commas"
        type="text"
        variant="standard"
      />
    } else if (qType === 'RANGE') {
      return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { mr: 1, mb: 1 }
      }}>
        <TextField
          error={!valid}
          helperText={!valid && "Min must be smaller than max"}
          value={min}
          onChange={e => setMin(e.target.value)}
          margin="normal"
          label="Min"
          type="text"
          variant="standard"
        />
        <TextField
          error={!valid}
          helperText={!valid && "Max must be larger than min"}
          value={max}
          onChange={e => setMax(e.target.value)}
          margin="normal"
          label="Max"
          type="text"
          variant="standard"
        />
      </Box>
    } else {
      return;
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Create new survey question</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: '24px' }}>
          Add a new question to your survey.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="select-label">Question type</InputLabel>
          <Select
            name="questionType"
            label="Question type"
            labelId="select-label"
            value={qType}
            onChange={e => setQType(e.target.value)}
          >
            <MenuItem value="MC">Multiple Choice</MenuItem>
            <MenuItem value="TEXT">Text</MenuItem>
            <MenuItem value="RANGE">Range</MenuItem>
          </Select>
          <TextField
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            margin="normal"
            label="Question Prompt"
            type="text"
            fullWidth
            variant="standard"
          />
          {renderQuestionDetails()}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!valid}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewQuestionDialog