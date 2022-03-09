import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Form to create a new survey
const NewSurveyDialog = ({ open, handleClose, handleSubmit }) => {
  const [name, setName] = useState('')

  const handleChange = e => {
    setName(e.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Create new survey</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Name your survey
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Survey name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(name)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSurveyDialog