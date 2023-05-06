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

const Home = () => {
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        MY HOME
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* ABOUT ME */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
                {/* Why I'm on Nomad Journey */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Why I'm on Nomad Journey</Typography>
                    <Typography component="p" sx={{ width: "95%", ml: "0.5rem", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
                {/* Interests */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Interests</Typography>
                        
                </Grid>
                {/* Music, Movies, and Books */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Music, Movies, and Books</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
                {/* One Amazing Thing I’ve Done */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>One Amazing Thing I’ve Done</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
                {/* Teach, Learn, Share */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Teach, Learn, Share</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
                {/* What I Can Share with Hosts */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                    <Typography component="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>What I Can Share with Hosts</Typography>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
