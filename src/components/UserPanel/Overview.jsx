import React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Button,
    Divider,
    Card,
    Typography
} from '@mui/material';

import PublicIcon from '@mui/icons-material/Public';
import ArticleIcon from '@mui/icons-material/Article';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import {useUserData} from '../../hooks/useSetUserData'
import { useEffect } from 'react';
const Overview = () => {
    const {userdata,userInfo}=useUserData()
    useEffect(()=>{userdata()},[])

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/home/Members/Edit/`; 
        navigate(path);
    }
    let birthdate=new Date(userInfo.birthdate)
    let todayYear=(new Date().getFullYear())-(birthdate.getFullYear())
    

    return (
        <Card sx={{ bgcolor: "white", marginBottom: "0.5rem" }} dir="ltr">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        OVERVIEW
                        <Button
                            sx={{ marginLeft: "41.5rem", backgroundColor: "#088AD1" }}
                            variant="contained"
                            size="medium"
                            style={{ minWidth: 150 }}
                            /* TODO => ONCLICK => GO TO EDIT PAGE */
                            onClick={routeChange}
                            >
                                Edit My Profile
                        </Button>
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* Announcements count */}
                <Grid item xs={6} sx={{ marginTop: "1rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <PublicIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {userInfo.announcements_count} Announcements 
                    </Typography>
                </Grid>
                {/* Posts count */}
                <Grid item xs={6} sx={{ marginTop: "1rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <ArticleIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {userInfo.posts_count} Posts 
                    </Typography>
                </Grid>
                {/* Age, Gender */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <FemaleIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {todayYear}, {userInfo.User_gender==1 ? <p>Male</p> :<p>Female</p>}
                    </Typography>
                </Grid>
                {/* Where you grow up */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <LocationOnIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {userInfo.User_city}
                    </Typography>
                </Grid>
                {/* Occupation */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <WorkIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {userInfo.User_about_me!=null ? <p>{userInfo.User_about_me}</p> :<p>nothing to share..</p>}
                    </Typography>
                </Grid>
                {/* Education */}
                <Grid item xs={6}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <SchoolIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        {userInfo.User_education!=null ? <p>{userInfo.User_education}</p> :<p>nothing to share..</p>}
                    </Typography>
                </Grid>
                {/* Member since (signup date) */}
                <Grid item xs={6} sx={{ mb: "1rem" }}>
                    <Typography
                        component="h4"
                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold" }}> 
                        <CardMembershipIcon sx={{ color: "#C4D6E5", marginRight: "0.5rem"}} />
                        Membership :{userInfo.joined_since} ago
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Overview
