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
import MenuIcon from "@mui/icons-material/Menu";
import {
    MdSettings,
    MdLogout,
    MdManageAccounts,
    MdInbox,
    MdDashboard,
    MdSettingsSuggest,
    MdAccountCircle,
    MdKeyboardArrowDown,
} from "react-icons/md";
import { styled, alpha } from '@mui/material/styles';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import { Link, Route } from "react-router-dom";
import SiteLogo from "../../Assets/images/nomad-journey-logo-3.jpg";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "bootstrap";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '15rem',
        },
    },
}));

const tabs = [
    {
        label: "Dahsboard",
        value: 1,
        icon: <MdDashboard style={{ color: "white", fontSize: "1.2rem " }}/>,
        route: "/home/Dashboard/",
    },
    {
        label: "Profile",
        value: 2,
        icon: <MdAccountCircle style={{ color: "white", fontSize: "1.2rem " }}/>,
        route: "/home/Inbox/",
    },
    {
        label: "Inbox",
        value: 3,
        icon: <MdInbox style={{ color: "white", fontSize: "1.2rem " }}/>,
        route: "/home/Inbox/",
    },
]

// {
//     label: "Settings",
//     value: 4,
//     icon: <MdSettingsSuggest style={{ color: "white", fontSize: "1.2rem "}}/>,
//     route: "/home/Settings/",
// },

const settingSubTabs = [
    {
        label: "Account & Settings",
        value: 1,
        icon:  <MdSettings style={{ color: "white", fontSize: "1.2rem "}}/>,
        route: "/home/Settings/AccountSettings/",
    },
    {
        label: "Logout",
        value: 2,
        icon: <MdLogout style={{ color: "white", fontSize: "1.2rem"}}/>,
        route: "/home/Logout/",
    }
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
        <AppBar sx={{ backgroundColor: "#E55405"}}  position="static">
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
                        color="inherit"
                        onClick={handleOpenNavMenu}
                        >
                        <MenuIcon />
                    </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: "top",
                                horizental: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "bottom",
                                horizental: "right"
                            }}
                            sx={{
                                display: {xs: "block", ls: "none"},
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            >
                            {tabs.map((page) => (
                                <MenuItem
                                    component={Link}
                                    to={page.route}
                                    key={page.value}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton
                        style={{ marginLeft: "20rem", width: "4.1rem" }}
                        sx={{ display: {xs: "none", lg: "flex"} }}
                    >
                        <Avatar alt="NJ LOGO" src={SiteLogo} style={{ width: "100%"}}/>
                    </IconButton>

                    <Typography
                        variant="h5"
                        component="h5"
                        noWrap
                        sx={{  display: { xs: 'none', sm: 'block' } }}
                        style={{ marginLeft: "1rem"}}
                        className="website-name"
                    >
                        Nomad Journey
                    </Typography>
                    {/* <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
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
                                        icon={tab.icon}
                                        />
                                );
                            })}
                            <Tab 
                                component={IconButton}
                                style={{ color: "white" }}
                                label={"Settings"}
                                value={4}
                                onClick={handleOpenUserMenu}
                                icon={<MdSettingsSuggest style={{ color: "white", fontSize: "1.2rem "}} />}
                            >
                            </Tab>
                            
                        </Tabs>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconButton
                                style={{ marginLeft: -4 }}
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                                >
                                <MdKeyboardArrowDown style={{ color: "white" }} />
                            </IconButton>
                        </Box>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Tab 
                                    component={Link}
                                    label={"Account & Settings"}
                                    value={5}
                                    key={5}
                                    icon={<MdManageAccounts style={{ color: "black", fontSize: "1.2rem "}}/>}
                                    route={"/home/Settings/AccountSettings/"}/>
                            </MenuItem>
                            <MenuItem>
                                <Tab 
                                    component={Link}
                                    label={"Logout"}
                                    value={6}
                                    key={6}
                                    icon={<MdLogout style={{ color: "black", fontSize: "1.2rem "}}/>}
                                    route={"/home/"}/>
                            </MenuItem>
                        </Menu>
                    </Box>    
                </Toolbar>
            </Container>
        </AppBar>
    )


}

export default Nabar;