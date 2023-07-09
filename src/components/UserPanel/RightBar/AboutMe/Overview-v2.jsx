import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Button,
    Divider,
    Card,
    Typography,
    Avatar, Stack
} from '@mui/material';

import PublicIcon from '@mui/icons-material/Public';
import ArticleIcon from '@mui/icons-material/Article';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import {useUserData} from '../../../../hooks/useSetUserData';
import { useEffect } from 'react';
import {addAnnouncement} from "../../../Announcements/AddAnnouncement/NewAnnouncementForm";
import {delAnnouncement} from "../../../Announcements/DeleteAnnouncement";
import { useCounter } from '../../../../Context/CounterProvider';
import UserProfile from "../../../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import axios from "axios";
import {toast} from "react-toastify";
import LetteredAvatar from "react-lettered-avatar";
import {Item} from "semantic-ui-react";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import {makeStyles} from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import AddCoinToUser from "../AddCoin";
const styles = makeStyles(theme => ({
    button:{
        marginLeft:"53rem",
        // background:"linear-gradient(to right, #F7C59F 50%, #1A659E 50%)",
        backgroundPosition:"right bottom",
        color:"#EFEFD0",
        border:"solid 2px #EFEFD0",
        borderRadius:"15px",
        transition:"all 0.2s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundColor: "#F7C59F",
            border:"solid 2px #F7C59F",
            backgroundPosition:"left bottom",
            color:"#1A659E"
        }
    }

}))
const OverviewV2 = (props) => {
    const classes = styles();
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const Counter = useCounter();
    const [profileImageURL, setProfileImageURL] = useState("");
    const {userdata, userInfo} = useUserData(props.url_username);
    useEffect(() => {
            userdata()
        },
        [Counter]);

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/home/Members/Edit/`;
        navigate(path);
    }
    let birthdate=new Date(userInfo.User_birthdate)
    let todayYear=(new Date().getFullYear())-(birthdate.getFullYear())
    const handleClickMoreCoin = () => {
        setOpen(true);
        setDisabled(false);
    }
    const languageCheck = (langF_name, langL_name) => {

        if ((!langF_name || langF_name.length === 0) && (!langL_name || langL_name.length === 0))
        {
            return (
                <>
                    <span>No language to be fluent in is declared yet. No language to be learning is declared yet.</span>
                </>
            );
        }
        else if ((!langF_name || langF_name.length === 0) && (langL_name && langL_name.length !== 0))
        {
            return (
                <>
                    <span>No language to be fluent in is declared yet.
                    Learning {(langL_name.map((LL, index) => (<span key={index}>{(index ? ', ' : ' ') + LL }</span>)))}.</span>
                </>
            );
        }
        else if ((langF_name && langF_name.length !== 0) && (!langL_name || langL_name.length === 0)) {
            return (
                <>
                    <span>Fluent in {(langF_name.map((LF, index) => (<span key={index}>{(index ? ', ' : '') + LF}</span>)))}.
                    No language to be learning is declared yet.</span>
                </>
            );
        }
        else if (langF_name.length !== 0 && langL_name.length !== 0) {
            return (
                <>
                    <span>Fluent in {(langF_name.map((LF, index) => (<span key={index}>{(index ? ', ' : '') + LF}</span>)))}.
                    Learning {(langL_name.map((LL, index) => (<span key={index}>{(index ? ', ' : ' ') + LL }</span>)))}.</span>
                </>
            );
        }
        else {
            return (
                <>
                    <span>Nothing</span>
                </>
            );
        }
    }
    return (
        <>
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        OVERVIEW
                        {props.url_username === props.local_storage_username ?
                            <Button
                                sx={{
                                    marginLeft:"53rem",
                                    // background:"linear-gradient(to right, #F7C59F 50%, #1A659E 50%)",
                                    backgroundPosition:"right bottom",
                                    color:"#EFEFD0",
                                    border:"solid 2px #EFEFD0",
                                    borderRadius:"15px",
                                    transition:"all 0.2s ease-out",
                                    display:"block",
                                    backgroundSize:"200% 100%",
                                    "&:hover":{
                                        backgroundColor: "#F7C59F",
                                        border:"solid 2px #F7C59F",
                                        backgroundPosition:"left bottom",
                                        color:"#1A659E"
                                    }
                                }}
                                onClick={handleClickMoreCoin}
                            >
                                Buy More Coins
                            </Button> : null
                        }
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)"}}/>
                </Grid>
                {/*Profile Info*/}
                <Grid item xs={12} sx={{ marginTop: "1rem"
                ,justifyContent:"center", alignItems:"center", display:"flex"}}>
                    {userInfo  &&
                        <UserProfile user_id={userInfo.id} imageSize={175}
                         profileSize={"14rem"} first_name={userInfo.first_name} />}
                </Grid>
                {/* Announcements count */}
                <Grid item xs={6} sx={{ marginTop: "3rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", alignContent: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <PersonIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.first_name} {userInfo.last_name}
                    </Typography>
                </Grid>
                {/* Coins count */}
                <Grid item xs={6} sx={{ marginTop: "3rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", alignContent: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <PaidIcon sx={{ color: "#F7C59F",
                            marginRight: "0.5rem",}} />
                        {userInfo.coins}
                    </Typography>
                </Grid>
                {/* Posts count */}

                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", alignContent: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <ArticleIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.posts_count === 0 ? <span>No post has been created by the user</span>
                            : <span>{userInfo.posts_count === 1 ? <span>1 Post</span>
                                : <span>{userInfo.posts_count} Posts</span>}</span>}
                    </Typography>
                </Grid>
                {/* Announcements count */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", alignContent: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <LocationOnIcon sx={{ color: "#F7C59F",
                            marginRight: "0.5rem",}} />
                        {userInfo.city_name}</Typography>
                </Grid>
                {/* Announcements count */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", alignContent: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <PublicIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.announcements_count === 0 ? <span>No announcement has been created by the user</span>
                            : <span>{userInfo.announcements_count === 1 ? <span>1 Announcement</span>
                                : <span>{userInfo.announcements_count} Announcements</span>}</span>}
                    </Typography>
                </Grid>

                {/* Age, Gender */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        {userInfo.User_gender == 1 ? (<span><MaleIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />Male, {userInfo.user_age && userInfo.user_age > 0 ? userInfo.user_age : <span>Age is not declared yet...</span>}</span>)
                            : (userInfo.User_gender == 2 ? <span><FemaleIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}}/>Female, {userInfo.user_age && userInfo.user_age > 0 ? userInfo.user_age : <span>Age is not declared yet...</span>}</span>
                                : <span><MaleIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}}/>Non Binary, {userInfo.user_age && userInfo.user_age > 0 ? userInfo.user_age : <span>Age is not declared yet...</span>}</span> )  }
                    </Typography>
                </Grid>
                {/* Where you grow up */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <HomeIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.hometown ? <span>Grown up in {userInfo.hometown}</span> : <span>Hometown is not declared yet...</span>}
                    </Typography>
                </Grid>
                {/* Occupation */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <WorkIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.User_job ? <span>{userInfo.User_job}</span> :<span>Occupation is not declared yet...</span>}
                    </Typography>
                </Grid>
                {/* Education */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <SchoolIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {userInfo.User_education ? <span>{userInfo.User_education}</span> :<span>Education is not declared yet...</span>}
                    </Typography>
                </Grid>
                {/* Member since (signup date) */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <CardMembershipIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        Membership :{userInfo.joined_since} ago
                    </Typography>
                </Grid>
                {/* Fluent and learning languages */}
                <Grid item xs={12} sx={{ mb: "1rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", paddingLeft: "1rem", fontWeight: "bold" }}>
                        <QuestionAnswerIcon sx={{ color: "#F7C59F", marginRight: "0.5rem"}} />
                        {languageCheck(userInfo.langF_name, userInfo.langL_name)}
                    </Typography>
                </Grid>
            </Grid>
            <AddCoinToUser
                current_coin={userInfo.coins}
                open={open}
                setOpen={setOpen}
                disabled={disabled}
                setDisabled={setDisabled} />
        </>
    )
}

export default OverviewV2;