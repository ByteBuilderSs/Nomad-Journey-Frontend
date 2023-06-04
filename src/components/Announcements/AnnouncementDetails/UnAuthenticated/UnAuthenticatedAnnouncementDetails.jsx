import {Avatar, Box, Button, Divider, Modal, Stack, Typography} from "@mui/material";
import "../Authenticated/AuthenticatedAnnouncementDetails.css";
import {Col, ModalFooter, ModalTitle, Row, ModalBody, ModalHeader} from "react-bootstrap";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import {Item, ModalContent} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {TiLocation} from "react-icons/ti";
import {FaHome} from "react-icons/fa";
import {IoIosPerson} from "react-icons/io";
import {MdDescription} from "react-icons/md";
import {ImProfile} from "react-icons/im";
import PendingIcon from '@mui/icons-material/Pending';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Card from "react-bootstrap/Card";
import axios from "axios";

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
            paddingLeft:"10%",



        },
        announcerCard :{
            fontWeight: "bold",
            border:"none",
            width:"80%",
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
    width: "45%",
    height: "65%",
    bgcolor: '#EDE7E6FF',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function UnAuthAnnouncement(props)
{
    const [announcement, setAnnouncement] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const evalAge = (birthdate) => {
        let age = Date.now() - new Date(birthdate);
        let dateOfAge = new Date(age);
        return `Age ${Math.abs(dateOfAge.getUTCFullYear() - 1970)}`;
    }

    const checkDescription = (description) => {
        if(description != null)
            return(
                <>
                    <MdDescription style={{ marginRight: "0.5rem"}} /> Description :
                </>
            )
    }

    const StatusCheck = (status) => {
        switch (status) {
            case "P":
                return(
                    <>
                        Status: Pending <PendingIcon sx={{marginLeft:"0.5rem", color:"#88949f"}} />
                    </>
                )
            case "A":
                return(
                    <>
                        Status: Accepted <DoneIcon sx={{marginLeft:"0.5rem", color:"#2b672b"}} />
                    </>
                )
            case "D" :
                return (
                    <>
                        Status: Done <DoneAllIcon sx={{marginLeft:"0.5rem", color:"#2b672b"}}/>
                    </>
                )
            case "E":
                return (
                    <>
                        Status: Expired <DoNotDisturbOnIcon sx={{marginLeft:"0.5rem", color:"#af0000"}} />
                    </>
                )
        }
    }
    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/ api/v1/announcement/user-announcements-more-details/${props.announcement_id}/`)
            .then((data) => {
                setAnnouncement(data.data)})
            .catch(error =>
            {
                console.error("error fetching data:", error);
                setError(error);
            })
            .finally( () => {
                console.log(announcement);
                setLoading(false);
            })
    }, [])
    const classes = useStyles();
    const renderHostBox = (status) => {
        switch (status) {
            case "P":
                return(<>
                        <Stack alignItems="center" justifyContent="center" style={{paddingTop:"25%", paddingBottom:"30%"}}>
                            <Item>
                                <ImProfile color={`#b1abaa`} size={`35`}/>
                            </Item>
                            <Item>
                                <div style={{color:"#938d8c"}}>
                                    Has not been accepted yet
                                </div>
                            </Item>
                            {/*<Button style={{color:"#938d8c"}}>*/}
                            {/*    Want to host?*/}
                            {/*</Button>*/}
                        </Stack>
                </>)
            case "E":
                return(<>
                    <Stack alignItems="center" justifyContent="center" style={{paddingTop:"25%", paddingBottom:"30%"}}>
                        <Item>
                            <ImProfile color={`#b1abaa`} size={`35`}/>
                        </Item>
                        <Item>
                            <div style={{color:"#938d8c"}}>
                                No one was accepted
                            </div>
                        </Item>
                    </Stack>
                    </>)
            default:
                return(
                    <>
                        <Stack spacing={2} alignItems="center" justifyContent="flex-start">
                            <Item>
                                <Avatar />
                            </Item>
                            <Item>
                                <Stack alignItems="center" justifyContent="flex-start">
                                    <Item>
                                        <h3>{announcement.host_firstName} {announcement.host_lastName}</h3>
                                    </Item>
                                    <Item>
                                        From {announcement.host_nationality}
                                    </Item>
                                    <Item>
                                        {evalAge(announcement.host_birthdate)}
                                    </Item>
                                </Stack>
                            </Item>
                            <Item>
                                <Button>
                                    <a href={`/home/Profile/${announcement.host_username}`}>
                                        view this profile
                                    </a>
                                </Button>
                            </Item>
                        </Stack>
                    </>
                )
        }
    }
    const handleClose = () => {props.setOpen(false);}
    console.log(props.announcement_id)
    return(
        <Modal open={props.open} onClose={handleClose} >
            <Box sx={{...style}}>
                <div style={{paddingBottom:"1%"}}>
                    <Box className={classes.headerBox}>
                        <ModalTitle>
                            <h2>Announcement Details</h2>
                        </ModalTitle>
                    </Box>
                </div>
                <Row>
                    <Col md={7} style={{overflowWrap:"break-word", wordWrap:"break-word"}}>
                <Box className={classes.middleBox}>
                    <div>
                        <Stack spacing={1.5}>
                        <Item className={classes.items}>
                            <Typography
                                component="h4"
                                style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                <TiLocation style={{ marginRight: "0.5rem"}} /> {announcement.city_name}, {announcement.city_country}
                            </Typography>
                        </Item>
                        <Item className={classes.items}>
                            <Typography
                                component="h4"
                                style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                <FaHome style={{ marginRight: "0.5rem"}} /> {props.numOfNights(announcement.arrival_date, announcement.departure_date)}
                            </Typography>
                        </Item>
                        <Item className={classes.items}>
                            <Typography
                                component="h4"
                                style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                <Stack sx={{marginLeft:"2rem", borderLeft:"solid", borderLeftWidth:"thin"}}>
                                    <Item className={classes.dates}>
                                        Start at {props.dayOfdate(announcement.arrival_date)}
                                    </Item>
                                    <Item className={classes.dates}>
                                        End at {props.dayOfdate(announcement.departure_date)}
                                    </Item>
                                </Stack>
                            </Typography>
                        </Item>
                        <Item className={classes.items}>
                        <Typography
                            component="h4"
                            style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                            <IoIosPerson style={{ marginRight: "0.5rem"}} /> {props.numOfTravelers(announcement.travelers_count)}
                        </Typography>
                        </Item>
                        <Item className={classes.items}>
                        <Typography
                            component="h4"
                            style={{ display: "flex", alignItems: "center", fontWeight: "bold"}}>

                        </Typography>
                        </Item>
                        <Item className={classes.items}>
                        <Typography
                            component="h4"
                            style={{ display: "flex", alignItems: "center", fontWeight: "bold"}}>
                            <Box sx={{width:"90%"}}>
                            <Stack>
                                <Item>
                                    {checkDescription(announcement.anc_description)}
                                </Item>
                                <Item>
                                    <div style={{marginLeft:"1.6rem"}}>
                                    {announcement.anc_description}
                                    </div>
                                </Item>
                            </Stack>
                            </Box>
                        </Typography>
                        </Item>
                        </Stack>
                    </div>
                </Box>
                    </Col>
                    <Col md={5}>
                        <Stack spacing={3}>
                            <Item>
                                <h4>
                                    <Typography
                                        component="h4"
                                        style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                        {StatusCheck(announcement.anc_status)}
                                    </Typography>
                                </h4>
                            </Item>
                            <Item>
                                <Box className={classes.profileCard}>
                                    <Card className={classes.announcerCard}>
                                        <Card.Title>
                                            <div style={{fontWeight: "bold"}}>
                                            Announcer</div>
                                        </Card.Title>
                                        <Card.Body>
                                            <Stack spacing={2} alignItems="center" justifyContent="flex-start">
                                                <Item>
                                                    <Avatar />
                                                </Item>
                                                <Item>
                                                    <Stack alignItems="center" justifyContent="flex-start">
                                                        <Item>
                                                            <h3>{announcement.announcer_firstName} {announcement.announcer_lastName}</h3>
                                                        </Item>
                                                        <Item>
                                                            From {announcement.announcer_nationality}
                                                        </Item>
                                                        <Item>
                                                            {evalAge(announcement.announcer_birthdate)}
                                                        </Item>
                                                    </Stack>
                                                </Item>
                                                <Item>
                                                    <Button>
                                                        <a href={`/home/Profile/${announcement.announcer_username}`}>
                                                            view this profile
                                                        </a>
                                                    </Button>
                                                </Item>
                                            </Stack>
                                        </Card.Body>
                                    </Card>
                                </Box>
                            </Item>
                            <Item>
                                <Box className={classes.profileCard}>
                                    <Card className={classes.announcerCard}>
                                        <Card.Title>
                                            <div style={{fontWeight: "bold"}}>
                                                Host</div>
                                        </Card.Title>
                                        <Card.Body>
                                            {renderHostBox(announcement.anc_status)}
                                        </Card.Body>
                                    </Card>
                                </Box>
                            </Item>
                        </Stack>
                    </Col>
                </Row>
            </Box>
        </Modal>
    )

}
