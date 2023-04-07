import {Avatar, Box, Divider, Modal, Stack} from "@mui/material";
import "./AuthenticatedAnnouncementDetails.css";
import {Col, ModalFooter, ModalTitle, Row, ModalBody, ModalHeader} from "react-bootstrap";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import {Item, ModalContent} from "semantic-ui-react";
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
            height:"5%"
        },
        middleBox:{
            width: "100%",
            height:"45%",
            backgroundColor: '#fffef0'
        }
    }
));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "90%",
    bgcolor: '#EDE7E6FF',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export default function ShowAnnouncement(props)
{
    const classes = useStyles();
    const handleClose = () => {props.setOpen(false)}
    console.log(props.announcement_id)
    return(
        <Modal open={props.open} onClose={handleClose} >
            <Box sx={{...style}}>
                <Box className={classes.headerBox}>
                    <ModalTitle>
                        <h2>Announcement</h2>
                    </ModalTitle>
                </Box>
                <Box className={classes.middleBox}>Authenticated</Box>
            </Box>
        </Modal>
    )

}
