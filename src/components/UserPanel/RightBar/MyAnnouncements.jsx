import { Col, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import {BsCalendarDateFill} from "react-icons/bs";
import DeleteAnnouncement from "../../Announcements/DeleteAnnouncement";
import EditAnnouncement from "../../Announcements/EditAnnouncement";
import {Divider, IconButton, Stack} from "@mui/material";
import {Item} from "semantic-ui-react";
import {FaHome, FaLongArrowAltRight} from "react-icons/fa";
import {AiOutlineFieldTime} from "react-icons/ai";
import {IoIosPerson} from "react-icons/io";
import {MdDescription} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles(theme => (
    {
        more:
            {
                "&:hover":{
                    backgroundColor: "rgba(0,63,222,0.19)",
                    color: "#2851b0"
                }
            },
        announcements:
            {
                paddingTop: "2%",
                paddingBottom: "2%",
                paddingLeft: "2%",
                "&:hover":{
                    backgroundColor: "rgba(255,255,255,0.19)",
                }
            },
        eachAnnouncement:
            {
                paddingTop: "1%",
                paddingLeft: "1%"
            }
    }
));
function MyAnnouncements() {
    const classes = useStyles();
    const [userAnnouncements, setUserAnnouncements] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const announcements_params = useParams();
    const [announcement, setAnnouncement] = useState([]);
    useEffect( () =>
    {
        axios(`http://127.0.0.1:8000/api/v1/announcement/get-user-announcement/${announcements_params.username}`)
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
    const diffDays = (date_1, date_2) => {
        let num_days =  Math.ceil( Math.abs( (new Date(date_2) -  new Date(date_1)) ) / (1000 * 60 * 60 * 24));
        if(num_days===1)
            return `${num_days} night`;
        return `${num_days} nights`;
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
        if(description.length >= 80)
            return(
                <>
                    <MdDescription /> Description: {description.substring(0,80)}...
                </>);
        return(
            <>
            <MdDescription /> Description: {description}
            </>
        );
    }
    const check_EditTrash = (announcementStatus) => {
        if (announcementStatus === "P" || announcementStatus === "A")
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
    return (
        <div>
            <h1>Announcements</h1>
            <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                <div>
                    <Stack>
                        {announcement.map((anc, key) =>
                            (
                                <Item >
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
                                            <Stack direction={`row`} spacing={4} divider={<Divider orientation={`vertical`} flexItem />}>
                                                <Item>
                                                    <BsCalendarDateFill/> Sat 19 Mar <FaLongArrowAltRight /> Sun 20 Mar
                                                </Item>
                                                <Item>
                                                    <FaHome /> {diffDays(anc.arrival_date, anc.departure_date)}
                                                </Item>
                                                <Item>
                                                    <IoIosPerson /> {anc.travelers_count} Traveler
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
                                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                                </Item>
                            ))}
                    </Stack>
                </div>
            </div>
    );
}

export default MyAnnouncements;