import { Box, Card, CardContent, Typography, CardActions, Button, Divider, Grid } from "@mui/material"
import PromptDialog from "./Utility/Prompt";
import { useState } from "react";

const TaskList = ({data, setterFunc}) => { 
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
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
    };

    const handleDelete = (id) => {
        setOpen(true);
        setId(id);
    };

    return <div style={{margin:'20px'}}>
        {data ? <Typography variant="h4" gutterBottom sx={{marginBottom:'20px'}}>All tasks are here </Typography> : <Typography variant="h4"> Currently there are No Tasks!</Typography> }
        <Grid container >
                { data && data.map((item)=>{
                    let d = item.date.slice(4,16).split(' ')
                    let date = [d[1], d[0], d[2]].join(' ')
                    // let d = item.date.split('T');
                    // let date = d && d[0].split('-').reverse().join('-');
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
                                <Button size="small">Edit</Button>
                                <Button size="small" onClick={()=>handleDelete(item.id)} >Delete</Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    })
                }
                {open && <PromptDialog open={open} handleClose={handleClose} onDeleteHandler={()=>onDeleteHandler(id)} />}
                </Grid>
        </div>
    }
    
    

export default TaskList