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
import axios from "axios";
import {toast} from "react-toastify";
import { useCounter, useCounterActions } from "../../Context/CounterProvider";


function DeletePostDialog(props)
{
    console.log("--------------- THE PROPS IN DELETE POST ---------------", props)
    const Counter = useCounter();
    const setCounter = useCounterActions();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const username = allData.username;
    
    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
    }

    const onSubmit = () =>
    {
        axios({
            method: "delete",
            url: `http://188.121.102.52:8000/api/v1/blog/others-profile-post/${username}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            data: {
                uid: props.post_id
            }
            }).then((res) => {
                console.log("********* THE RESULT IN POST DELETE REQUEST **********", res);
                setCounter(Counter - 1); //where I reduce the post counter by one
                props.closePost();
            });
    }

    return (
        <>
            <Dialog
                onHide={handleClose}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#FDECE6"}}>
                    <Stack direction={'column'}>
                        <Item>
                            <FcHighPriority size='4rem' />
                        </Item>
                        <Item>
                        {`Delete`} <b style={{ color: "#e66969" }}>«{props.post_title}» </b>{`Post`}
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
export default DeletePostDialog;