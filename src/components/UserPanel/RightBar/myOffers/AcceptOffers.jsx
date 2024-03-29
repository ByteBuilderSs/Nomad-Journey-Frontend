import React, {useState} from "react";
import "../../RightBar/MyAnnouncement.css";
import { 
    Modal,
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    DialogTitle,
} from "@mui/material";
import { Item } from "semantic-ui-react";
import {Col, Row} from "react-bootstrap";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import {toast} from "react-toastify";
import {useAcceptReq} from "../../../../hooks/useAcceptReq";
import { useCounter, useCounterActions } from "../../../../Context/CounterProvider";
import { FcApproval } from "react-icons/fc";

const useStyles = makeStyles(theme => (
    {
        announcement_design:{
            backgroundColor: "white",
        },
        announcer_items:{
            padding: "10%",
        },
        grid:{
            width: "100%",
            height: "100%"
        },
        headerBox:{
            width: "100%",
            height:"5%",
            marginBottom:"1%",
            alignItems : "center",
            justifyContent : "center"
        },
        middleBox:{
            width: "100%",
            height:"45%",
            paddingTop:"3%",
            paddingLeft:"2%",
        },
        items:{
            overflowWrap:"break-word",
            wordWrap:"break-word"

        },
        dates:
            {
                paddingLeft:"6%"
            },
        profileCard:{
            width:"100%",
            height:"40%",
            boxShadow:"30",
            paddingRight: "2%",
            marginRight:"0.5rem",
            alignItems: "center",



        },
        announcerCard :{
            fontWeight: "bold",
            border:"none",
            width:"100%",
            height: "100%",
            alignItems:"center",
            alignSelf:"center",
            justifyContent:"center",
            borderRadius:"5%",
            backgroundColor:"#f0eaf8",
        }
    }
));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25%",
    height: "15%",
    bgcolor: '#EDE7E6FF',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export let acceptOffer = 0;

function AcceptOffers(props)
{
    console.log("++++++++++++++ THE PROPS IN ACCEPT OFFERS ++++++++++++++ ", props);
    const classes = useStyles();
    const counter = useCounter();
    const setCounter = useCounterActions();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const {AcceptReq} = useAcceptReq();

    const handleAcceptReq = (anc_id, host_id) => {
        AcceptReq(anc_id, host_id);
    }

    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
        props.setHost_id(null);
    }

    const onSubmit = () =>
    {
        handleAcceptReq(props.anc_id, props.host_id);
        setCounter(counter + 1);
        props.setOpen(false);
        props.setClose(true);
    }

    return (
        <>
            <Dialog
                onHide={handleClose}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#BECFB8"}}>
                    <Stack direction={'column'}>
                        <Item>
                            <FcApproval size='4rem' />
                        </Item>
                        <Item>
                        {`Accept Offer By`} <b style={{ color: "#33691E" }}>«{props.host_firstName} {props.host_lastName}» </b>{`For This Journey`}
                        </Item>
                    </Stack>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ fontWeight: 'bold', marginTop: "0.5rem", fontSize: 20 }}>
                            Are you sure?
                        </div>
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="p-button-text"
                            onClick={onSubmit}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            className="p-button-text"
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>  
    )
}
export default AcceptOffers;