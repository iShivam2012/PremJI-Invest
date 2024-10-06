import { Box, Container, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css'
import NewTask from './Components/NewTask'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container>
      <Box sx={{border: '1px dotted black', margin: 4}} > 
        <Typography variant='h2' gutterBottom>Task Management Dashboard</Typography> 
      </Box>
      <NewTask />
    </Container>
    </LocalizationProvider>
  )
}

export default App
