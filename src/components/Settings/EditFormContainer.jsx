import './EditFormContainer.css';
import React from 'react';
import {
    Box,
    Paper,
    Grid,
    FormControl,
    TextField,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function FormContainer(props) {
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const { username } = useParams();
    const [user, setUser] = useState({
        User_birthdate: "",
        User_gender: "",
        User_phone_number: "",
        first_name: "",
        last_name: "",
        username: "",
    });
    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        const result = await axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/v1/accounts/user/${username}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
        setUser(result.data);
        console.log("********** The user info ********", user);
    }
    return (
        <React.Fragment>
            <Paper sx={{ bgcolor: "white", paddingTop: "3rem" }}>
                <Box
                    className="drawerContainer"
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, maxWidth: "100%"},
                    }}
                    noValidate
                    autoComplete="off"
                    dir="ltr"
                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <h3 style={{ textAlign: "left", paddingLeft: "1rem",  paddingBottom: "0.5rem", marginTop: "-0.5rem" }}>ACCOUNT DETAILS</h3>
                            <Divider  sx={{ borderBottomWidth: 3, }} />
                        </Grid>
                        <Grid item xs={12}>
                            <h6 style={{ textAlign: "left", paddingLeft: "1rem", paddingTop: "0.5rem", paddingBottom: "0.4rem", color: "#E55405", fontWeight: "bold" }}>MY PERSONAL DETAILS</h6>
                        </Grid>
                        <div style={{ paddingLeft: "2.5rem" }}>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                        }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                            Username <span style={{ color: "red"}}>*</span>
                                        </h6>
                                        <FormControl variant="outlined">
                                            <TextField
                                                sx={{ width: "30rem"}}
                                                id="outlined-adornment-username"
                                                type={"text"}
                                                label="Username"
                                            />
                                        </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                        }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                            First name <span style={{ color: "red"}}>*</span>
                                        </h6>
                                        <FormControl variant="outlined">
                                            <TextField
                                                sx={{ width: "30rem"}}
                                                id="outlined-adornment-firstname"
                                                type={"text"}
                                                label="Firstname"
                                            />
                                        </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                        }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "10.3rem" }}>
                                            Last name <span style={{ color: "red"}}>*</span>
                                        </h6>
                                        <FormControl variant="outlined">
                                            <TextField
                                                sx={{ width: "30rem"}}
                                                id="outlined-adornment-lastname"
                                                type={"text"}
                                                label="Lastname"
                                            />
                                        </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            marginBottom: "1.5rem"
                                        }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "12rem" }}>
                                        Birthday
                                    </h6>
                                    <FormControl sx={{ mt: 1 }}
                                            className="rtlDatePicker">
                                        <DatePicker 
                                            animations={[
                                                transition({
                                                    from: 35,
                                                    transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                                })
                                            ]}
                                            style={{ width: "30rem"}}
                                            inputClass="new-request-date-picker-input"
                                            className="date-picker"
                                            format="YYYY/MM/DD"
                                            name="arrival_date"
                                            calendarPosition="bottom-end"
                                            placeholder="Birthday"
                                            hideOnScroll
                                            editable
                                            isClearable
                                            maxDate={new Date()}
                                            />
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "12.5rem" }}>
                                            Gender
                                        </h6>
                                    <FormControl sx={{ width: "15rem", mb: "1rem" }}>
                                        <InputLabel id="gender-label">
                                            Gender
                                        </InputLabel>

                                        <Select
                                            labelId="gender-label"
                                            id="gender"
                                            label="Gender"
                                            name="Gender"
                                            MenuProps={{ style: {
                                                maxHeight: "10rem",
                                            }}}
                                        >
                                            <MenuItem value={1}>Male</MenuItem>
                                            <MenuItem value={2}>Famele</MenuItem>
                                            <MenuItem value={3}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                }}>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "7rem" }}>
                                                Preferred Language
                                            </h6>
                                        <FormControl sx={{ width: "15rem", mb: "1rem" }}>
                                            <InputLabel id="pref-lang-label">
                                            Preferred Language
                                            </InputLabel>

                                            <Select
                                                labelId="pref-lang-label"
                                                id="pref-lang"
                                                label="Preferred Language"
                                                name="Preferred Language"
                                                MenuProps={{ style: {
                                                    maxHeight: "10rem",
                                                }}}
                                            >
                                                <MenuItem value={1}>English</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <p style={{ display: "inline-block", paddingLeft: "1rem", color: "#BABABA" }}>We will send you messages in this language.</p>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider  sx={{ borderBottomWidth: 3, }} />
                                <h6 style={{ textAlign: "left", paddingLeft: "0.15rem", paddingTop: "0.5rem", paddingBottom: "0.4rem", color: "#E55405", fontWeight: "bold" }}>MY CONTACT DETAILS</h6>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            paddingBottom: "2rem"
                                        }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "12.5rem" }}>
                                            Phone
                                        </h6>
                                        <FormControl variant="outlined">
                                            <TextField
                                                sx={{ width: "30rem"}}
                                                id="outlined-adornment-phone"
                                                type={"text"}
                                                label="Phone"
                                            />
                                        </FormControl>
                                </Box>
                            </Grid>
                            <Grid sx={{ display: "flex", justifyContent: "flex-start", paddingBottom: "1rem" }} item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                    width: "100%",
                                    }}
                                    type="submit"
                                    // disabled={disabled}
                                >
                                    Save Changes
                                </Button>
                            </Grid>
                        </div>
                        
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}
