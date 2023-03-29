// import React from 'react';
// import './Settings.css';
import {
    Container,
    Grid,
} from '@mui/material';
import FormContainer from './EditFormContainer';
import ModalsContainer from './ModalsContainer';

const Settings = () => {
    console.log("settings component is rendering");

    return (
        <div style={{ backgroundColor: "#EDE7E6"}}>
            {/* <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3}>
                        <FormContainer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <ModalsContainer />
                    </Grid>
                </Grid>
            </Container> */}
            <h1>In return</h1>
        </div>
    )
}

export default Settings;

