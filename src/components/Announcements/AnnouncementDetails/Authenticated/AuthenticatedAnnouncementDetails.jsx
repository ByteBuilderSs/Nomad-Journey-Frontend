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
    IconButton, TablePagination,
    Switch
} from "@mui/material";
import "../Authenticated/AuthenticatedAnnouncementDetails.css";
import {Col, ModalFooter, ModalTitle, Row, ModalBody, ModalHeader} from "react-bootstrap";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import {Item, ModalContent} from "semantic-ui-react";
import React, {useEffect, useMemo, useState} from "react";
import {TiLocation} from "react-icons/ti";
import {FaHome, FaMapMarkerAlt} from "react-icons/fa";
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
import L from "leaflet";
import {Circle, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import {BiEdit, BiTrash, BiChevronRight, BiChevronLeft} from "react-icons/bi";
import LetteredAvatar from "react-lettered-avatar";
import RejectOffers, {rejectOffer} from "../../../UserPanel/RightBar/myOffers/RejectOffers";
import AcceptOffers, {acceptOffer} from "../../../UserPanel/RightBar/myOffers/AcceptOffers";
import { useCounter, useCounterActions } from "../../../../Context/CounterProvider";
import {renderToStaticMarkup} from "react-dom/server";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
import Control from "react-leaflet-custom-control";
import {BsHouseFill} from "react-icons/bs";
import UserProfile from "./UserProfileAnnouncement";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import FeedbackModal from '../../../feedBack/feedBack';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SendIcon from '@mui/icons-material/Send';
import Messenger from '../../../Messenger/Messenger'
import {useAllposts} from '../../../../hooks/useAllposts'
import EditorFormDialog from "../../../PostExperience/EditorForm/EditorFormDialog";

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
        },
        sidebarDetails:{
            backgroundImage:"url('https://www.moon.com/wp-content/uploads/2019/01/Chicago_RiverNight_JoshuaWanyama-Dreamstime.jpg?fit=1080%2C1080')",
            height:"100vh",
            filter:"grayscale(80%) brightness(20%) blur(1px)",
            opacity:"0.9"
        },
        mapButton:{
            color:"#e45505",
            backgroundColor:"rgba(237,231,230,0.7)",
            "&:hover":{
                backgroundColor:"rgba(218,193,180,0.78)",
            }
        },
        mapButtonActive:{

            color:"#e45505",
            backgroundColor:"rgba(237,231,230,0.8)",
            borderBottom:"solid",
            borderColor:"#e45505",
            borderBottomWidth:"medium",
            "&:hover":{
                backgroundColor:"rgba(236,217,204,0.8)",
            }

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
    overflow: "hidden"
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

    const [showFeed, setShowFeed]=useState(false);
    const [closeFeed, setCloseFeed]=useState(true);

    // for add post dialog
    const [openPost, setOpenPost] = useState(false);
    const [closePost, setClosePost] = useState(true);

    const [announcement, setAnnouncement] = useState('');
    const [location, setLocation] = useState({lat:'', lng:''});

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hostId, setHostId] = useState(null);
    const [checkLatLongRender, setCheck] = useState(false);
    const [checkSwitch, setCheckSwitch] = useState(false);

    const counter = useCounter();
    const setCounter = useCounterActions();
    const navigate = useNavigate();


    const evalAge = (birthdate) => {
        let age = Date.now() - new Date(birthdate);
        let dateOfAge = new Date(age);
        return `Age ${Math.abs(dateOfAge.getUTCFullYear() - 1970)}`;
    }
    const viewAllHost = () =>
    {
        setCheckSwitch(!checkSwitch);
    }

    const checkDescription = (description) => {
        if(description == null || description.length === 0)
            return
        console.log(description.length)
        return(
            <>
                <MdDescription style={{marginLeft:"1rem" , marginRight: "0.5rem"}} /> Description
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
        axios(`https://api.nomadjourney.ir/api/v1/announcement/user-announcements-more-details/${props.announcement_id}/`)
            .then((data) => {
                setAnnouncement(data.data)})
            .catch(error =>
            {
                console.error("error fetching data:", error);
                setError(error);
            })
            .finally( () => {
                console.log(announcement);
                setCheck(true);
                setLoading(false);
            })
    }, [counter]);

    const {posts,allposts}=useAllposts()
    useEffect(()=>{
        posts()
    },[])
    console.log("feed");
    console.log(allposts);

    const classes = useStyles();
    const findBounds = (volunteers) => {
        if(volunteers.length === 0)
            return null;
        let minLats = Number.MAX_VALUE;
        let minLongs = Number.MAX_VALUE;
        let maxLats = Number.MIN_VALUE;
        let maxLongs = Number.MIN_VALUE;
        for(let i = 0; i < volunteers.length; i++)
        {
            if(volunteers[i].host_long < minLongs)
                minLongs = volunteers[i].host_long;

            if(volunteers[i].host_long > maxLongs)
                maxLongs = volunteers[i].host_long;

            if(volunteers[i].host_lat < minLats)
                minLats = volunteers[i].host_lat;

            if(volunteers[i].host_lat > maxLats)
                maxLats = volunteers[i].host_lat;
        }
        console.log(minLats);
        console.log(minLongs);
        console.log(maxLats);
        console.log(maxLongs);
        return [[minLats, minLongs], [maxLats, maxLongs]];

    }
    const checkButton = (anc_status) => {
        if(anc_status === "P" || anc_status === "A")
            return (
                <>
                    <Item className={classes.items}>
                        <Stack sx={{width:"80%", right:"0", position:"fixed"}} direction={`row`}>
                            <Item>
                                <IconButton sx={{color:"rgba(237,231,230,0.7)"}} size={`large`} onClick={() => {setOpenEdit(true); setCloseEdit(false);}}>
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
                                <IconButton sx={{color:"rgba(237,231,230,0.7)"}} size={`large`} onClick={() => {setOpenDelete(true); setCloseDelete(false);}
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
                    <Stack alignItems="center" justifyContent="center" style={{marginTop:"25%"}} >
                        <Item>
                            <ImProfile color={`#EDE7E6FF`} size={`35`}/>
                        </Item>
                        <Item>
                            <div style={{color:"#EDE7E6FF"}}>
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
                                    {key === current && (
                                        <>
                                            <Stack spacing={2} alignItems={`center`}>
                                                <Item>
                                                    <UserProfile user_id={item.id} first_name={item.first_name} imageSize={100} profileSize={`8rem`}/>
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
                                                    <Button sx={{color:"white",backgroundColor:"rgba(0,148,0,0.55)",
                                                        marginRight:"0.5rem",
                                                        "&:hover":{
                                                            backgroundColor: "rgba(0,148,0,0.7)"
                                                        }}}
                                                            color={`success`} onClick={()=> {
                                                        setOpenAccept(true);
                                                        setCloseAccept(false);
                                                        setHostId(item.id);}}>
                                                        Accept
                                                    </Button>
                                                    <Button sx={{color:"white",backgroundColor:"rgba(255,0,0,0.55)",
                                                        "&:hover":{
                                                            backgroundColor: "rgba(255,0,0,0.7)"
                                                        }}}
                                                            color={`error`} onClick={()=> {
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
    
    const SetViewCenter = () => {
        const map = useMap();
        map.setView([announcement.city_lat, announcement.city_long], 13);
    }
    const SetBounds = ({bounds}) => {
        const map = useMap();
        map.fitBounds(bounds);
    }
    const SetViewCenterHost = ({lat, lng}) =>
    {
        const map = useMap();
        map.setView([lat, lng], 13, {
            animate : true,
            duration : 0.7,
        });

    }
    const iconMarkup = renderToStaticMarkup(
        <div className={`marker`}>
            <FaMapMarkerAlt />
        </div>
    );
    const customMarkerIcon = divIcon({
        html: iconMarkup
    });
    const renderMapBox = (anc_status ,volnteers) => {
        if(!Array.isArray(volnteers) || volnteers.length <= 0)
            return(
                <>
                    {checkLatLongRender && <SetViewCenter />}
                </>
            )
        if(anc_status === "A" || anc_status === "D")
            return (
                <>
                    {checkLatLongRender && <SetViewCenter />}
                    <Marker icon={customMarkerIcon} position={[announcement.host_latitude, announcement.host_longitude]} />
                    <SetViewCenterHost lat={announcement.host_latitude} lng={announcement.host_longitude} />

                </>
            )
        return(
            <>
                {volnteers.map((items,key) =>
                    (
                        <>
                            <div key={key}>
                                {key === current && (
                                    <>
                                        <Circle color={'#3c6e71'} center={[items.host_lat, items.host_long]} radius={800} />
                                        <SetViewCenterHost lat={items.host_lat} lng={items.host_long} />
                                    </>
                                )}
                            </div>
                        </>
                    )
                )}
            </>
        )
    }
    const ViewAllVol = ({volnteers}) => {
        return (
            <>
                {volnteers.map((items,key) =>
                    (
                        <>
                            <Circle color={'#3c6e71'} center={[items.host_lat, items.host_long]} radius={1000}
                                    eventHandlers={{
                                        mouseover: (event) => event.target.openPopup(),
                                        mouseout: (event) => event.target.closePopup(),
                                    }}
                                    onClick={(event) => event.target.openPopup()}
                            >
                                <Popup>
                                    <Stack spacing={2} alignItems={`center`}>
                                        <Item>
                                            <UserProfile user_id={items.id} first_name={items.first_name} imageSize={60} profileSize={`4rem`}/>
                                        </Item>
                                        <Item>
                                            <Stack>
                                                <Item>
                                                    <h5>
                                                        {items.first_name} {items.last_name}
                                                    </h5>
                                                </Item>
                                            </Stack>
                                        </Item>
                                    </Stack>
                                </Popup>
                            </Circle>

                        </>
                    )
                )}</>
        )
    }
    const renderHostBox = (status, anc_volunteers, anc_id) => {
        switch (status) {
            case "P":
                return(<>
                    <h2>Host</h2>
                    <Card.Body>
                        {volunteer_hosts(anc_volunteers, anc_id)}
                    </Card.Body>
                </>)
            case "E":
                return(<>
                    <h2>Host</h2>
                    <Card.Body>
                        <Stack alignItems="center" justifyContent="center" style={{marginTop:"25%"}}>
                            <Item>
                                <ImProfile color={`#EDE7E6FF`} size={`35`}/>
                            </Item>
                            <Item>
                                <div style={{color:"#EDE7E6FF"}}>
                                    No one was accepted
                                </div>
                            </Item>
                        </Stack>
                    </Card.Body>

                </>)
            default:
                return(
                    <>
                        <h2>Host</h2>
                        <Card.Body>
                            <div style={{marginTop:"10%"}}>
                                <Stack spacing={2} alignItems="center" justifyContent="flex-start">
                                    <Item>
                                        <UserProfile user_id={announcement.host_id}
                                                     first_name={announcement.host_firstName} imageSize={100}
                                                     profileSize={`8rem`}/>
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
    const handelClickPost=(anc_id) =>{
        navigate(`/home/PostExperience/announcement/${anc_id}`)
    }
    const handleClose = () => {
        props.setOpen(false);
        props.set_anc_id(null);
    }
    const handelSendM=()=>
    {
        navigate(`/chatbar/`)
        
    }
    console.log(props.announcement_id)
    return(
        <Modal open={props.open} onClose={handleClose} >
            <Box sx={{...style}}>
                <Row>
                    <Col md={4}>
                        <div style={{height:"100%", width:"100%"}}>
                            <div style={{backgroundColor:"rgba(228,85,5,0.5)"}}>
                                <div className={classes.sidebarDetails}></div>
                            </div>
                            <div style={{position:"absolute", top:"0.5em",
                                zIndex:"100",left:"0.5em", color:"#EDE7E6FF"}}>
                                <h1 style={{marginLeft: "1.5rem"}}>Announcement</h1>
                                <Stack sx={{marginTop:"2rem"}} spacing={3}>
                                    <Item>
                                        <Stack direction={`row`}>
                                            <Item>
                                                <Typography component="h5"
                                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                    <span><TiLocation style={{marginLeft: "1rem"  ,marginRight: "0.5rem"}} /></span>
                                                </Typography>
                                            </Item>
                                            <Item>
                                                <Stack>
                                                    <Item>
                                                        <Typography component="h5"
                                                                    style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                            <span>{announcement.city_name}</span>
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <Typography component="h5"
                                                                    style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                        <span>{announcement.city_country}
                                                        </span>
                                                        </Typography>
                                                    </Item>
                                                </Stack>
                                            </Item>
                                            <Item>
                                                <Typography component="h5"
                                                            style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                        <span>
                                                    {checkButton(announcement.anc_status)}
                                                        </span>
                                                </Typography>
                                            </Item>
                                        </Stack>
                                    </Item>
                                    <Item>
                                        <Typography component="h5"
                                                    style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                        <span>
                                                        <FaHome style={{ marginLeft: "1rem", marginRight: "0.5rem"}} />{props.numOfNights(announcement.arrival_date, announcement.departure_date)}
                                                        </span>
                                        </Typography>
                                    </Item>
                                    <Item>
                                        <Typography component="h5"
                                                    style={{ display: "flex", alignItems: "center", fontWeight: "bold", alignContent: "center", fontSize:"1vw" }}>
                                                        <span>
                                                        <IoIosPerson style={{marginLeft: "1rem", marginRight: "0.5rem"}} />{props.numOfTravelers(announcement.travelers_count)}
                                                        </span>
                                        </Typography>
                                    </Item>
                                    {announcement.anc_status ==="A" ?
                                    <>
                                    <Grid container alignItems='center' direction='column' justifyContent="center" spacing={1}>
                                            <Grid item >
                                            <Button size='medium'
                                            onClick={handelSendM}
                                            sx={{
                                                color:"rgba(237,231,230,0.8)",
                                                backgroundColor:"rgba(201,153,127,0.2)",
                                            "&:hover":{
                                                color:"rgba(234,187,170,0.8)",
                                                backgroundColor:"rgba(201,153,127,0.27)"
                                            },width:'20vh'
                                            }} startIcon={<SendIcon />}>
                                                Send Messege
                                            </Button>
                                            </Grid>
                                    </Grid>
                                    </>
                                    :null}
                                    {announcement.anc_status === "D" ? 
                                    <>
                                        <div style={{position:"fixed", bottom:"0",
                                            marginBottom:"25rem", marginLeft:"0.25rem",
                                            width:"30%",
                                        }}>
                                    <Grid container alignItems='center' direction='column' justifyContent="center" spacing={1}>
                                        {announcement.existPost ==false ?
                                         <Grid item >
                                         <Button onClick={()=>handelClickPost(announcement.id)}
                                         size='medium' sx={{
                                             color:"rgba(237,231,230,0.8)",
                                             backgroundColor:"rgba(201,153,127,0.2)",
                                         "&:hover":{
                                             color:"rgba(234,187,170,0.8)",
                                             backgroundColor:"rgba(201,153,127,0.27)"
                                         } ,width:'20vh',
                                         borderRadius:'13px'
                                         }} startIcon={<AddIcon />}
                                         >
                                             Add Post
                                         </Button>
                                         </Grid>
                                         :
                                         null
                                        }
                                           
                                        {announcement.existFeedback ==false ?
                                        <Grid item >
                                        <Button size='medium'
                                        onClick={()=>{
                                            setShowFeed(true);
                                            setCloseFeed(false);}}
                                        sx={{
                                            color:"rgba(237,231,230,0.8)",
                                            backgroundColor:"rgba(201,153,127,0.2)",
                                        "&:hover":{
                                            color:"rgba(234,187,170,0.8)",
                                            backgroundColor:"rgba(201,153,127,0.27)"
                                        },width:'20vh',
                                        borderRadius:'13px'

                                        }} startIcon={<FeedbackIcon />}>
                                            Send Feedback
                                        </Button>
                                        </Grid>
                                        :
                                        null
                                        }   
                                            
                                            
                                    </Grid>
                                        </div>
                                    <FeedbackModal
                                        open={showFeed}
                                        setOpen={setShowFeed}
                                        close={closeFeed}
                                        setClose={setCloseFeed}
                                        anc_id={announcement.id}
                                        />
                                    </>:null}
                                  
                                    <Item>
                                        <div style={{position:"fixed", bottom:"0",
                                            marginBottom:"1rem", marginLeft:"0.25rem",
                                            width:"30%", height:"32vh",
                                        }}>
                                            {renderHostBox(announcement.anc_status, announcement.volunteers, announcement.id)}
                                        </div>
                                    </Item>
                                </Stack>


                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            <h1></h1>
                            <Stack>
                                <Item>
                                    <Stack direction={`row`}>
                                        <Item>
                                            <Typography component="h4"
                                                        style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"1vw" }}>
                                                <Stack sx={{marginTop:"1rem", marginLeft:"2rem", borderLeft:"solid", borderLeftWidth:"thin"}}>
                                                    <Item className={classes.dates}>
                                                        Start at {props.dayOfdate(announcement.arrival_date)}
                                                    </Item>
                                                </Stack>
                                            </Typography>
                                        </Item>
                                        <Item>

                                            <Typography component="h4"
                                                        style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"1vw" }}>
                                                <Stack sx={{marginTop:"1rem", marginLeft:"2rem", borderLeft:"solid", borderLeftWidth:"thin"}}>
                                                    <Item className={classes.dates}>
                                                        End at {props.dayOfdate(announcement.departure_date)}
                                                    </Item>
                                                </Stack>
                                            </Typography>
                                        </Item>
                                        <Item>
                                            <Typography component="h4"
                                                        style={{marginRight:"1rem" ,marginTop:"1rem", marginLeft:"0.5rem",
                                                            display: "flex", alignItems: "center", fontWeight: "bold", fontSize:"1vw" }}>
                                                {StatusCheck(announcement.anc_status)}
                                            </Typography>
                                        </Item>
                                    </Stack>
                                </Item>
                                <Item>
                                    <Box sx={{width:"90%"}}>
                                        <Typography component="h4"
                                                    style={{ display: "flex", alignItems: "center", fontWeight: "bold",
                                                        fontSize:"1vw" }}>
                                            <Stack sx={{marginTop:"2rem", marginLeft:"2rem",
                                                borderLeft:"solid", borderLeftWidth:"thin"}}>
                                                <Item>
                                                    {checkDescription(announcement.anc_description)}
                                                </Item>
                                                <Item>
                                                    <div style={{marginLeft:"3rem", wordBreak:"break-word"}}>
                                                        {announcement.anc_description}
                                                    </div>
                                                </Item>
                                            </Stack>
                                        </Typography>
                                    </Box>
                                </Item>
                                <Item>
                                    <div style={{position:"fixed", bottom:"0", marginBottom:"1rem", marginLeft:"2rem",
                                        alignItems:"center", alignContent:"center", justifyContent:"center", justifyItems:"center", display:"flex"}}>
                                        <div className="volunbox">
                                            <MapContainer style={{width:"32vw", height:"32vh",
                                                alignItems:"center", alignContent:"center",
                                                justifyContent:"center", justifyItems:"center", display:"flex"}} center={[0, 0]}
                                                          zoom={13} scrollWheelZoom={true} zoomControl={false}>
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Control position={`topright`}>
                                                    {announcement.anc_status === "P" &&
                                                        announcement.volunteers.length > 1 &&
                                                        <Button
                                                            className={!checkSwitch ?
                                                                classes.mapButton : classes.mapButtonActive}
                                                            onClick={viewAllHost}>
                                                            View All
                                                        </Button>}
                                                </Control>
                                                {!checkSwitch &&
                                                    renderMapBox(announcement.anc_status, announcement.volunteers)}
                                                {checkSwitch && (
                                                    <>
                                                        <SetBounds bounds={findBounds(announcement.volunteers)} />
                                                        <ViewAllVol volnteers={announcement.volunteers} />
                                                    </>
                                                )}
                                            </MapContainer>
                                        </div>
                                    </div>
                                </Item>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Box>
        </Modal>
    )

}