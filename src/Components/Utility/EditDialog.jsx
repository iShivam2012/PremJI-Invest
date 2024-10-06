import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Select, TextField, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';

const EditDialog = ({
    open,
    handleClose,
    data,
    editHandler
}) => {
  const {id, title, desc, date, status} = data;
  const [newTitle, setTitle] = useState(title)
  const [newDesc, setDesc] = useState(desc)
  const [newDate, setDate] = useState(date)
  const [newStatus, setStatus] = useState(status)
  const [disabled, setDisabled] = useState(false)
  
const onSaveHandler = ()=>{
    let newData = {id, title:newTitle, desc: newDesc, date: newDate, status: newStatus}
    handleClose();
    editHandler(newData);
  }
const onTitleChange = (e)=>{
    setTitle(e.target.value);
}
const onDescChange = (e)=>{
    setDesc(e.target.value);
}
const onDateChange = value =>{
    setDate(value?.$d.toString());
}
const onStatusChange = (e)=>{
    setStatus(e.target.value);
}
useEffect(()=>{
  if(newTitle.trim().length=== 0 || newDate == 'Invalid Date'){
      setDisabled(true);
  }
  else{
      setDisabled(false);
  }

},[newTitle, newDate])
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>
          You can edit the Form values and then hit the save button below!
          </DialogContentText>
        <Box sx={{display:"flex", flexDirection: 'column', alignItems:'center', justifyContent:'center', gap:1.5 }}>
        <TextField label='Title' value={newTitle} variant="standard" required onChange={onTitleChange} />
        <TextField label='Description' value={newDesc} variant="standard" onChange={onDescChange} />
        <DatePicker sx={{width:200}} value={dayjs(newDate)} onChange={onDateChange} format="DD-MM-YYYY"/>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
        fullWidth
        labelId="status-label"
          id="status"
          value={newStatus}
          label="Status"
          onChange={onStatusChange}
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
        </FormControl>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={disabled} onClick={onSaveHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDialog