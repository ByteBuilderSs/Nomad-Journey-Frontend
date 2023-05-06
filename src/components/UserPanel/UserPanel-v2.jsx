import './UserPanel-v2.css';
import React, { useEffect, useState } from 'react';
import LetteredAvatar from 'react-lettered-avatar';
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
    Container,
    CardHeader,
    Typography,
    Badge
} from '@mui/material';

import { Link, useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { TiUser,TiPin } from "react-icons/ti";
import { AiFillNotification } from "react-icons/ai";
import { MdFeedback, MdHome } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";
import { BsStarHalf } from "react-icons/bs";
import MyAnnouncements from './RightBar/MyAnnouncements';
import AboutMe from './RightBar/About';
import Home from './RightBar/Home';
import MyPosts from './RightBar/myPosts/MyPosts';
import MyFeedbacks from './RightBar/Feedback';
import NewAnnouncementForm from '../Announcements/AddAnnouncement/NewAnnouncementForm';
import Overview from './Overview';
import MyOffers from './RightBar/myOffers/MyOffers';
import {useUserData} from '../../hooks/useSetUserData';
import Notif from '../Badge/Bedge';


const UserPanelNew = () => {
    const user_params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {setIsOpen(!isOpen)};
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestData, setRequestData] = useState({});
    const [active, setActive] = useState("About Me");
    const {userdata, userInfo} = useUserData(user_params.username);
    const allData = JSON.parse(localStorage.getItem('tokens'))
    const local_storage_username = allData.username

    console.log("++++++++++++++++ THE USER PARAM IS ++++++++++++++++ ", user_params.username);

    const menuItem = [
        {
            id: 0,
            name : "About Me",
            component : <AboutMe />,
            icon : <TiUser style={{ marginTop : "-0.2rem" }}/>,
        },
        {
            id: 1,
            name : "My Home",
            component : <Home />,
            icon : <MdHome style={{ marginTop : "-0.2rem" }}/>,
        },
        {
            id: 2,
            name : "Announcements",
            component : <MyAnnouncements 
                            url_username={user_params.username}
                            local_storage_username={local_storage_username}
                        />,
            icon : <AiFillNotification style={{ marginTop : "-0.2rem" }}/>,
        },
        {
            id: 3,
            name : "Posts",
            component : <MyPosts 
                            url_username={user_params.username}
                            local_storage_username={local_storage_username}
                        />,
            icon : <HiCamera style={{ marginTop : "-0.2rem" }}/>,
        }
    ]
    const openCreateRequest = (event) => {
        setOpen(true);
        setDisabled(false);
    }
    useEffect(() => {userdata()}, [])
    

    return (
        <div className='userpanel'>
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid container spacing={3}>
                    {/* SideBar */}
                    
                        <Grid item xs={12} sm={12} md={3} sx={{marginBottom:'3vh'}} >
                            <Card  sx={{ bgcolor: "white" ,height : "max-content"}}>
                                <Stack spacing={6} sx={{ paddingBottom: "1rem" }}>
                                    <Item>
                                        <Stack alignItems={`center`} spacing={1}>
                                            <Item>
                                                {/* <Avatar sx={{ width:'15vw', height:'15vw', marginTop: "3rem" }}>{userInfo.username}</Avatar> */}
                                                <Box sx={{marginTop:'4px'}}>
                                                    <LetteredAvatar name={userInfo.username} backgroundColor='#FFE5B4'  size={100}/>
                                                </Box>
                                            </Item>
                                            <Divider variant={`middle`} flexItem/>
                                            <Item>
                                                <h1 style={{ fontWeight: "bold", marginBottom: "-2rem" }}>{userInfo.first_name}</h1>
                                                <h1 style={{ fontWeight: "bold" }}>{userInfo.last_name}</h1>
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
                            <h1 style={{ display: "flex", alignItems: "ceter", color: "#9B1818", marginTop: "1rem", marginLeft: "1rem", marginBottom: "1rem", justifyContent: "space-between" }} >
                                {userInfo.hosting_availability ? <span>{userInfo.hosting_availability}</span> : <span>Not Accepting Guests</span>}
                                {userInfo.username === local_storage_username ? 
                                    <Button
                                    sx={{ mr: "1rem" }}
                                    variant="contained"
                                    size="medium"
                                    color='success'
                                    style={{ minWidth: 150 }}
                                    onClick={(e) => openCreateRequest()}>
                                        Add Announcement
                                    </Button> : null}
                                
                            </h1>
                            {/* <p style={{ color: "#BABABA",  marginLeft: "1rem", marginBottom: "0.5rem" }}>Last login HH:MM:SS</p> */}
                        </Card>
                        <Overview 
                            url_username={user_params.username}
                            local_storage_username={local_storage_username}
                        />
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
            {userInfo.username === local_storage_username ? 
                <NewAnnouncementForm 
                    open={open}
                    setOpen={setOpen}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    setRequestData={setRequestData}
                    requestData={requestData}
                /> : null
            }
        </div>
    )
}

export default UserPanelNew;
