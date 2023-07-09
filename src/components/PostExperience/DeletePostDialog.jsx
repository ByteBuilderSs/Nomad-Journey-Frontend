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
    IconButton,
} from "@mui/material";
import { FcHighPriority } from "react-icons/fc";
import { Item } from "semantic-ui-react";
import axios from "axios";
import {toast} from "react-toastify";
import { useCounter, useCounterActions } from "../../Context/CounterProvider";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {AiOutlineClose} from "react-icons/ai";
import {makeStyles} from "@mui/styles";
const styles = makeStyles(theme => ({
    button:{
        width:"6vw",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#004E89",
        border:"solid 2px #004E89",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#004E89",
            color:"#EFEFD0"
        }
    },
    deleteButton:{
        width:"6vw",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#DE3733",
        border:"solid 2px #DE3733",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#DE3733",
            color:"#EFEFD0"
        }
    }
}))


function DeletePostDialog(props)
{
    console.log("--------------- THE PROPS IN DELETE POST ---------------", props)
    const Counter = useCounter();
    const setCounter = useCounterActions();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const username = allData.username;
    const classes = styles();

    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
    }

    const onSubmit = () =>
    {
        axios({
            method: "delete",
            url: `https://api.nomadjourney.ir/api/v1/blog/others-profile-post/${username}`,
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
                onClose={handleClose}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: {
                    borderRadius: "15px",
                    color:"#DE3733",
                    // boxShadow:"inset 0px 0px 0px 2px #DE3733",
                    } }}
            >
                {/* <IconButton
                    edge="end"
                    onClick={handleClose}
                    size={"medium"}
                    sx={{ position: "absolute", top: "1rem", right: "2rem", color:"#DE3733" }}
                >
                    <AiOutlineClose />
                </IconButton> */}
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#FDECE6", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction={'column'} sx={{ flexGrow: 1 }}>
                        <Item>
                            <FcHighPriority size='4rem' />
                        </Item>
                        <Item>
                            {`Delete`} <b style={{ color: "#e66969" }}>«{props.post_title}» </b>{`Post`}
                        </Item>
                    </Stack>
                    {/* <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <HighlightOffIcon fontSize='large'/>
                    </IconButton> */}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ fontWeight: 'bold', marginTop: "0.5rem", fontSize: 23, }}>
                            Are you sure?
                        </div>
                    </DialogContentText>
                    <DialogActions>
                            <Button
                                size={`small`}
                                sx={{
                                    width:"6vw",
                                    backgroundPosition:"right bottom",
                                    fontWeight:"bold",
                                    color:"#DE3733",
                                    border:"solid 2px #DE3733",
                                    borderRadius:"15px",
                                    transition:"all 0.15s ease-out",
                                    backgroundSize:"200% 100%",
                                    "&:hover":{
                                        backgroundPosition:"left bottom",
                                        backgroundColor:"#DE3733",
                                        color:"#EFEFD0"
                                    }
                                }}
                                onClick={onSubmit}
                            >
                                Delete
                            </Button>
                            <Button
                                size={`small`}
                                sx={{
                                    width:"6vw",
                                    backgroundPosition:"right bottom",
                                    fontWeight:"bold",
                                    color:"#004E89",
                                    border:"solid 2px #004E89",
                                    borderRadius:"15px",
                                    transition:"all 0.15s ease-out",
                                    backgroundSize:"200% 100%",
                                    "&:hover":{
                                        backgroundPosition:"left bottom",
                                        backgroundColor:"#004E89",
                                        color:"#EFEFD0"
                                    }
                                }}
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