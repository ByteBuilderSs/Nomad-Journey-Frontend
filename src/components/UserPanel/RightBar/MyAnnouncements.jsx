import "./MyAnnouncement.css";
import { TiLocation } from "react-icons/ti";
import { BsCalendarDateFill } from "react-icons/bs";
import AuthAnnouncement from "../../Announcements/AnnouncementDetails/Authenticated/AuthenticatedAnnouncementDetails";
import { Button, Divider, IconButton, Skeleton, Stack, Typography, Grid, Box,Tooltip } from "@mui/material";
import { Item } from "semantic-ui-react";
import { FaHome, FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import { MdDescription } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState } from "react";
import axios from "axios";
import { blue, deepOrange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCounter } from "../../../Context/CounterProvider";
import Lottie from "react-lottie";
import myAnnouncement from "../../../lottieAssets/19469-travelling.json";
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

function MyAnnouncements(props) {
    const counter = useCounter();
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [announcement, setAnnouncement] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [anc_id, setAnc_id] = useState(null);
    const AnnouncementAnimation = () => {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: myAnnouncement,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return(
            <div style={{
                zIndex:"-1"
            }}>
                <Lottie
                    options={defaultOptions}
                    height={300}
                    width={400}
                />
            </div>
        )
    }
    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/api/v1/announcement/get-user-announcements/${props.url_username}`)
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
    // const allData = JSON.parse(localStorage.getItem('tokens'));
    // const local_username = allData.username;
    const checkNotNull = (ancId) => {
        if (ancId != null)
        {
            // if(local_username === username)
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
                            url_username={props.url_username}
                            local_storage_username={props.local_storage_username}
                        />
                    </>
                )
            // return(
            //     <>
            //         <UnAuthAnnouncement
            //             announcement_id={ancId}
            //             open={open}
            //             setOpen={setOpen}
            //             disabled={disabled}
            //             setDisabled={setDisabled}
            //             dayOfdate={getDayOfDate}
            //             checkStatus={statusMode}
            //             numOfTravelers={numberOftravelers}
            //             numOfNights={diffDays}
            //         />
            //     </>
            //     )
        }
    }
    const checkLoading = (isLoading) => {
        if(isLoading)
        {
            const n = 8;
            return(
                <div>
                <Grid container rowSpacing={3} columnSpacing={2}
                      sx={{
                          paddingLeft:"2rem",
                          paddingRight:"3rem",
                          marginTop:"2rem",
                          marginBottom:"2rem"
                      }}>
                    {[...Array(n)].map((e, key) => (
                        <Grid item md={6} xs={12} sm={6} lg={4} xl={3}>
                        <div style={{
                                    borderRadius:"20px",
                                    backgroundColor:"white"
                                }}>
                                <Skeleton variant="rectangular" width="100%" height={200}
                                    sx={{
                                        borderRadius:"20px 20px 0px 0px"
                                    }}
                                />
                                <Stack className={classes.announcements}>
                                        <Item>
                                            <Skeleton variant="rectangular" width={120} height={30} />
                                        </Item>
                                        <Item className={classes.eachAnnouncement}>
                                            <div style={{
                                                paddingTop:"1rem"
                                            }}>
                                                <Skeleton variant="rectangular" width={150} height={15} />
                                            </div>
                                        </Item>
                                        <Item className={classes.eachAnnouncement}>
                                                <Skeleton variant="rectangular" width={150} height={15} />

                                        </Item>
                                        <Item className={classes.eachAnnouncement}>
                                            <Stack sx={{
                                                paddingTop:"0.5rem"
                                            }}
                                                direction={`row`} spacing={1} divider={<Divider orientation={`vertical`} flexItem color={'black'}/>}>
                                                <Item>
                                                    <Skeleton variant="rectangular" width={60} height={15} />
                                                </Item>
                                                <Item>
                                                    <Skeleton variant="rectangular" width={60} height={15} />
                                                </Item>
                                                <Item>
                                                    <Skeleton variant="rectangular" width={60} height={15} />
                                                </Item>
                                            </Stack>
                                        </Item>
                                    </Stack></div>
                            </Grid>))}
        </Grid>
                </div>
        );
        }
        return (
            <ThemeProvider theme={theme}>
                <h5>
                    <Grid container rowSpacing={5} columnSpacing={2}
                    sx={{
                        paddingLeft:"2rem",
                        paddingRight:"3rem",
                        marginTop:"1rem",
                        marginBottom:"2rem",
                    }}>
                    {
                        announcement.length > 0 ? announcement.map((anc, key) =>
                        (

                            <Grid item md={6} xs={12} sm={6} lg={4} xl={3}>
                                <div
                                    className="announcements-hovering"
                                    onClick={() => {
                                            setOpen(true);
                                            setDisabled(false);
                                            setAnc_id(anc.id);}}>
                                    <div style={{
                                        overflow: "hidden",
                                    }}>
                                        <img
                                             src="https://www.outofoffice.com/wp-content/uploads/santorini-1578440_1920.jpg"
                                        />
                                    </div>
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
                                                <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                    <BsCalendarDateFill style={{marginRight:"0.5rem"}}/> {getDayOfDate(anc.arrival_date)} (Start)
                                                </Typography>
                                            </Item>
                                            <Item className={classes.eachAnnouncement}>
                                            <Typography style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                                                <BsCalendarDateFill style={{marginRight:"0.5rem"}}/> {getDayOfDate(anc.departure_date)} (End)
                                            </Typography>
                                        </Item>
                                            <Item className={classes.eachAnnouncement}>
                                                <Stack direction={`row`} spacing={1} divider={<Divider orientation={`vertical`} flexItem color={'black'}/>}>
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
                                        </Stack>
                                </div>
                            </Grid>

                        )) : 
                        <Box
                            sx={{
                                flexGrow: 1,
                                p: 2,
                                width: "100%"
                            }}
                            >
                            <div>
                                    <AnnouncementAnimation />
                                <h2 style={{color:"#004E89"}}>
                                    No Announcement Found!
                                </h2>

                            </div>
                        </Box>
                    }
                </Grid>
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