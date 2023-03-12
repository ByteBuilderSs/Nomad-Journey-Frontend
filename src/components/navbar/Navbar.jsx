import "./Nabar.css";
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
import MenuIcon from "@mui/icons-material/Menu";

import {
    MdSettings,
    MdLogout,
    MdManageAccounts,
    MdInbox,

} from "react-icons/md";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import { Link, Route } from "react-router-dom";
import SiteLogo from "../../Assets/images/nomad-journey-logo-1.png";


const tabs = [
    {
        label: "Settings",
        value: 1,
        icon: <MdSettings style={{ color: "white", fontSize: "1.2rem "}}/>,
        route: "/home/Settings/",
    },
    {
        label: "Inbox",
        value: 2,
        icon: <MdInbox style={{ color: "white", fontSize: "1.2rem " }}/>,
        route: "/home/Inbox/",
    },
]

const Nabar = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [notifBadgeContent, setNotifBadgeContent] = useState(100);
    const [selectedTab, setSelectedTab] = useState(
        props.selectedTab ? props.selectedTab : 1
    );

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

    const onNotifBadgeClick = () => {
        if (notifBadgeContent) {
            setNotifBadgeContent(null);
        }
        else {
            setNotifBadgeContent(100);
        }
    };

    return (
        <AppBar sx={{ backgroundColor: "#104577"}}  position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ 
                        flexGrow: 1, 
                        display: {xs: "flex", lg: "none"},
                        height: "4.5rem"
                        }}
                    >
                    <IconButton
                        size="large"
                        aria-label="user-profile"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizental: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizental: "left"
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: "block", ls: "none"},
                        }}
                        >
                        
                    </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )


}

export default Nabar;