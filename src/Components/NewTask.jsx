import { Box, Select, TextField, MenuItem, InputLabel, FormControl, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

const NewTask = ()=>{
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('Pending')
    const [data, setData] = useState([]);
    const onTitleChange = (e)=>{
        setTitle(e.target.value);
    }
    const onDescChange = (e)=>{
        setDesc(e.target.value);
    }
    const onDateChange = value =>{
        setDate(value);
    }
    const onStatusChange = (e)=>{
        setStatus(e.target.value);
    }
    const onSaveHandler = (e) =>{
        e.preventDefault();
        let newData = {title,desc,date,status}
        let updatedData = [...data];
        updatedData.push(newData);
        setData(updatedData);
        localStorage.setItem('taskData',JSON.stringify(updatedData))
        console.log(updatedData);
    }

    useEffect(()=>{
        if(title.trim().length>0 && date.$d != 'Invalid Date'){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }

    },[title,date])

    useEffect(()=>{
        let localData = JSON.parse(localStorage.getItem('taskData'));
        if(localData){
            setData(localData)
        }
    },[])

    return <Box sx={{display:"flex", flexDirection: 'column', alignItems:'center', justifyContent:'center', gap:1.5 }}>
        <Typography variant="h3">Add New Task</Typography>
        <TextField label='Title' variant="standard" required onChange={onTitleChange} />
        <TextField label='Description' variant="standard" onChange={onDescChange} />
        <DatePicker sx={{width:200}} onChange={onDateChange} />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
        fullWidth
        labelId="status-label"
          id="status"
          value={status}
          label="Status"
          onChange={onStatusChange}
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
        </FormControl>
        <Button disabled={disabled} onClick={onSaveHandler} variant="outlined">Save New task</Button>
    </Box>
}

export default NewTask;