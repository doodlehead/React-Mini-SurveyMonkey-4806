import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
});

const Answered = () => {
  const classes = useStyles();

  return (
    <div>
      <h2>Thank you for answering the survey</h2>
      <a href="/">Click here to go to Home</a>
    </div>
  );
};

export default Answered;