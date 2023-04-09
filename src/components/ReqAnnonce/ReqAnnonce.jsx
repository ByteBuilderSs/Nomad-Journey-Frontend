import {
   Dialog,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography,
   Grid
} from '@mui/material';
import React, { useState, useEffect } from "react";
import {useAcceptReq} from '../../hooks/useAcceptReq'
import {useRejectReq} from '../../hooks/useRejectReq'
import {useHostOffers} from '../../hooks/useAllHostOffers'
export default function ReqAnnonces({ isDialogOpened, handleCloseDialog }){
    useEffect(() => {
      handleClickOpen();
    }, []);
    const {hostOffers,Annoc} =useHostOffers() 
    useEffect(()=>{hostOffers()},[])
    
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth] = React.useState("sm");

    const {AcceptReq}=useAcceptReq()
    const handelClickAccept=async(event)=>{
        event.preventDefault();
        AcceptReq()
    };
    
    const {RejectReq}=useRejectReq()
    const handelClickReject=async(event)=>{
        event.preventDefault();
        RejectReq()
    };

    const handleClickOpen = () => {};
    const handleClose = () => {
        handleCloseDialog(false)};
    return (
            <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isDialogOpened}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
                
                <Card maxWidth={maxWidth}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={require('../../Assets/images/background-4.jpg')}
                        component="img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Annoncement Name
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
                        <Button size="small" onClick={handelClickAccept}>Accept</Button>
                        <Button size="small" onClick={handelClickReject}>Reject</Button>
                    </CardActions>
                </Card>

            </Dialog>
        
    );
}