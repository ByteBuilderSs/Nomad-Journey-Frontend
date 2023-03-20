import { Col, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import {BsCalendarDateFill} from "react-icons/bs";
import "../Announcements/DeleteAnnouncement"
import DeleteAnnouncement from "../Announcements/DeleteAnnouncement";
import EditAnnouncement from "../Announcements/EditAnnouncement";
import {Divider, IconButton, Stack} from "@mui/material";
import {Item} from "semantic-ui-react";
import {FaHome, FaLongArrowAltRight} from "react-icons/fa";
import {AiOutlineFieldTime} from "react-icons/ai";
import {IoIosPerson} from "react-icons/io";
import {MdDescription} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => (
    {
        more:
            {
                "&:hover":{
                    backgroundColor: "rgba(0,63,222,0.19)",
                    color: "#2851b0"
                }
            }
    }
));
function MyAnnouncements() {
    const classes = useStyles();
    const announcements = [
        {
            city: "Madrid",
            country: "Spain",
            status: "Expired",
        },
        {
            city: "Paris",
            country: "France",
            status: "Done",
        },
        {
            city: "Istanbul",
            country: "Turkey",
            status: "Accepted",
        },
        {
            city: "Tehran",
            country: "Iran",
            status: "Pending",
        },
        {
            city: "Madrid",
            country: "Spain",
            status: "Expired",
        },
        {
            city: "Paris",
            country: "France",
            status: "Done",
        },
        {
            city: "Istanbul",
            country: "Turkey",
            status: "Accepted",
        },
        {
            city: "Tehran",
            country: "Iran",
            status: "Pending",
        },
    ]
    const check_EditTrash = (announcementStatus) => {
        if (announcementStatus === "Pending" || announcementStatus === "Accepted")
        {
            return(
                <h1 className="outter">
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
            <h1>    Announcements</h1>
                <div className="outter">
                    <Stack spacing={4} divider={<Divider variant={`fullWidth`} orientation={`horizontal`} flexItem/>}>
                        {announcements.map((announcement, key) =>
                            (
                                <Item >
                                    <Stack>
                                        <Item>
                                            <Stack direction={`row`}>
                                                        <Item>
                                                            <h1> <TiLocation /> </h1>
                                                        </Item>
                                                        <Item>
                                                            <Stack>
                                                                <Item>
                                                                    <h1>{announcement.city}</h1>
                                                                </Item>
                                                                <Item>
                                                                    {announcement.country}
                                                                </Item>
                                                            </Stack>
                                                        </Item>
                                                <Col md={{offset: 8}}>
                                                        <Item>
                                                            {check_EditTrash(announcement.status)}
                                                        </Item>
                                                </Col>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <Stack direction={`row`} spacing={2} divider={<Divider orientation={`vertical`} flexItem />}>
                                                <Item>
                                                    <BsCalendarDateFill/> Sat 19 Mar <FaLongArrowAltRight /> Sun 20 Mar
                                                </Item>
                                                <Item>
                                                    <FaHome /> 1 night
                                                </Item>
                                                <Item>
                                                    <IoIosPerson /> 1 Traveler
                                                </Item>
                                                <Item>
                                                    <big><AiOutlineFieldTime /></big> {announcement.status}
                                                </Item>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <MdDescription /> Description: Just to experience the iranian/persian culture food and hospitality.JustJustJust
                                            <IconButton className={classes.more}>
                                                <FiMoreHorizontal />
                                            </IconButton>
                                         </Item>
                                    </Stack>
                                </Item>
                            ))}
                    </Stack>
                </div>
            </div>
    );
}

export default MyAnnouncements;