import {
   Dialog,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography
} from '@mui/material';
import React, { useState, useEffect } from "react";


export default function ReqAnnonces({ isDialogOpened, handleCloseDialog }){
    useEffect(() => {
      handleClickOpen();
    }, []);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth] = React.useState("sm");
  
    const handleClickOpen = () => {};
    
    const handleClose = () => {
        handleCloseDialog(false)};
    return (
       <React.Fragment>
            <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isDialogOpened}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            
            <Card maxWidth={maxWidth}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={require('../../../Assets/images/background-4.jpg')}
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Host Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    timeStamp Create
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    location
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Accept</Button>
                    <Button size="small">Reject</Button>
                </CardActions>
            </Card>
        </Dialog>
       </React.Fragment>
    );
}