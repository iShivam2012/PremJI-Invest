import { Box, Select, TextField, MenuItem, InputLabel, FormControl, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

const NewTask = ({data, dataHandler})=>{
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('Pending')
    const onTitleChange = (e)=>{
        setTitle(e.target.value);
    }
    const onDescChange = (e)=>{
        setDesc(e.target.value);
    }
    const onDateChange = value =>{
        setDate(value.$d.toString());
    }
    const onStatusChange = (e)=>{
        setStatus(e.target.value);
    }
    const onSaveHandler = (e) =>{
        e.preventDefault();
        let id = self.crypto.randomUUID();
        let newData = {id, title, desc, date, status}
        let updatedData = [...data];
        updatedData.push(newData);
        localStorage.setItem('taskData',JSON.stringify(updatedData))
        dataHandler(updatedData);
        setTitle('');
        setDesc('');
        setStatus('Pending');
    }

    useEffect(()=>{
        if(title.trim().length>0 && date && date.$d != 'Invalid Date'){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }

    },[title,date])

    useEffect(()=>{
        let localData = JSON.parse(localStorage.getItem('taskData'));
        if(localData){
            dataHandler(localData)
        }
    },[])

    return <Box sx={{display:"flex", flexDirection: 'column', alignItems:'center', justifyContent:'center', gap:1.5 }}>
        <Typography variant="h4">Add New Task</Typography>
        <TextField label='Title' value={title} variant="standard" required onChange={onTitleChange} />
        <TextField label='Description' value={desc} variant="standard" onChange={onDescChange} />
        <DatePicker sx={{width:200}} slotProps={{ field: { clearable: true } }} onChange={onDateChange} format="DD-MM-YYYY"/>
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