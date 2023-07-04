import "./Navbar.css";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Badge from '@mui/material/Badge';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LetteredAvatar from 'react-lettered-avatar';
import {
    MdSettings,
    MdLogout,
    MdManageAccounts,
    MdInbox,
    MdDashboard,
    MdSettingsSuggest,
    MdAccountCircle,
    MdKeyboardArrowDown,
    MdNoteAdd,
    MdLinkedCamera
} from "react-icons/md";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Navigate } from "react-router-dom";
import SiteLogo from "../../Assets/images/nomad-journey-logo-3.jpg";
import defaultAvatar from "../../Assets/images/default-avatar.jpg";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SideBarDrawer from "./sidebarDrawer/SideBarDrawer";
import { useLogout } from "../../hooks/useLogout";
import { useCounter } from "../../Context/CounterProvider";
import axios from 'axios';
import { toast } from "react-toastify";
import {IoNotificationsSharp} from "react-icons/io5";

import Notif from "../Notification/Notif";
import ChatBadegt from '../Messenger/MsgBadget'

let username = "";
let user_id = "";
if (localStorage.getItem('tokens'))
{
    const allData = JSON.parse(localStorage.getItem('tokens'));
    username = allData.username;
    user_id = allData.user_id;
}

const tabs = [
    {
        label: "Home",
        value: 1,
        desktopIcon: <MdDashboard style={{ color: "white", fontSize: "1.2rem " }}/>,
        mobileIcon: <MdDashboard style={{  fontSize: "small" }}/>,
        route: "/home/Dashboard/",
    },
    {
        label: "Profile",
        value: 2,
        desktopIcon: <MdAccountCircle style={{ color: "white", fontSize: "1.2rem " }}/>,
        mobileIcon: <MdAccountCircle style={{  fontSize: "small" }}/>,
        route: `/home/Profile/${username}/`,
    },
    // {
    //     label: "Inbox",
    //     value: 3,
    //     desktopIcon: <MdInbox style={{ color: "white", fontSize: "1.2rem" }}/>,
    //     mobileIcon: <MdInbox style={{  fontSize: "small" }}/>,
    //     route: "/home/Inbox/",
    // },
    {
        label: "Posts",
        value: 3,
        desktopIcon: <MdLinkedCamera style={{ color: "white", fontSize: "1.2rem " }}/>,
        mobileIcon: <MdLinkedCamera style={{  fontSize: "small" }}/>,
        route: `/posts`,
    },
    // {
    //     label: "Post Experience",
    //     value: 4,
    //     desktopIcon: <MdNoteAdd style={{ color: "white", fontSize: "1.2rem" }}/>,
    //     mobileIcon: <MdNoteAdd style={{  fontSize: "small" }}/>,
    //     route: "/home/PostExperience/",
    // }
]

const Navbar = (props) => {
    // const location = useLocation()
    
    const [dir, setDir] = useState("ltr");
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState(
        props.selectedTab ? props.selectedTab : 1
    );
    const [openSideBarDrawer, setOpenSideBarDrawer] = useState(false);
    const [profileImageURL, setProfileImageURL] = useState("");
    const counter = useCounter();

    useEffect(() => {
        console.log("profileImageURL:", profileImageURL);
    }, [profileImageURL]);

    useEffect(() => {
        if (user_id !== "" && user_id) {
            axios({
                method: "get",
                url: `https://api.nomadjourney.ir/api/v1/accounts/get-profile-photo/${user_id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                console.log("+++++++++ THE RESULT OF USEEFFECT FOR RENDERING THE PHOTO IN NAVBAR IS ++++++++ ", result);
                if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                    console.log(" &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ")
                    setProfileImageURL("https://api.nomadjourney.ir" + result.data.profile_photo_URL + `?${Date.now()}`);
                } 
                else {
                    setProfileImageURL("");
                }

    
            }).catch((error) => {
                toast.error("Something went wrong while fetching user profile photo.")
            })
        }
    }, [counter, user_id]);

    useEffect(() => {
        setSelectedTab(props.selectedTab);
    }, [props.selectedTab]);

    const handleChange = (event, newValue) => {
        props.handleTabChange(newValue);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const onSideBarIconClick = () => {
        setOpenSideBarDrawer(!openSideBarDrawer);
    }
    const {logout}=useLogout()
    const handleLogout=async (event)=>{
        event.preventDefault();
        await logout()
    };
    
    return (
        <div dir={dir}>
            <AppBar sx={{ background: "radial-gradient(circle, rgba(26,101,158,1) 0%, rgba(0,78,137,1) 54%)"}}  position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Box sx={{ 
                            flexGrow: 1, 
                            display: {xs: "flex", lg: "none"},
                            height: "4.5rem",
                            marginTop: "1rem",
                            }}
                        >
                            <SideBarDrawer />
                        </Box>
                        <Box
                            style={{ marginLeft: "1rem", width: "12rem", marginBottom:"0.5rem"}}
                            sx={{ display: {xs: "none", lg: "flex"},
                                color:"#EFEFD0" }}
                        >
                            NOMAD JOURNEY
                        </Box>

                        <Typography
                            variant="h5"
                            component="div"
                            noWrap
                            sx={{  flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}
                            style={{ marginLeft: "1rem",
                                color:"#f7c59f"}}
                            className="website-name"
                        >
                            Nomad Journey
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' },
                            marginLeft:"2rem",
                            color:"#f7c59f" }}>
                            <Tabs
                                sx={{
                                    color:"#EFEFD0"
                                }}
                                value={selectedTab}
                                onChange={handleChange}
                                TabIndicatorProps={{
                                    style: {
                                        color: "#D97D54",
                                    },
                                }}
                                aria-label="secondary tabs example"
                                >
                                {tabs.map((tab) => {
                                    return (
                                        <Tab
                                            className="hover-underline-animation"
                                            component={Link}
                                            to={tab.route}
                                            style={{ color: "#EFEFD0" }}
                                            key={tab.value}
                                            label={tab.label}
                                            value={tab.value}
                                        />
                                    );
                                })}
                            </Tabs>
                        </Box>

                        <Notif/>
                        <ChatBadegt/>
                        <Box sx={{ flexGrow: 0 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {/* <Tooltip title="notification">
                                        <IconButton >
                                            <IoNotificationsSharp size={`1.25rem`} color={`#EFEFD0`} />
                                        </IconButton>
                                    </Tooltip> */}
                                    <Tooltip title="Settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border:"2px solid", borderColor:"#EFEFD0" }}>
                                            {
                                                profileImageURL  && profileImageURL !== "" ? 
                                                (
                                                    <div style={{borderRadius: '10rem', overflow: 'hidden'}}>
                                                        <img style={{ width:'2.5rem', height:'2.5rem', objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/>
                                                    </div>
                                                ) :
                                                <LetteredAvatar name={username} backgroundColor='#FFE5B4'/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                            </Box>
                            <Menu
                                sx={{ mt: "1rem" }}
                                anchorEl={anchorElUser}
                                id="account-menu"
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                onClick={handleCloseUserMenu}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                        }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/home/Settings/Members/${username}/`}>
                                        <ListItemIcon>
                                            <ManageAccountsOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Account & Settings</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Logout</Typography>
                                    </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )


}

export default Navbar;