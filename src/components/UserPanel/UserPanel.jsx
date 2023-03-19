import { Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import MyAnnouncements from "./MyAnnouncements";
import MyPosts from "./Posts";
import MyFeedbacks from "./Feedback";
import AboutMe from "./About";
import "./UserPanel.css";
import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Add, } from "@mui/icons-material";
import {Divider, Stack} from "@mui/material";
import {TiUser} from "react-icons/ti";
import {AiFillNotification} from "react-icons/ai";
import {MdFeedback} from "react-icons/md";
import {HiCamera} from "react-icons/hi";
import {GiTwoCoins} from "react-icons/gi";
import {BsStarHalf} from "react-icons/bs";
import {Item} from "semantic-ui-react";
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles(theme =>(
    {
        newReqBtn:{
            backgroundColor: "white",
            color: "#e45505",
            borderRadius:"18px 8px",
            transition:"0.2s ease",
            padding:"4%",
            border:"solid",
            borderWidth:"1px 0.45em",
            borderColor:"#e45505",
            "&:hover":{
                color: "#e45505",
                backgroundColor: "rgba(228,85,5,0.11)",
            }
        }

    }));

function UserPanelPage() {
    const classes = useStyles();
    const menuItem = [
        {
            name : "About Me",
            component : <AboutMe />,
            icon : <TiUser />,
        },
        {
            name : "Announcements",
            component : <MyAnnouncements />,
            icon : <AiFillNotification />,
        },
        {
            name : "Posts",
            component : <MyPosts />,
            icon : <HiCamera />,
        },
        {
            name : "feedback",
            component : <MyFeedbacks />,
            icon : <MdFeedback />,
        },
    ]
    const [active, setActive] = useState("About Me");
    return (
        <div className="font">
            <Container>
                    <Stack direction={`row`} spacing={10} divider={<Divider orientation={`vertical`} color={`black`} flexItem/>}>
                        <Item>
                            <Row>
                                <Stack alignItems={`center`} spacing={2} divider={<Divider variant={`middle`} flexItem/>}>
                                    <Item>
                                        <Avatar sx={{width:'8vw', height:'8vw'}} />
                                    </Item>
                                    <Item>
                                        <Stack direction={`column`}>
                                            <Item>
                                                Amir Fakharzadeh
                                            </Item>
                                            <Item>
                                                Iranian
                                            </Item>
                                            <Item>
                                                coin: 3 <GiTwoCoins color="#e55405"/>
                                            </Item>
                                            <Item>
                                                rating: 3.5 <BsStarHalf color="#e55405"/>
                                            </Item>
                                        </Stack>
                                    </Item>

                                </Stack>
                            </Row>
                            <Row>
                                <ul className="list-section">
                                    {menuItem.map((item, key) => (
                                        <div className="sidebar_list">
                                            {active === item.name && <Link className={`section selectedSection`} onClick={() => setActive(item.name)}>
                                                 {item.icon} {item.name}
                                            </Link>}
                                            {active !== item.name && <Link className={`section`} onClick={() => setActive(item.name)}>
                                                {item.icon} {item.name}
                                            </Link>}
                                        </div>
                                    ))}
                                </ul>
                            </Row>
                            <Row>
                                <Link className={classes.newReqBtn} to={`/home/AddNewRequest/`}>
                                    <big><Add /> New Announcement</big>
                                </Link>
                            </Row>
                    </Item>
                        <Item>
                            {menuItem.map((item, key) => (
                                <div id={`${item.name}`}>
                                    {active === item.name && item.component}
                                </div>
                            ))}
                        </Item>
                    </Stack>
            </Container>
        </div>);
};

export default UserPanelPage;