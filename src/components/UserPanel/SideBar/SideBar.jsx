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
} from '@mui/material';
import { Item } from "semantic-ui-react";
import { TiUser } from "react-icons/ti";
import { AiFillNotification } from "react-icons/ai";
import { MdFeedback } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";
import { BsStarHalf } from "react-icons/bs";
import MyAnnouncements from '../RightBar/MyAnnouncements';
import AboutMe from '../RightBar/About';
import MyPosts from '../RightBar/Posts';
import MyFeedbacks from '../RightBar/Feedback';
import UserPersonalInfo from '../RightBar/UserPersonalInfo';
import NewAnnouncementForm from '../../Announcements/AddAnnouncement/NewAnnouncementForm';
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";


const menuItem = [
    {
        name : "Edit My Profile",
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
const SideBarCmp = () => {
    
    const [userData, setUserData] = useState({
        first_name : "Aylin",
        last_name : "Naebzadeh",
        email : "aylin@gmail.com",
        username : "AylinNZ",
    });

    const [active, setActive] = useState("Edit My Profile");

    return (
        <React.Fragment>
            <Card  sx={{ bgcolor: "white" }}>
                <Stack spacing={6}>
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
                            <Item>
                                <Box>
                                    <h4 style={{ display: "flex", alignItems: "center" }}><GiTwoCoins color="#e55405" style={{ marginRight: "0.5rem"}}/>  coin: 3</h4>
                                </Box>
                            </Item>
                            <Item>
                                <Box>
                                    <h4 style={{ display: "flex", alignItems: "center" }}><BsStarHalf color="#e55405" style={{ marginRight: "0.5rem"}}/> rating: 3.5</h4>
                                </Box>
                            </Item>
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
        </React.Fragment>

    )
}

export default SideBarCmp;
