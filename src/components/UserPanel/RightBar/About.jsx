import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Divider,
    Card,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import {useUserData} from '../../../hooks/useSetUserData';

function About(props) {
    const {userdata, userInfo} = useUserData(props.url_username);
    useEffect(() => {userdata()}, []);

    return(
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        ABOUT ME
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* ABOUT ME */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        {userInfo.User_about_me ? <p>{userInfo.User_about_me}</p> : <p>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>
                {/* Why I'm on Nomad Journey */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Why I'm on Nomad Journey</Typography>
                    <Typography component="p" sx={{ width: "95%", ml: "0.5rem", color: "#0F3E86" }} >
                        {userInfo.why_Im_on_nomadjourney ? <p style={{ marginLeft: "0.75rem" }}>{userInfo.why_Im_on_nomadjourney}</p> : <p style={{ marginLeft: "1.25rem" }}>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>
                {/* Interests */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Interests</Typography>
                        {userInfo.intrest_name && userInfo.intrest_name.length > 0 ? 
                            (
                                <div>
                                    <Stack direction="row" spacing={1}>
                                            {
                                                userInfo.intrest_name.map((interest) => (
                                                <Chip label={interest} color="primary" variant="outlined"/>))
                                            }
                                    </Stack>
                                </div>
                            )
                            :
                            <p style={{ marginLeft: "1.25rem", color: "#0F3E86" }}>Nothing is declared yet...</p>
                        }
                </Grid>
                {/* Music, Movies, and Books */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Music, Movies, and Books</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        {userInfo.favorite_music_movie_book ? <p style={{ marginLeft: "0.75rem" }}>{userInfo.favorite_music_movie_book}</p> : <p style={{ marginLeft: "1.25rem" }}>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>
                {/* One Amazing Thing I’ve Done */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>One Amazing Thing I’ve Done</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        {userInfo.amazing_thing_done ? <p style={{ marginLeft: "0.75rem" }}>{userInfo.amazing_thing_done}</p> : <p style={{ marginLeft: "1.25rem" }}>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>
                {/* Teach, Learn, Share */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Teach, Learn, Share</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        {userInfo.teach_learn_share ? <p style={{ marginLeft: "0.75rem" }}>{userInfo.teach_learn_share}</p> : <p style={{ marginLeft: "1.25rem" }}>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>
                {/* What I Can Share with Hosts */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>What I Can Share with Hosts</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        {userInfo.what_Ican_share_with_host ? <p style={{ marginLeft: "0.75rem" }}>{userInfo.what_Ican_share_with_host}</p> : <p style={{ marginLeft: "1.25rem" }}>Nothing is declared yet...</p>}
                    </Typography>
                </Grid>

            </Grid>
        </>
    );
}

export default About;