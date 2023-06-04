import React, {useState} from "react";
import "../UserPanel/RightBar/MyAnnouncement.css";
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
import { FcHighPriority } from "react-icons/fc";
import { Item } from "semantic-ui-react";
import {Col, Row} from "react-bootstrap";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import {toast} from "react-toastify";
import { useCounter, useCounterActions } from "../../Context/CounterProvider";
import { set } from "zod";


function DeleteAnnouncement(props)
{
    console.log("--------------- THE PROPS IN DELETE ANNOUNCEMENT ---------------", props)
    const counter = useCounter();
    const setCounter = useCounterActions();
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
            url: `https://api.nomadjourney.ir/api/v1/announcement/delete/${props.anc_id}/`,
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
            setCounter(counter - 1);
            props.closeAnnouncement();
        })
    }
    return (
        <>
            <Dialog
                onHide={handleClose}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { borderRadius: "15px" } }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#FDECE6"}}>
                    <Stack direction={'column'}>
                        <Item>
                            <FcHighPriority size='4rem' />
                        </Item>
                        <Item>
                        {`Delete Announcement Of `} <b style={{ color: "#e66969" }}>«{props.announcement.city_name}, {props.announcement.city_country}» </b>{`Journey`}
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
                            color="error"
                            className="p-button-text"
                            onClick={onSubmit}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="p-button-text"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>  
    )
}
export default DeleteAnnouncement;