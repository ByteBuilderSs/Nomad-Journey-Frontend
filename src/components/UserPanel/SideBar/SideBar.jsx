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
import {MdFeedback, MdHome} from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";
import { BsStarHalf } from "react-icons/bs";
import MyAnnouncements from '../RightBar/MyAnnouncements';
import AboutMe from '../RightBar/About';
import MyPosts from '../RightBar/myPosts/MyPosts';
import MyFeedbacks from '../RightBar/Feedback';
import NewAnnouncementForm from '../../Announcements/AddAnnouncement/NewAnnouncementForm';
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../RightBar/Home";
import "./SideBar.css"


const menuItem = [
    {
        id: 0,
        name : "About Me",
        component : <AboutMe />,
        icon : <TiUser style={{ marginTop : "-0.2rem" }}/>,
        route: 'about-me/'
    },
    {
        id: 1,
        name : "My Home",
        component : <Home />,
        icon : <MdHome style={{ marginTop : "-0.2rem" }}/>,
        route: 'about-me/'
    },
    {
        id: 2,
        name : "Announcements",
        component : <MyAnnouncements />,
        icon : <AiFillNotification style={{ marginTop : "-0.2rem" }}/>,
        route: 'about-me/'
    },
    {
        id: 3,
        name : "Posts",
        component : <MyPosts />,
        icon : <HiCamera style={{ marginTop : "-0.2rem" }}/>,
        route: 'about-me/'
    }
]
const SideBarCmp = () => {

    return (
        <>
            {menuItem.map((item, key) => (
                <>
                    <Link to={item.route} className={`sidebar-v2`}>
                        <div className={`list-items`}>
                            <span>
                                {item.icon} {item.name}
                            </span>
                        </div>
                    </Link>
                </>
            ))}
        </>

    )
}

export default SideBarCmp;
