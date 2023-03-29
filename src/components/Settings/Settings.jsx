import React from 'react';
import './Settings.css';
import {
    Container,
    Grid,
} from '@mui/material';
import FormContainer from './EditFormContainer';
import ModalsContainer from './ModalsContainer';

const Settings = () => {
    console.log("settings component is rendering");

    return (
        <div className="settings" >
            <Container style={{ paddingTop: "3rem" }}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={12} md={12}>
                        <h1>Account & Settings</h1>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <ModalsContainer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <FormContainer />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Settings;

