import { Box, Container, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css'
import NewTask from './Components/NewTask'
import { useState } from 'react';
import TaskList from './Components/TaskList';

function App() {
  const [data, setData] = useState([]);
  const dataHandler = (d) =>{
    setData(d);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container>
      <Box sx={{border: '1px dotted black', margin: 4}} > 
        <Typography variant='h2' gutterBottom>Task Management Dashboard</Typography> 
      </Box>
      <NewTask data={data} dataHandler={dataHandler} />
      <TaskList data={data} setterFunc={setData}/>
    </Container>
    </LocalizationProvider>
  )
}

export default App
