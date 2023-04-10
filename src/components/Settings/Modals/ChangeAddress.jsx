import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    Box,
    Typography,
    Grid,
} from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router';

const ChangeAddressDialog = (props) => {
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const { username } = useParams();

    const [street, setStreet] = useState("")
    const [apt, setApt] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const handleChangeStreet = (event) => {
        setStreet(event.target.value);
    }
    const handleChangeApt = (event) => {
        setApt(event.target.value);
    }
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }
    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    }
    const handleChangePostalCode = (event) => {
        setPostalCode(event.target.value);
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/v1/accounts/user/${username}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            setStreet(result.data.User_address);
            setApt(result.data.User_apt);
            setCity(result.data.User_city);
            setCountry(result.data.User_country);
            setPostalCode(result.data.User_postal_code);
        }).catch((error) => {
            toast.error("Something went wrong while fetching data.")
            {/* TODO => err.response.data.message*/}
        })
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let validData = 1;
        if (!city) {
            toast.error("The City field can not be empty.");
            validData = 0;
        }
        if (!country) {
            toast.error("The Country field can not be empty.");
            validData = 0;
        }
        if (!postalCode) {
            toast.error("The Postal code field can not be empty.");
            validData = 0;
        }
        if (validData === 1)
        {
            axios({
                method: "patch",
                url: `http://127.0.0.1:8000//api/v1/accounts/UserProfileEdit2/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data : {
                    User_address: street,
                    User_apt: apt,
                    User_city: city,
                    User_country: country,
                    User_postal_code: postalCode
                }
            }).then((res) => {
                toast.success("Changes updated successfully.")
            }).catch((error) => {
                toast.error("Something went wrong while updating information.")
            })
        }
        props.setOpen(false);
    }

    const onCancel = async (event) => {
        event.preventDefault();
        loadUserInfo();
        props.setOpen(false);
    }
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>

        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#DBF1F4"}}>
                {"Change My Address"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Fill the form with your new home address.
                </DialogContentText>

                <Box
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, width: 400 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <form
                            id={"Change-Address-Form"}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }} style={{ marginTop: "2rem" }}
                            >
                            {/* Street address */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    Street Address
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="Street Address"
                                        value={street}
                                        onChange={handleChangeStreet}
                                        />
                                </FormControl>
                            </Grid>
                            
                            {/* Apt/Suit/Bldg */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    Apt/Suit/Bldg
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="Apt/Suit/Bldg"
                                        value={apt}
                                        onChange={handleChangeApt}
                                        />
                                </FormControl>
                            </Grid>
                            {/* City */}
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    City <span style={{ color: "red"}}>*</span>
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="City"
                                        value={city}
                                        onChange={handleChangeCity}
                                        />
                                </FormControl>
                            </Grid>
                            {/* Country */}
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    Country <span style={{ color: "red"}}>*</span>
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="Country"
                                        value={country}
                                        onChange={handleChangeCountry}
                                        />
                                </FormControl>
                            </Grid>
                            {/* Postal Code */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    Postal Code <span style={{ color: "red"}}>*</span>
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="Postal Code"
                                        value={postalCode}
                                        onChange={handleChangePostalCode}
                                        />
                                </FormControl>
                            </Grid>
                            <DialogActions>
                                <Button
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    size="large"
                                    type="submit"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{ m: 1 }}
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    color='success'
                                    onClick={onSubmit}
                                >
                                    Update
                                </Button>
                            </DialogActions>
                            </form>
                        </Grid>
                    </Grid>
                
                </Box>
                
            </DialogContent>
            
        </Dialog>
        </div>
    )
}

export default ChangeAddressDialog;
