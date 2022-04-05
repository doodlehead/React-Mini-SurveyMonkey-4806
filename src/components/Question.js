import React from 'react'
import {
  IconButton,
  Typography,
  InputLabel,
  Box,
  Select,
  MenuItem,
  FormControl,
  TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Question = ({ question, displayType, onDelete, onEdit, onAnswer, answers }) => {
  if (displayType === "display") {
    const renderQuestionDetails = () => {
      if (question.type === 'MC') {
        return <>
          <Box>Choices:</Box>
          {question.choices.map((c, i) => <Box key={i}>{c}</Box>)}
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
        <Typography sx={{ flexGrow: 1 }} component="div">
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
  } else if (displayType === "answer") {

    const renderQuestionDetails = () => {
      if (question.type === 'MC') {

        return <FormControl fullWidth>
          <InputLabel id="select-label">Select an Answer</InputLabel>
          <Select
            label="Select an Answer"
            onChange={e => onAnswer(e.target.value)}
          >
            {question.choices.map((q, i) =>
              <MenuItem key={i} value={q}>{q}</MenuItem>
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
        <Typography sx={{ flexGrow: 1 }} component="div">
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
          if (value > 0) {
            data.push({name, value}); // Don't show selections with 0 occurences
          }
        }

        if (data.length === 0) {
          return 'No answers collected'
        }
        
        const renderCustomizedLabel = payload => `${payload.payload.name} (${payload.payload.value})`

        return <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => 
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

      } else if (question.type === 'RANGE') {
        // Return a histogram for range questions
        const d = {};
        // One bin for each integer in the range
        for (let i = question.min; i <= question.max; i++){
          d[i] = 0;
        }
        // Count occurences
        for (const i of answers){
          d[i] += 1;
        }

        const data = [];
        for (const [name, value] of Object.entries(d)) {
          data.push({name, value});
        }

        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
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
          </ResponsiveContainer>
        )
      } else {
        return answers.map((a, i) => <Box key={i}>{a}</Box>)
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
        <Typography sx={{ flexGrow: 1, width: 0 }} component="div">
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