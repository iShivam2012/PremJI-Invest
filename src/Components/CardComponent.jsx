import { Card, CardContent, Typography, CardActions, Button, Divider, Grid } from "@mui/material"
const CardComponent = ({handleEdit, handleDelete, item}) =>{
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
}
export default CardComponent;