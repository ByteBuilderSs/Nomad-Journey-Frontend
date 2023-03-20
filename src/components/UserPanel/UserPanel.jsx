import { Container, Row, Col} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import MyAnnouncements from "./MyAnnouncements";
import MyPosts from "./Posts";
import MyFeedbacks from "./Feedback";
import AboutMe from "./About";
import "./UserPanel.css";
import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Add, } from "@mui/icons-material";
import {Stack} from "@mui/material";
import {Divider, Grid, Segment} from "semantic-ui-react";
import {TiUser} from "react-icons/ti";
import {AiFillNotification} from "react-icons/ai";
import {MdFeedback} from "react-icons/md";
import {HiCamera} from "react-icons/hi";
import {GiTwoCoins} from "react-icons/gi";
import {BsStarHalf} from "react-icons/bs";
import {Item} from "semantic-ui-react";
import {makeStyles} from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles(theme =>(
    {
        newReqBtn:{
            backgroundColor: "white",
            color: "#e45505",
            borderRadius:"18px 8px",
            transition:"0.2s ease",
            padding:"4%",
            border:"solid",
            borderWidth:"0em 0.45em",
            borderColor:"#e45505",
            "&:hover":{
                color: "#e45505",
                backgroundColor: "rgba(228,85,5,0.11)",
            }
        }

    }));

function UserPanelPage() {
    const profile_params = useParams();
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
    const [userData, setUserData] = useState({
        first_name : "",
        last_name : "",
        email : "",
        username : "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() =>
    {
        axios.get(`http://127.0.0.1:8000/NormandJourney/user/${profile_params.user_name}`)
            .then(response => setUserData(response.data))
            .catch(error => {
                console.log("error: ",error);
                setError(error);
            }).finally(() => setLoading(false))
    }, []);
    const [active, setActive] = useState("About Me");
    if(error !== null) return error;
    return (
        <div className="font">
            <Segment>
                <Grid  divided>
                    <Grid.Row columns={3}>
                <Grid.Column width={5}>
                    <div className={`side-bar left`}>
                        <Stack spacing={6}>
                            <Item>
                                <Stack alignItems={`center`} spacing={2} divider={<Divider variant={`middle`} flexItem/>}>
                                    <Item>
                                        <Avatar sx={{width:'8vw', height:'8vw'}} />
                                    </Item>
                                    <Item>
                                        <Stack direction={`column`}>
                                            <Item>
                                                {`${userData.first_name} ${userData.last_name}`}
                                            </Item>
                                            <Item>
                                                {userData.username}
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
                            </Item>
                            <Item>
                                <Stack className="list-section">
                                    {menuItem.map((item, key) => (
                                        <Item className="sidebar_list">
                                            {active === item.name && <Link className={`section selectedSection`} onClick={() => setActive(item.name)}>
                                                 {item.icon} {item.name}
                                            </Link>}
                                            {active !== item.name && <Link className={`section`} onClick={() => setActive(item.name)}>
                                                {item.icon} {item.name}
                                            </Link>}
                                        </Item>
                                    ))}
                                </Stack>
                            </Item>
                            <Item>
                                <Link className={classes.newReqBtn} to={`/home/AddNewRequest/`}>
                                    <big><Add /> New Announcement</big>
                                </Link>
                            </Item>
                        </Stack>
                    </div>
                </Grid.Column>
                <Grid.Column width={6}>
                            {menuItem.map((item, key) => (
                                <div id={`${item.name}`}>
                                    {active === item.name && item.component}
                                </div>
                            ))}
                </Grid.Column>
                <Grid.Column width={5}>
                    <div className={`side-bar`}>
                    <div>third Col</div>
                    </div>
                </Grid.Column>
                </Grid.Row>
                </Grid>
            </Segment>
        </div>);
};

export default UserPanelPage;