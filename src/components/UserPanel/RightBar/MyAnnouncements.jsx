import { Col, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import {BsCalendarDateFill} from "react-icons/bs";
import DeleteAnnouncement, {delAnnouncement} from "../../Announcements/DeleteAnnouncement";
import EditAnnouncement, {editAnnouncement} from "../../Announcements/EditAnnouncement";
import ShowAnnouncement from "../../Announcements/AnnouncementDetails/Authenticated/AuthenticatedAnnouncementDetails";
import UnAuthAnnouncement from "../../Announcements/AnnouncementDetails/UnAuthenticated/UnAuthenticatedAnnouncementDetails";
import AuthAnnouncement from "../../Announcements/AnnouncementDetails/Authenticated/AuthenticatedAnnouncementDetails";
import {Button, Divider, IconButton, Skeleton, Stack, Typography,Grid} from "@mui/material";
import {Item} from "semantic-ui-react";
import {FaHome, FaLongArrowAltRight} from "react-icons/fa";
import {AiOutlineFieldTime} from "react-icons/ai";
import {IoIosPerson} from "react-icons/io";
import {MdDescription} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from "react";
import {Link, useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import {addAnnouncement} from "../../Announcements/AddAnnouncement/NewAnnouncementForm";
import { blue, deepOrange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: blue,
      secondary: 
      {
        main: '#ffd180'
      }
    }
  });

const useStyles = makeStyles(theme => (
    {
        announcements:
            {
                paddingTop: "2%",
                paddingBottom: "2%",
                paddingLeft: "2%"
            },
        eachAnnouncement:
            {
                paddingTop: "1%",
                paddingLeft: "1%"
            }
    }
));
function MyAnnouncements({username}) {
    const navigate=useNavigate()
    const local_storage = JSON.parse(localStorage.tokens);
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [announcement, setAnnouncement] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [anc_id,setAnc_id] = useState(null);
    useEffect( () =>
    {
        axios(`http://91.107.166.228:8000/api/v1/announcement/get-user-announcements/${username}`)
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
    }, [addAnnouncement, delAnnouncement, editAnnouncement])
    
    const handelClickPost=(announcement_id)=>{
        navigate(`/home/PostExperience/announcement/${announcement_id}`)
    }
    const getDayOfDate = (date) => {
        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const day_date = new Date(date);
        return `${weekdays[day_date.getDay()]},  ${months[day_date.getMonth()]} ${day_date.getDate()}, ${day_date.getFullYear()}`;
    }
    const diffDays = (date_1, date_2) => {
        let num_days =  Math.ceil( Math.abs( (new Date(date_2) -  new Date(date_1)) ) / (1000 * 60 * 60 * 24));
        if(num_days===1)
            return `${num_days} Night`;
        return `${num_days} Nights`;
    }
    const statusMode = (status) => {
        switch (status){
            case 'P':
                return "Pending";
            case 'D':
                return "Done";
            case 'A':
                return "Accepted";
            case 'E':
                return "Expired";
        }
    }
    const checkDescription = (description) => {
        if(description === null || description === "")
            return;
        if(description.length >= 78)
        {

            let counter = 0, uppercase = 0;
            for (; counter < 78; counter++)
            {
                if(description[counter] === description[counter].toUpperCase())
                    uppercase++;
            }
            return(
                <>
                    <MdDescription /> Description: {description.substring(0,78-(uppercase/3))}...
                </>);
        }
        return(
            <>
            <MdDescription /> Description: {description}
            </>
        );
    }
    const numberOftravelers = (travler_count) => {
        if(travler_count === 1)
            return`${travler_count} Traveler`;
        return `${travler_count} Travelers`;
    }
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const local_username = allData.username;
    const checkNotNull = (ancId) => {
        if (ancId != null)
        {
            if(local_username === username)
                return (
                    <>
                        <AuthAnnouncement
                            announcement_id={ancId}
                            set_anc_id={setAnc_id}
                            open={open}
                            setOpen={setOpen}
                            disabled={disabled}
                            setDisabled={setDisabled}
                            dayOfdate={getDayOfDate}
                            checkStatus={statusMode}
                            numOfTravelers={numberOftravelers}
                            numOfNights={diffDays}
                        />
                    </>
                )
            return(
                <>
                    <UnAuthAnnouncement
                        announcement_id={ancId}
                        open={open}
                        setOpen={setOpen}
                        disabled={disabled}
                        setDisabled={setDisabled}
                        dayOfdate={getDayOfDate}
                        checkStatus={statusMode}
                        numOfTravelers={numberOftravelers}
                        numOfNights={diffDays}
                    />
                </>
                )

        }
    }
    const checkLoading = (isLoading) => {
        if(isLoading)
        {
            const n = 4;
            return(
                <Stack>
                    {[...Array(n)].map((e, key) => (
                        <div>
                        <Item>
                            <Stack className={classes.announcements} spacing={1}>
                                <Item>
                                    <Skeleton variant="rectangular" width={200} height={35} />
                                </Item>
                                <Item className={classes.eachAnnouncement}>
                                    <Stack direction={`row`} spacing={4} divider={<Divider orientation={`vertical`} flexItem />}>
                                        <Item>
                                            <Skeleton variant="rectangular" width={180} height={20} />
                                        </Item>
                                        <Item>
                                            <Skeleton variant="rectangular" width={100} height={20} />
                                        </Item>
                                        <Item>
                                            <Skeleton variant="rectangular" width={100} height={20} />
                                        </Item>
                                        <Item>
                                            <Skeleton variant="rectangular" width={100}  height={20} />
                                        </Item>
                                    </Stack>
                                </Item>
                                <Item className={classes.eachAnnouncement}>
                                    <Skeleton variant="rectangular" width={675} height={20} />
                                </Item>
                            </Stack>
                            <Divider sx={{ borderBottomWidth: 1, width: "150rem"}} />
                        </Item>
                        </div>
                    ))}
                </Stack>
            );
        }
        return (
            <ThemeProvider theme={theme}>
                <h5>
                <Stack>
                    {announcement.map((anc, key) =>
                        (
                                <div
                                    className="announcement-hovering"
                                    onClick={() => {
                                            setOpen(true);
                                            setDisabled(false);
                                            setAnc_id(anc.id);}}>
                                    <Item>
                                        <Stack className={classes.announcements}>
                                            <Item>
                                                <Stack direction={`row`}>
                                                    <Item>
                                                        <h1> <TiLocation style={{marginRight:"0.25rem"}} /> </h1>
                                                    </Item>
                                                    <Item>
                                                        <Stack>
                                                            <Item>
                                                                <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                    <span>{anc.city_name}</span>
                                                                    {anc.anc_status=="D"?<>
                                                                    <Button
                                                                        sx={{ ml: "40rem" }}
                                                                        onClick={()=>{handelClickPost(anc.id)}}
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        size="medium"
                                                                        startIcon={<AddIcon />}
                                                                        >
                                                                        Add Post
                                                                    </Button>
                                                                    </> :null}
                                                                </h1>
                                                            </Item>
                                                            <Item>
                                                                <h4>{anc.city_country}</h4>
                                                            </Item>
                                                        </Stack>
                                                    </Item>
                                                </Stack>
                                            
                                            </Item>
                                            <Item className={classes.eachAnnouncement}>
                                                <Stack direction={`row`} spacing={3} divider={<Divider orientation={`vertical`} flexItem color={'black'}/>}>
                                                    <Item>
                                                        <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                            <BsCalendarDateFill style={{marginRight:"0.5rem"}}/> {getDayOfDate(anc.arrival_date)} <FaLongArrowAltRight /> {getDayOfDate(anc.departure_date)}
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                            <FaHome  style={{marginRight:"0.5rem"}}/> {diffDays(anc.arrival_date, anc.departure_date)}
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                            <IoIosPerson style={{marginRight:"0.5rem"}} /> {numberOftravelers(anc.travelers_count)}
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                            <big><AiOutlineFieldTime style={{marginRight:"0.5rem"}}/></big> {statusMode(anc.anc_status)}
                                                        </Typography>
                                                    </Item>
                                                    
                                                </Stack>
                                            </Item>
                                            <Item className={classes.eachAnnouncement}>
                                                {checkDescription(anc.anc_description)}
                                            </Item>
                                        </Stack>
                                        <Divider sx={{ borderBottomWidth: 1, width: "150rem"}} />
                                    </Item>

                                </div>
                        ))}
                </Stack>
                    {checkNotNull(anc_id)}
                    {() => setAnc_id(null)}
                </h5>
            </ThemeProvider>

        )
    }
    return (
        <div>
                <div>
                    {checkLoading(loading)}
                </div>
            </div>
    );
}

export default MyAnnouncements;