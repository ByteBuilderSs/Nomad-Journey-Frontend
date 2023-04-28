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
import {MapContainer, TileLayer, useMap, useMapEvent} from "react-leaflet";
import {BiEdit, BiTrash, BiChevronRight, BiChevronLeft} from "react-icons/bi";
import LetteredAvatar from "react-lettered-avatar";
import RejectOffers, {rejectOffer} from "../../../UserPanel/RightBar/myOffers/RejectOffers";
import AcceptOffers, {acceptOffer} from "../../../UserPanel/RightBar/myOffers/AcceptOffers";
import { useCounter, useCounterActions } from "../../../../Context/CounterProvider";

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
            backgroundColor:"#EDE7E6FF",
        }
    }
));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "55%",
    height: "85%",
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
    const [current, setCurrent] = useState(0);

    const [closeEdit, setCloseEdit] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [requestData, setRequestData] = useState({});

    const [openReject, setOpenReject] = useState(false);
    const [closeReject, setCloseReject] = useState(true);

    const [openAccept, setOpenAccept] = useState(false);
    const [closeAccept, setCloseAccept] = useState(true);

    const [announcement, setAnnouncement] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hostId, setHostId] = useState(null);

    const counter = useCounter();
    const setCounter = useCounterActions();

    const evalAge = (birthdate) => {
        let age = Date.now() - new Date(birthdate);
        let dateOfAge = new Date(age);
        return `Age ${Math.abs(dateOfAge.getUTCFullYear() - 1970)}`;
    }
    const checkDescription = (description) => {
        if(description == null || description.length === 0)
            return
        return(
            <>
                <MdDescription style={{ marginRight: "0.5rem"}} /> Description
            </>
        )
    }
    const StatusCheck = (status) => {
        switch (status) {
            case "P":
                return(
                    <>
                        Pending <PendingIcon sx={{marginLeft:"0.5rem", color:"#88949f"}} />
                    </>
                )
            case "A":
                return(
                    <>
                        Accepted <DoneIcon sx={{marginLeft:"0.5rem", color:"#2b672b"}} />
                    </>
                )
            case "D" :
                return (
                    <>
                        Done <DoneAllIcon sx={{marginLeft:"0.5rem", color:"#2b672b"}}/>
                    </>
                )
            case "E":
                return (
                    <>
                        Expired <DoNotDisturbOnIcon sx={{marginLeft:"0.5rem", color:"#af0000"}} />
                    </>
                )
        }
    }
    useEffect( () =>
    {
        axios(`http://188.121.102.52:8000/api/v1/announcement/user-announcements-more-details/${props.announcement_id}/`)
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
    }, [counter])
    const classes = useStyles();
    const checkButton = (anc_status) => {
        if(anc_status === "P" || anc_status === "A")
        return (
            <>
                <Item className={classes.items}>
                    <Stack sx={{marginTop:"50%"}} direction={`column`}>
                        <Item>
                    <IconButton size={`large`} onClick={() => {setOpenEdit(true); setCloseEdit(false);}}>
                        <BiEdit />
                    </IconButton>

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
                    <IconButton size={`large`} onClick={() => {setOpenDelete(true); setCloseDelete(false);}
                    }>
                        <BiTrash />
                    </IconButton>
                    <DeleteAnnouncement
                        anc_id={announcement.id}
                        announcement={announcement}
                        open={openDelete}
                        setOpen={setOpenDelete}
                        closeAnnouncement={handleClose}
                        close={closeDelete}
                        setClose={setCloseDelete}/>
                        </Item>
                    </Stack>
                    </Item>
            </>
        )
    }
    const volunteer_hosts = (volunteer_host, anc_id) =>
    {
        if(volunteer_host.length === 0)
            return(
                <>
                    <Stack alignItems="center" justifyContent="center" style={{marginTop:"80%", paddingTop:"55%", paddingBottom:"60%"}}>
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
        const length = volunteer_host.length;

        const nextSlide = () => {
            setCurrent(current === length - 1 ? 0 : current + 1);
        };

        const prevSlide = () => {
            setCurrent(current === 0 ? length - 1 : current - 1);
        };

        if (!Array.isArray(volunteer_host) || volunteer_host.length <= 0) {
            return null;
        }
        return (
            <>
                <div style={{marginTop:"10%"}}>
                <BiChevronLeft className='left-arrow' onClick={prevSlide} />
                <BiChevronRight className='right-arrow' onClick={nextSlide} />
                {volunteer_host.map((item, key) =>
                    (
                        <>
                            <div
                                className={key === current ? 'slide active' : 'slide'}
                                key={key}
                            >
                                {key == current && (
                                    <>
                                        <Stack spacing={2} alignItems={`center`}>
                                            <Item>
                                                <LetteredAvatar name={item.first_name} backgroundColor='#FFE5B4'  size={100}/>
                                            </Item>
                                        <Item>
                                            <Stack>
                                            <Item>
                                                <h3>
                                                {item.first_name}
                                                </h3>
                                            </Item>
                                            <Item>
                                                <h3>
                                                    {item.last_name}
                                                </h3>
                                            </Item>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <Button color={`success`} onClick={()=> {
                                                setOpenAccept(true);
                                                setCloseAccept(false);
                                                setHostId(item.id);}}>
                                                Accept
                                            </Button>
                                            <Button color={`error`} onClick={()=> {
                                                setOpenReject(true);
                                                setCloseReject(false);
                                                setHostId(item.id);
                                                }} >
                                                Reject
                                            </Button>
                                        </Item>
                                        </Stack>
                                    </>
                                )}
                            <RejectOffers
                                anc_id={anc_id}
                                host_id={hostId}
                                setHost_id={setHostId}
                                open={openReject}
                                setOpen={setOpenReject}
                                close={closeReject}
                                host_firstName={item.first_name}
                                host_lastName={item.last_name}
                                setClose={setCloseReject}/>
        
                            <AcceptOffers
                                anc_id={anc_id}
                                host_id={hostId}
                                setHost_id={setHostId}
                                open={openAccept}
                                setOpen={setOpenAccept}
                                close={closeAccept}
                                host_firstName={item.first_name}
                                host_lastName={item.last_name}
                                setClose={setCloseAccept}/>
                            </div>
                        </>
                ))}

                </div>

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
                        <Stack alignItems="center" justifyContent="center" style={{marginTop:"80%", paddingTop:"55%", paddingBottom:"60%"}}>
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
                            <div style={{marginTop:"40%"}}>
                            <Stack spacing={2} alignItems="center" justifyContent="flex-start">
                                <Item>
                                    <LetteredAvatar name={announcement.host_firstName} backgroundColor='#FFE5B4'  size={100}/>
                                </Item>
                                <Item>
                                    <Stack>
                                        <Item>
                                            <h3>
                                                {announcement.host_firstName}
                                            </h3>
                                        </Item>
                                        <Item>
                                            <h3>
                                                {announcement.host_lastName}
                                            </h3>
                                        </Item>
                                    </Stack>
                                </Item>
                            </Stack>
                            </div>
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
                <Row>
                    <Col md={12} style={{overflowWrap:"break-word", wordWrap:"break-word"}}>
                        <Box className={classes.middleBox}>
                            <div>
                                <Stack>
                                    <Item>
                                <Stack spacing={6} direction={`row`}>
                                    <Item className={classes.items}>
                                        {/* <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"large" }}>
                                                <TiLocation style={{ marginRight: "0.5rem"}} /> {announcement.city_name}, 
                                        </Typography>
                                        <Typography component="h4">
                                            {announcement.city_country}
                                        </Typography> */}
                                        <Stack direction={`row`}>
                                            <Item>
                                                <h4><TiLocation style={{ marginRight: "0.5rem"}} /></h4>
                                            </Item>
                                            <Item>
                                                <Stack>
                                                    <Item>
                                                        <Typography component="h4"
                                                                style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"medium" }}>
                                                                <span>{announcement.city_name}</span>
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <Typography component="h6"
                                                            style={{ display: "flex", alignItems: "center", alignContent: "center"}}>{announcement.city_country}</Typography>
                                                    </Item>
                                                </Stack>
                                            </Item>
                                        </Stack>
                                    </Item>
                                    <Item className={classes.items}>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"medium" }}>
                                            <FaHome style={{ marginRight: "0.5rem"}} /> {props.numOfNights(announcement.arrival_date, announcement.departure_date)}
                                        </Typography>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                            <Stack sx={{marginTop:"1rem", marginLeft:"2rem", borderLeft:"solid", borderLeftWidth:"thin"}}>
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
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"medium" }}>
                                            <IoIosPerson style={{ marginRight: "0.5rem"}} /> {props.numOfTravelers(announcement.travelers_count)}
                                        </Typography>
                                    </Item>
                                    <Item className={classes.items}>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"medium" }}>
                                                    {StatusCheck(announcement.anc_status)}
                                        </Typography>
                                    </Item>
                                        {checkButton(announcement.anc_status)}
                                </Stack>
                                    </Item>
                                    <Item>
                                        <Typography
                                            component="h4"
                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"medium"}}>
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
                                    <Item>
                                        <Stack sx={{marginTop:"5%"}} direction={`row`}>
                                            <Item className={classes.profileCard}>
                                                <Card className={classes.announcerCard}>
                                                    {renderHostBox(announcement.anc_status, announcement.volunteers, announcement.id)}
                                                </Card>
                                            </Item>
                                            <Item className={classes.profileCard}>
                                                    <MapContainer style={{width:"20vw", height:"35vh"}} center={[35.7, 51.4167]} zoom={16} scrollWheelZoom={true}>
                                                        <TileLayer
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        />
                                                    </MapContainer>
                                            </Item>
                                        </Stack>
                                    </Item>
                                </Stack>
                            </div>
                        </Box>
                    </Col>
                    {/*<Col md={5}>*/}
                    {/*    <Stack spacing={3}>*/}
                    {/*        <Item>*/}
                    {/*            <Stack direction={'row'} spacing={4}>*/}
                    {/*                <Item>*/}
                    {/*                <h4>*/}
                    {/*                    <Typography*/}
                    {/*                        component="h4"*/}
                    {/*                        style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>*/}
                    {/*                        {StatusCheck(announcement.anc_status)}*/}
                    {/*                    </Typography>*/}
                    {/*                </h4>*/}
                    {/*                </Item>*/}
                    {/*                {checkButton(announcement.anc_status)}*/}
                    {/*            </Stack>*/}
                    {/*        </Item>*/}
                    {/*        <Item>*/}
                    {/*            <Box className={classes.profileCard}>*/}
                    {/*                <Card className={classes.announcerCard}>*/}
                    {/*                    {renderHostBox(announcement.anc_status, announcement.volunteers, announcement.id)}*/}
                    {/*                </Card>*/}
                    {/*            </Box>*/}
                    {/*        </Item>*/}
                    {/*        <Item>*/}
                    {/*            <Box className={classes.profileCard}>*/}
                    {/*                <Card className={classes.announcerCard}>*/}
                    {/*                </Card>*/}
                    {/*            </Box>*/}
                    {/*        </Item>*/}
                    {/*    </Stack>*/}
                    {/*</Col>*/}
                </Row>
            </Box>
        </Modal>
    )

}
