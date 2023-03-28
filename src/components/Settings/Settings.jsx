import React from 'react';
import './Settings.css';
import {
    Container,
    Grid,
} from '@mui/material';
import FormContainer from './EditFormContainer';
import ModalsContainer from './ModalsContainer';

export default function SettingsCmp() {
    return (
        <body>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3}>
                        <FormContainer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <ModalsContainer />
                    </Grid>
                </Grid>
            </Container>
        </body>
    )
}
