import React, { useState } from 'react';
import './Settings.css';
import {
    Button,
    Container,
    Grid, Stack, Tab, Tabs,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FormContainer from './EditFormContainer';
import ModalsContainer from './ModalsContainer';
import {Item} from "semantic-ui-react";
import password from "../../lottieAssets/63004-profile-password-unlock.json";
import email from "../../lottieAssets/84924-email-sent.json";
import Lottie from "react-lottie";
import ResetPassword from "./Modals/ChangePassword";
import ResetEmail from "./Modals/ChangeEmail";
import MyPreference from "./Modals/MyPreferences";
import MyHome from "./Modals/MyHome";
import MyAddress from "./Modals/MyAddress";
import EditProfile from "../UserPanel/EditProfile/EditProfile";
import PersonalDetails from "./Modals/PersonalDetails";
import AboutMe from "./Modals/AboutMe";
const tabsTheme = makeStyles(theme => ({
    selectedTab:{
        backgroundColor:"#F7C59F",
        color:"#004E89",
        borderRadius:"10px 10px 0px 0px",
        transition:"0.3s ease",
        fontWeight:"bold",
        "&:hover":{
            backgroundColor:"#F7C59F",
        }
    },
    tabs:{
        color:"#004E89",
        transition:"0.3s ease",
        fontWeight:"bold",
        borderRadius:"10px 10px 0px 0px",
        "&:hover":{
            backgroundColor:"rgb(227,227,196)",
        }
    },
    content1:{
        borderRadius:"0px 10px 10px 10px",
        width:"100%",
        height:"100%",
        backgroundColor:"#F7C59F",
        transition:"0.5s ease"
    },
    content:{
        borderRadius:"10px",
        width:"100%",
        height:"100%",
        backgroundColor:"#F7C59F",
        transition:"0.5s ease"
    },
    addContent:{
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        borderRadius:"0px 0px 10px 10px",
        width:"80%",
        height:"100%",
        backgroundColor:"#1A659E",
        transition:"all 15s ease-out"
    },
    addButton:{
        color:"#F7C59F",
        fontWeight:"bold",
        fontSize:"medium",
        borderRadius:"10px 10px 0px 0px",
        "&:hover":{
            background:"rgba(26,101,158,0.4)",
            color:"#F7C59F"
        }
    },
    selectedButton:{
        background:"#1A659E",
        color:"#F7C59F",
        fontSize:"medium",
        fontWeight:"bold",
        borderRadius:"10px 10px 0px 0px",
        "&:hover":{
            background:"#1A659E",
            color:"#F7C59F"
        }

    }
}))


const Settings = () => {
    const classes = tabsTheme();
    const [currentTab, setCurrentTab] = useState(0);
    const ChangeEmail = () => {
        const EmailLottie = () => {

            const defaultOptions = {
                loop: true,
                autoplay: true,
                animationData: email,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            };

            return(
                <Lottie
                    options={defaultOptions}
                    height="22em"
                    width="25em"
                />)
        }
        return(
            <>
                <div style={{justifyContent:"center",alignItems:"center", display:"flex",
                    paddingTop:"5rem",paddingBottom:"3rem"}}>
                    <Stack direction={`row`} spacing={1}>
                        <Item>
                            <EmailLottie />
                        </Item>
                        <Item>
                            <ResetEmail />
                        </Item>
                    </Stack>
                </div>
            </>
        )
    }
    const ChangePassword = () => {
        const PasswordLottie = () => {

            const defaultOptions = {
                loop: true,
                autoplay: true,
                animationData: password,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            };

            return(
                    <Lottie
                        options={defaultOptions}
                        height="22em"
                        width="25em"
                    />)
        }
        return(
            <>
                <div style={{justifyContent:"center",alignItems:"center", display:"flex",
                    paddingTop:"5rem",paddingBottom:"3rem"}}>
                <Stack direction={`row`} spacing={1}>
                    <Item>
                            <PasswordLottie />
                    </Item>
                    <Item>
                            <ResetPassword />
                    </Item>
                </Stack>
                </div>
            </>
        )
    }
    const EditHome = () => {
        const[addressTab, setAddressTab] = useState(0);
        const addressTabs = [
            {
                id: 0,
                title: 'My Address',
                component:<MyAddress />
            },
            {
                id: 1,
                title: 'My Home',
                component:<MyHome />
            },
            {
                id: 2,
                title: 'My Preferences',
                component:<MyPreference />
            },
        ]
        return(
            <>
                <div style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                    <div style={{justifyContent:"center", alignItems:"center",
                        display:"flex"}}>
                    <Stack direction={`row`} spacing={5} sx={{justifyContent:"center", alignItems:"center", display:"flex",
                        width:"80%", backgroundColor:"#004E89", borderRadius:"10px 10px 0px 0px"}}>
                        {addressTabs.map((tab, key) => {
                            return (
                                <Item>
                                        <Button
                                            className={addressTab === key ? classes.selectedButton : classes.addButton}
                                            key={tab.id}
                                            onClick={() => setAddressTab(tab.id)}
                                        >
                                            {tab.title}
                                        </Button>
                                </Item>
                            );
                        })}
                    </Stack>
                    </div>
                    <div style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
                    <div className={classes.addContent}>
                        {addressTabs.map((tab, key) => (
                            <>
                                {addressTab === key && tab.component}
                            </>
                        ))
                        }
                    </div>
                    </div>
                </div>
            </>
        )
    }
    const EditProfile = () => {
        const[profileTab, setProfileTab] = useState(0);
        const profileTabs = [
            {
                id: 0,
                title: 'Personal Details',
                component:<PersonalDetails />
            },
            {
                id: 1,
                title: 'About Me',
                component:<AboutMe />
            },
        ]
        return(
            <>
                <div style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                    <div style={{justifyContent:"center", alignItems:"center",
                        display:"flex"}}>
                        <Stack direction={`row`} spacing={5} sx={{justifyContent:"center", alignItems:"center", display:"flex",
                            width:"80%", backgroundColor:"#004E89", borderRadius:"10px 10px 0px 0px"}}>
                            {profileTabs.map((tab, key) => {
                                return (
                                    <Item>
                                        <Button
                                            className={profileTab === key ? classes.selectedButton : classes.addButton}
                                            key={tab.id}
                                            onClick={() => setProfileTab(tab.id)}
                                        >
                                            {tab.title}
                                        </Button>
                                    </Item>
                                );
                            })}
                        </Stack>
                    </div>
                    <div style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
                        <div className={classes.addContent}>
                            {profileTabs.map((tab, key) => (
                                <>
                                    {profileTab === key && tab.component}
                                </>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )

    }
    const tabs = [
        {
            id: 0,
            title: 'Profile',
            component:<EditProfile />
        },
        {
            id: 1,
            title: 'Home',
            component:<EditHome />
        },
        {
            id: 2,
            title: 'Change Email',
            component:<ChangeEmail />
        },
        {
            id: 3,
            title: 'Change Password',
            component:<ChangePassword />
        }
    ];
    return (

        <div className="settings">
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                            <Stack direction={`row`} spacing={3}>
                            {tabs.map((tab, key) => {
                                return (
                                    <Item>
                                        <Button
                                            className={currentTab === key ? classes.selectedTab : classes.tabs}
                                            key={tab.id}
                                            onClick={() => setCurrentTab(tab.id)}
                                        >
                                            {tab.title}
                                        </Button>
                                    </Item>
                                );
                            })}
                            </Stack>
                        <div className={currentTab === 0 ? classes.content1 : classes.content}>
                            {tabs.map((tab, key) => (
                                    <>
                                        {currentTab === key && tab.component}
                                    </>
                                ))
                            }


                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        {/*<ModalsContainer />*/}
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        {/*<FormContainer />*/}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Settings;

