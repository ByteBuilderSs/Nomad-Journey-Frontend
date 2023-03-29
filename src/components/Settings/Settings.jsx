import React from 'react';
import './Settings.css';
import {
    Container,
    Grid,
} from '@mui/material';
import FormContainer from './EditFormContainer';
import ModalsContainer from './ModalsContainer';

const Settings = () => {

    return (
        <div className="settings">
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={12} md={12}>
                        <h1>Account & Settings</h1>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <ModalsContainer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <FormContainer />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Settings;

