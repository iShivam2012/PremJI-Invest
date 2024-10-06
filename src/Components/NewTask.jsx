import { Box, Select, TextField, MenuItem, InputLabel, FormControl, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const NewTask = ()=>{


    return <Box sx={{display:"flex", flexDirection: 'column', alignItems:'center', justifyContent:'center', gap:1.5 }}>
        <Typography variant="h3">Add New Task</Typography>
        <TextField label='Title' variant="standard" />
        <TextField label='Description' variant="standard" />
        <DatePicker sx={{width:200}} />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
        fullWidth
        labelId="status-label"
          id="status"
        //   value={status}
          label="Status"
        //   onChange={handleChange}
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
        </FormControl>
        <Button variant="outlined">Save New task</Button>
    </Box>
}

export default NewTask;