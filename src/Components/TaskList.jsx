import { Typography,Select, MenuItem, InputLabel, FormControl, Grid, Button } from "@mui/material"
import DeleteDialog from "./Utility/DeleteDialog";
import EditDialog from "./Utility/EditDialog";
import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

const TaskList = ({data, setterFunc}) => { 
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [id, setId] = useState();
    const [editData, setEditData] = useState();
    const [filteredStatus, setFilteredStatus] = useState('');
    const [filteredDatabyStatus, setFilteredDatabyStatus] = useState(null);

    const onDeleteHandler = (id) =>{
        if(filteredDatabyStatus){
            let filteredData = filteredDatabyStatus.filter(item => {
                if(item.id!== id){
                    return item
                }
            });
            setFilteredDatabyStatus([...filteredData]);
        }
            let filteredData = data.filter(item => {
                if(item.id!== id){
                    return item
                }
            });
            setterFunc([...filteredData]);
            localStorage.setItem('taskData',JSON.stringify(filteredData))
    }

    const handleClose = () => {
        setOpen(false);
        setEditOpen(false);
    };

    const handleDelete = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleEdit = (eData) =>{
        setEditOpen(true);
        setEditData(eData);
    }

    const editDataHandler = (editData)=>{
        if(filteredDatabyStatus){
            let modifiedData = filteredDatabyStatus.map(item => {
                if(item.id === editData.id){
                    return editData
                }
                return item
            });
            setFilteredDatabyStatus([...modifiedData]);
        }
        let modifiedData = data.map(item => {
            if(item.id === editData.id){
                return editData
            }
            return item
        });
        setterFunc([...modifiedData]);
        localStorage.setItem('taskData',JSON.stringify(modifiedData))
}

    const onStatusChange =(e) =>{
        setFilteredStatus(e.target.value);
        const filteredData = data.filter((item)=>{
            if(item.status === e.target.value){
                return item;
            }
        })
        setFilteredDatabyStatus(filteredData);
    }

    const resetHandler = () => {
        setFilteredStatus('');
        setFilteredDatabyStatus(null)
    }

    const ascHandler = () => {
        if(filteredDatabyStatus){
            const sortedData = filteredDatabyStatus.sort((a,b)=> new Date(a.date) - new Date(b.date));
            setFilteredDatabyStatus([...sortedData]);
        }
        else{
           const sortedData = data.sort((a,b)=> new Date(a.date) - new Date(b.date))
        setterFunc([...sortedData]);
        }        
    }

    const dscHandler = () => {
        if(filteredDatabyStatus){
            const sortedData = filteredDatabyStatus.sort((a,b)=> new Date(b.date) - new Date(a.date));
            setFilteredDatabyStatus([...sortedData]);
        }
        else{
           const sortedData = data.sort((a,b)=> new Date(b.date) - new Date(a.date))
        setterFunc([...sortedData]);
        }        
    }
    
    return <div style={{margin:'20px'}}>
        <Grid container p={2}> 
            <Grid item xs={12} sm={6}>
                <Typography variant="h4" gutterBottom sx={{marginBottom:'20px'}}>Filter Tasks by Status</Typography>
                <Grid container>
                <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        fullWidth
                        labelId="status-label"
                        id="status"
                        value={filteredStatus}
                        label="Status"
                        onChange={onStatusChange}
                    >
                    <MenuItem value={'Pending'}>Pending</MenuItem>
                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={{alignContent:'center'}}>
                <Button size="large" onClick={resetHandler}>Reset Filter</Button>
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h4" gutterBottom sx={{marginBottom:'20px'}}>Sort Tasks by Due Date</Typography>
                <Button size="large" onClick={ascHandler}>ASC Sort</Button>  
                <Button size="large" onClick={dscHandler}>DSC Sort</Button>  
            </Grid>
        </Grid>
        {(filteredStatus ? filteredDatabyStatus.length>0 : data) ? <Typography variant="h4" gutterBottom sx={{marginBottom:'20px'}}>{filteredStatus ? filteredStatus : 'All' } tasks are here </Typography> : <Typography variant="h4"> Currently there are No {filteredStatus ? filteredStatus : ''}Tasks!</Typography> }
        <Grid container >
                { filteredDatabyStatus ? filteredDatabyStatus.map((item)=>{
                    return <CardComponent handleDelete={handleDelete} handleEdit={handleEdit} item={item} />
                    }) 
                : 
                data && data.map((item)=>{
                    return <CardComponent handleDelete={handleDelete} handleEdit={handleEdit} item={item} />
                    })
                }
                {open && <DeleteDialog open={open} handleClose={handleClose} onDeleteHandler={()=>onDeleteHandler(id)} />}
                {editOpen && <EditDialog open={editOpen} handleClose={handleClose} data={editData} editHandler={editDataHandler} />}
                </Grid>
        </div>
    }
    
    

export default TaskList