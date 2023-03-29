import React from 'react'
import {
    Box,
    Paper,
    Grid,
    FormControl,
    TextField,
    Button,
    Divider,
} from '@mui/material';

export default function FormContainer() {
    return (
        <React.Fragment>
            <Paper sx={{ bgcolor: "white" }}>
                <Box
                    className="drawerContainer"
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                    dir="ltr"
                >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <h2 style={{ textAlign: "left", paddingLeft: "1rem", paddingTop: "0.5rem", paddingBottom: "0.4rem" }}>Account Details</h2>
                        <Divider  sx={{ borderBottomWidth: 3, }} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="Username"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="First name"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="Last name"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="Birthday"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="Gender"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-username"
                            type={"text"}
                            label="Pref Language"
                        />
                        </FormControl>
                    </Grid>

                        
                        
                </Grid>
                <Grid item xs={12} md={6} style={{ marginRight: 5 }}>
                    <FormControl fullWidth variant="outlined">
                    <Button
                        sx={{ m: 1 }}
                        variant="contained"
                        size="large"
                    >
                        تایید
                    </Button>
                    </FormControl>
                </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}
