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
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Question = ({ question, displayType, onDelete, onEdit, onAnswer, answers }) => {
  if (displayType === "display") {
    const renderQuestionDetails = () => {
      if (question.type === 'MC') {
        return <>
            <ol style={{paddingLeft:"1%", marginTop: "0", marginBottom:"0"}}>
                {question.choices.map(c => <li>{c}</li>)}
            </ol>
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
            <Box style={{paddingBottom: "15px", fontSize: "1.5rem"}}>
                Question: <i>"{question.question}"</i></Box>
            <Box style={{paddingBottom: "10px"}}>Type: <b>{question.type}</b></Box>
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
  } else if (displayType === "answer"){

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

              if (e.target.value === ""){
                onAnswer(null);
                return;
              }
              
              if (e.target.value > question.max){
                e.target.value = question.max;
              } else if (e.target.value < question.min){
                e.target.value = question.min;
              }
              onAnswer(parseInt(e.target.value));
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
  } else {
    //show results and graph 
    
    const renderQuestionDetails = () => {
      if (question.type === 'MC') {
        const d = {};
        
        for (const i of question.choices){
          d[i] = 0;
        }
        
        for (const i of answers){
          d[i] += 1
        }

        const data = [];
        for (const [name, value] of Object.entries(d)){
          data.push({name, value});
        }
        
        const renderCustomizedLabel = (payload) => {
          return `${payload.payload.name} (${payload.payload.value})` 
        };

        return <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            isAnimationActive={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
          </Pie>
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#8884d8" />
            ))}
        </PieChart>

      } else if (question.type === 'RANGE') {
        const d = {};
        for (let i = question.min; i <= question.max; i++){
          d[i] = 0;
        }
        for (const i of answers){
          d[i] += 1;
        }

        const data = [];
        for (const [name, value] of Object.entries(d)){
          data.push({name, value});
        }

        return <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      } else {
        return <>
          {answers.map(a =>
              <Box>{a}</Box>
            )}
        </>
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
            <br></br>
            <Box>Answers: </Box>
            <Box>{renderQuestionDetails()}</Box>
          </Box>
        </Typography>
      </Box>
    )
  }

};

export default Question;