import React, {useState} from "react";
import "../UserPanel/RightBar/MyAnnouncement.css";
import {Modal, Box, Typography, Button} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import {toast} from "react-toastify";
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
export let delAnnouncement = 0;
function DeleteAnnouncement(props)
{
    const classes = useStyles();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
    }
    const onSubmit = () =>
    {
        axios({
            method: "delete",
            url: `http://91.107.163.14:8000/api/v1/announcement/delete/${props.anc_id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then(() => {
            props.setOpen(false);
            props.setClose(true);
            setTimeout(() => {
                props.setClose(false);
            }, 5000);
            toast.success("You deleted an announcement");
            delAnnouncement -= 1;
            console.log(delAnnouncement);
            props.closeAnnouncement();
        })
    }
    return (
        <>
            <Modal open={props.open} onClose={handleClose} >
                <Box sx={{...style}}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", fontWeight: "bold", justifyContent:"center"}}>
                        <h1>Are you sure?</h1>
                    </Typography>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", fontWeight: "bold", justifyContent:"center"}}>
                        <Row style={{paddingTop:"7%"}}>
                            <Col md={6}>
                                <Button  variant={`contained`} type={`submit`} onClick={onSubmit}>
                                    Yes
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button variant={`outlined`} type={`submit`} onClick={handleClose}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Typography>

                </Box>
            </Modal>

        </>  )
}
export default DeleteAnnouncement;