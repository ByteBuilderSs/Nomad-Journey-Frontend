import { Col, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import {BsCalendarDateFill} from "react-icons/bs";
import DeleteAnnouncement from "../../Announcements/DeleteAnnouncement";
import EditAnnouncement from "../../Announcements/EditAnnouncement";
import {Divider, IconButton, Skeleton, Stack} from "@mui/material";
import {Item} from "semantic-ui-react";
import {FaHome, FaLongArrowAltRight} from "react-icons/fa";
import {AiOutlineFieldTime} from "react-icons/ai";
import {IoIosPerson} from "react-icons/io";
import {MdDescription} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
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
    const local_storage = JSON.parse(localStorage.tokens);
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const announcements_params = useParams();
    const [announcement, setAnnouncement] = useState([]);
    useEffect( () =>
    {
        axios(`http://127.0.0.1:8000/api/v1/announcement/get-user-announcement/${username}`)
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
    const statusDefining = (status) => {
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
        if(description.length >= 95)
            return(
                <>
                    <MdDescription /> Description: {description.substring(0,95)}...
                </>);
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
    const check_EditTrash = (announcementStatus) => {
        if (local_storage.username === username && (announcementStatus === "P" || announcementStatus === "A"))
        {
            return(
                <h1>
                    <Row>
                    <Col md='6' xs={6} sm={6}>
                        <EditAnnouncement />
                    </Col>
                    <Col md='6'>
                        <DeleteAnnouncement />
                    </Col>
                    </Row>
                </h1>
            );
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
            <h5>
            <Stack>
                {announcement.map((anc, key) =>
                    (
                        <Link to={`home/Dashboard`}>
                            <div className="announcement-hovering">
                                <Item>
                                    <Stack className={classes.announcements}>
                                        <Item>
                                            <Stack direction={`row`}>
                                                <Item>
                                                    <h1> <TiLocation /> </h1>
                                                </Item>
                                                <Item>
                                                    <Stack>
                                                        <Item>
                                                            <h1>{anc.city_name}</h1>
                                                        </Item>
                                                        <Item>
                                                            <h4>{anc.city_country}</h4>
                                                        </Item>
                                                    </Stack>
                                                </Item>
                                                <Col md={{offset: 8}}>
                                                    <Item>
                                                        {check_EditTrash(anc.anc_status)}
                                                    </Item>
                                                </Col>
                                            </Stack>
                                        </Item>
                                        <Item className={classes.eachAnnouncement}>
                                            <Stack direction={`row`} spacing={4} divider={<Divider orientation={`vertical`} flexItem color={'black'}/>}>
                                                <Item>
                                                    <BsCalendarDateFill/> {getDayOfDate(anc.arrival_date)} <FaLongArrowAltRight /> {getDayOfDate(anc.departure_date)}
                                                </Item>
                                                <Item>
                                                    <FaHome /> {diffDays(anc.arrival_date, anc.departure_date)}
                                                </Item>
                                                <Item>
                                                    <IoIosPerson /> {numberOftravelers(anc.travelers_count)}
                                                </Item>
                                                <Item>
                                                    <big><AiOutlineFieldTime /></big> {statusDefining(anc.anc_status)}
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
                        </Link>
                    ))}
            </Stack>
            </h5>
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