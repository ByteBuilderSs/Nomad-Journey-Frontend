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

const allData = JSON.parse(localStorage.getItem('user'));
const username = allData.username;

const tabs = [
    {
        label: "Dashboard",
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
        route: `/home/Profile/${username}`,
    },
    {
        label: "Inbox",
        value: 3,
        desktopIcon: <MdInbox style={{ color: "white", fontSize: "1.2rem" }}/>,
        mobileIcon: <MdInbox style={{  fontSize: "small" }}/>,
        route: "/home/Inbox/",
    },
    {
        label: "Post Experience",
        value: 4,
        desktopIcon: <MdNoteAdd style={{ color: "white", fontSize: "1.2rem" }}/>,
        mobileIcon: <MdNoteAdd style={{  fontSize: "small" }}/>,
        route: "/home/PostExperience/",
    }
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
    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     let refresh = localStorage.getItem('refresh');
    //     let access = localStorage.getItem('access');
    //     axios({
    //         method: "post",
    //         url: "http://127.0.0.1:8000/api/v1/accounts/logout/",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${access}`
    //         },
    //         data: {
    //             refresh_token: refresh
    //         }
    //     })
    //     .then((res) => {
    //         localStorage.removeItem("refresh");
    //         localStorage.removeItem("access");
    //         localStorage.removeItem("username");

    //         window.location="/authentication";
    //         toast.success("Logged out successfully");
    //     })
    //     .catch((error) => {
    //         toast.error("Unexpected error has occurred");
    //     })
    // };
    return (
        <div dir={dir}>
            <AppBar sx={{ backgroundColor: "#E55405"}}  position="static">
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
                        <IconButton
                            style={{ marginLeft: "10rem", width: "4.1rem" }}
                            sx={{ display: {xs: "none", lg: "flex"} }}
                        >
                            <Avatar alt="LOGO" src={SiteLogo} style={{ width: "100%"}}/>
                        </IconButton>

                        <Typography
                            variant="h5"
                            component="div"
                            noWrap
                            sx={{  flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}
                            style={{ marginLeft: "1rem"}}
                            className="website-name"
                        >
                            Nomad Journey
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleChange}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#D97D54",
                                    },
                                }}
                                aria-label="secondary tabs example"
                                >
                                {tabs.map((tab) => {
                                    return (
                                        <Tab 
                                            component={Link}
                                            to={tab.route}
                                            style={{ color: "white" }}
                                            key={tab.value}
                                            label={tab.label}
                                            value={tab.value}
                                            icon={tab.desktopIcon}
                                        />
                                    );
                                })}
                            </Tabs>
                        </Box>
                        
                        <Box sx={{ flexGrow: 0 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Tooltip title="Settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Settings" src={defaultAvatar}/>
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton
                                        style={{ marginRight: "1rem"}}
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <MdKeyboardArrowDown style={{ color: "white" }}/>
                                    </IconButton>
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