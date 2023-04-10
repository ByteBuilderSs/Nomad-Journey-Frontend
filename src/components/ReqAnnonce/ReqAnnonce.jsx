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
import {useAnnoncOffer} from '../../hooks/useAnnoncOffer'

export default function ReqAnnonces({ isDialogOpened, handleCloseDialog ,anc_id}){
    useEffect(() => {
      handleClickOpen();
    }, []);
    const {annoneOffer,Annoc} =useAnnoncOffer() 
    useEffect(()=>{annoneOffer(anc_id)},[])

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
                        <Typography variant="body2" color="text.secondary">
                        your destination city was:  {Annoc.anc_city}                        
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                         Announcement description:   {Annoc.anc_description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        your arrival date was : {Annoc.arrival_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        you have {Annoc.travelers_count} Fellow traveler(s)
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