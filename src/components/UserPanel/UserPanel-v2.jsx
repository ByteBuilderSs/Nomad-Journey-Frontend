import './UserPanel-v2.css';
import React, { useState } from 'react';
import {
    Box,
    Paper,
    Grid,
    FormControl,
    TextField,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Avatar,
    Card,
    Container
} from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { TiUser } from "react-icons/ti";
import { AiFillNotification } from "react-icons/ai";
import { MdFeedback } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";
import { BsStarHalf } from "react-icons/bs";
import MyAnnouncements from './RightBar/MyAnnouncements';
import AboutMe from './RightBar/About';
import MyPosts from './RightBar/Posts';
import MyFeedbacks from './RightBar/Feedback';
import NewAnnouncementForm from '../Announcements/AddAnnouncement/NewAnnouncementForm';
import Overview from './Overview';

const menuItem = [
    {
        name : "My Profile",
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

const UserPanelNew = () => {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestData, setRequestData] = useState({});
    const [active, setActive] = useState("My Profile");
    const [userData, setUserData] = useState({
        first_name : "Aylin",
        last_name : "Naebzadeh",
        email : "aylin@gmail.com",
        username : "AylinNZ",
    });

    const openCreateRequest = (event) => {
        setOpen(true);
        setDisabled(false);
    }

    return (
        <div className='userpanel'>
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid container spacing={3}>
                    {/* SideBar */}
                    <Grid item xs={12} sm={12} md={3}>
                        <Card  sx={{ bgcolor: "white" }}>
                            <Stack spacing={6} sx={{ paddingBottom: "1rem" }}>
                                <Item>
                                    <Stack alignItems={`center`} spacing={1}>
                                        <Item>
                                            <Avatar sx={{ width:'15vw', height:'15vw', marginTop: "3rem" }} />
                                        </Item>
                                        <Divider variant={`middle`} flexItem/>
                                        <Item>
                                            <h1 style={{ fontWeight: "bold", marginBottom: "-2rem" }}>{userData.first_name}</h1>
                                            <h1 style={{ fontWeight: "bold" }}>{userData.last_name}</h1>
                                        </Item>
                                        <Stack direction="row" spacing={2}>
                                            <Item>
                                                <h4 style={{ display: "flex", alignItems: "center" }}><BsStarHalf color="#e55405" style={{ marginRight: "0.5rem"}}/> rating: 3.5</h4>
                                            </Item>
                                            <Item>
                                                <h4 style={{ display: "flex", alignItems: "center" }}><GiTwoCoins color="#e55405" style={{ marginRight: "0.5rem"}}/>  coin: 3</h4>
                                            </Item>
                                        </Stack>
                                        <div className="list-section">
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
                                        </div>
                                    </Stack>
                                </Item>
                            </Stack>
                        </Card>
                    </Grid>
                    {/* Right Bar */}
                    <Grid item xs={12} sm={12} md={9}>
                        <Card  sx={{ bgcolor: "white", marginBottom: "0.5rem" }} dir="ltr">
                            <h1 style={{ display: "flex", alignItems: "center", color: "#9B1818", marginTop: "1rem", marginLeft: "1rem", marginBottom: "1rem" }} >
                                Not Accepting Guests
                                <Button
                                    sx={{ marginLeft: "28rem" }}
                                    variant="contained"
                                    size="medium"
                                    color='success'
                                    style={{ minWidth: 150 }}
                                    onClick={(e) => openCreateRequest()}>
                                        Add Announcement
                                </Button>
                            </h1>
                            <p style={{ color: "#BABABA",  marginLeft: "1rem", marginBottom: "0.5rem" }}>Last login HH:MM:SS</p>
                        </Card>
                        <Overview />
                        <Card sx={{ bgcolor: "white", marginBottom: "0.5rem" }} dir="ltr">
                            {menuItem.map((item, key) => (
                                    <div id={`${item.name}`}>
                                        {active === item.name && item.component}
                                    </div>
                                ))}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <NewAnnouncementForm 
                open={open}
                setOpen={setOpen}
                disabled={disabled}
                setDisabled={setDisabled}
                setRequestData={setRequestData}
                requestData={requestData}
            />
        </div>
    )
}

export default UserPanelNew;
