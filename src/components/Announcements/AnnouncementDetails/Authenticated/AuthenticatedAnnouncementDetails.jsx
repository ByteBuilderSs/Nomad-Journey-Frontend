import {
    Avatar,
    Box,
    Button,
    Divider,
    Modal,
    Stack,
    TableBody,
    TableContainer,
    Typography,
    TableRow,
    TableCell,
    IconButton, TablePagination
} from "@mui/material";
import "../Authenticated/AuthenticatedAnnouncementDetails.css";
import {Col, ModalFooter, ModalTitle, Row, ModalBody, ModalHeader} from "react-bootstrap";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import {Item, ModalContent} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {TiLocation} from "react-icons/ti";
import {FaHome} from "react-icons/fa";
import {IoIosPerson} from "react-icons/io";
import {MdDescription, MdCancel} from "react-icons/md";
import {ImProfile} from "react-icons/im";
import {AiFillCheckCircle} from "react-icons/ai";
import PendingIcon from '@mui/icons-material/Pending';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Card from "react-bootstrap/Card";
import axios from "axios";
import DeleteAnnouncement from "../../DeleteAnnouncement";
import EditAnnouncement, {editAnnouncement} from "../../EditAnnouncement";
import {useAcceptReq} from "../../../../hooks/useAcceptReq";
import {useRejectReq} from "../../../../hooks/useRejectReq";
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
    width: "50%",
    height: "95%",
    bgcolor: '#EDE7E6FF',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export default function UnAuthAnnouncement(props)
{
    const [openDelete, setOpenDelete] = useState(false);
    const [closeDelete, setCloseDelete] = useState(true);

    const [closeEdit, setCloseEdit] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [requestData, setRequestData] = useState({});

    const [announcement, setAnnouncement] = useState('');
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
        axios(`http://91.107.163.14:8000/api/v1/announcement/user-announcements-more-details/${props.announcement_id}/`)
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
    }, [editAnnouncement])
    const classes = useStyles();
    const {AcceptReq}=useAcceptReq()
    const {RejectReq} = useRejectReq();
    const handleAcceptReq = (anc_id, host_id) => {
        AcceptReq(anc_id, host_id);
        window.location.reload(false);
    }
    const handleRejectReq = (anc_id, host_id) => {
        RejectReq(anc_id, host_id);
        window.location.reload(false);
    }
    const checkButton = (anc_status) => {
        if(anc_status === "P" || anc_status === "A")
        return (
            <>
                <Item>
                    <Button color={`primary`} variant={`contained`} onClick={() => {setOpenEdit(true); setCloseEdit(false);}}>
                        Edit
                    </Button>

                    <EditAnnouncement
                        anc={announcement}
                        open={openEdit}
                        setOpen={setOpenEdit}
                        close={closeEdit}
                        setClose={setCloseEdit}
                        requestData={requestData}
                        setRequestData={setRequestData}
                    />

                </Item>
                <Item>
                    <Button color={`error`} variant={`contained`} onClick={() => {setOpenDelete(true); setCloseDelete(false);}
                    }>
                        Delete
                    </Button>
                    <DeleteAnnouncement
                        anc_id={announcement.id}
                        open={openDelete}
                        setOpen={setOpenDelete}
                        closeAnnouncement={handleClose}
                        close={closeDelete}
                        setClose={setCloseDelete}/>
                </Item>
            </>
        )
    }
    const volunteer_hosts = (volunteer_host, anc_id) =>
    {
        if(volunteer_host.length === 0)
            return(
                <>
                    <Stack alignItems="center" justifyContent="center" style={{paddingTop:"55%", paddingBottom:"60%"}}>
                        <Item>
                            <ImProfile color={`#b1abaa`} size={`35`}/>
                        </Item>
                        <Item>
                            <div style={{color:"#938d8c"}}>
                                No offers
                            </div>
                        </Item>
                    </Stack>
                </>
            )
        return (
            <>
            <TableContainer>
                <TableBody >
                    {volunteer_host.map((item, key) =>
                        (
                            <TableRow>
                                    <a href={`../${item.username}`}>
                                        {item.first_name} {item.last_name}
                                    </a>
                                    <IconButton color={`success`} onClick={()=> {
                                        handleAcceptReq(anc_id, item.id)}}>
                                        <AiFillCheckCircle />
                                    </IconButton>
                                    <IconButton color={`error`} onClick={()=> {
                                        handleRejectReq(anc_id, item.id)}}>
                                        <MdCancel />
                                    </IconButton>
                            </TableRow>
                        ))}
                </TableBody>
            </TableContainer>
            </>
        )
    }
    const renderHostBox = (status, anc_volunteers, anc_id) => {
        switch (status) {
            case "P":
                return(<>
                    <Card.Title>
                        <div style={{fontWeight: "bold"}}>
                            Volunteers</div>
                    </Card.Title>
                    <Card.Body>
                        {volunteer_hosts(anc_volunteers, anc_id)}
                    </Card.Body>
                </>)
            case "E":
                return(<>
                    <Card.Title>
                        <div style={{fontWeight: "bold"}}>
                            Host</div>
                    </Card.Title>
                    <Card.Body>
                        <Stack alignItems="center" justifyContent="center" style={{paddingTop:"55%", paddingBottom:"60%"}}>
                            <Item>
                                <ImProfile color={`#b1abaa`} size={`35`}/>
                            </Item>
                            <Item>
                                <div style={{color:"#938d8c"}}>
                                    No one was accepted
                                </div>
                            </Item>
                        </Stack>
                    </Card.Body>

                </>)
            default:
                return(
                    <>
                        <Card.Title>
                            <div style={{fontWeight: "bold"}}>
                                Host</div>
                        </Card.Title>
                        <Card.Body>
                            <Stack spacing={2} alignItems="center" justifyContent="flex-start">
                                <Item>
                                    <Avatar />
                                </Item>
                                <Item>
                                    <Stack alignItems="center" justifyContent="flex-start">
                                        <Item>
                                            <h3>{announcement.host_firstName} {announcement.host_lastName}</h3>
                                        </Item>
                                        {/* <Item>
                                            From {announcement.host_nationality}
                                        </Item> */}
                                        {/* <Item>
                                            {evalAge(announcement.host_birthdate)}
                                        </Item> */}
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
                        </Card.Body>
                    </>
                )
        }
    }
    const handleClose = () => {
        props.setOpen(false);
        props.set_anc_id(null);}
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
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center" }}>
                                            <TiLocation style={{ marginRight: "0.5rem"}} /> {announcement.city_name}, {announcement.city_country}
                                        </Typography>
                                    </Item>
                                    <Item className={classes.items}>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center" }}>
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
                                <Stack direction={'row'} spacing={4}>
                                    <Item>
                                    <h4>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                            {StatusCheck(announcement.anc_status)}
                                        </Typography>
                                    </h4>
                                    </Item>
                                    {checkButton(announcement.anc_status)}
                                </Stack>
                            </Item>
                            <Item>
                                <Box className={classes.profileCard}>
                                    <Card className={classes.announcerCard}>
                                        {renderHostBox(announcement.anc_status, announcement.volunteers, announcement.id)}
                                    </Card>
                                </Box>
                            </Item>
                            <Item>
                                <Box className={classes.profileCard}>
                                    <Card className={classes.announcerCard}>
                                        <Card.Img
                                            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/2048px-Google_Maps_icon_%282015-2020%29.svg.png`} />
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
