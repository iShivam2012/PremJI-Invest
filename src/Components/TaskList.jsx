import { Card, CardContent, Typography, CardActions, Button, Divider, Grid } from "@mui/material"
import DeleteDialog from "./Utility/DeleteDialog";
import EditDialog from "./Utility/EditDialog";
import { useState } from "react";

const TaskList = ({data, setterFunc}) => { 
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [id, setId] = useState();
    const [editData, setEditData] = useState();
    const onDeleteHandler = (id) =>{
        let filteredData = data.filter(item => {
            if(item.id!== id){
                return item
            }
        });
        setterFunc(filteredData);
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
        let modifiedData = data.map(item => {
            if(item.id === editData.id){
                return editData
            }
            return item
        });
        setterFunc(modifiedData);
        localStorage.setItem('taskData',JSON.stringify(modifiedData))
    }

    return <div style={{margin:'20px'}}>
        {data ? <Typography variant="h4" gutterBottom sx={{marginBottom:'20px'}}>All tasks are here </Typography> : <Typography variant="h4"> Currently there are No Tasks!</Typography> }
        <Grid container >
                { data && data.map((item)=>{
                    let d = item.date.slice(4,16).split(' ')
                    let date = [d[1], d[0], d[2]].join(' ')
                    return <Grid item xs={12} sm={4} md={3} lg p={2} key={item.id}>
                        <Card variant="outlined" sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom >
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.desc}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                    {item.status}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {date}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button size="small" onClick={()=>handleEdit(item)} >Edit</Button>
                                <Button size="small" onClick={()=>handleDelete(item.id)} >Delete</Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    })
                }
                {open && <DeleteDialog open={open} handleClose={handleClose} onDeleteHandler={()=>onDeleteHandler(id)} />}
                {editOpen && <EditDialog open={editOpen} handleClose={handleClose} data={editData} editHandler={editDataHandler} />}
                </Grid>
        </div>
    }
    
    

export default TaskList