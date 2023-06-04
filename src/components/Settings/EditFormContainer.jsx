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
    Stack,
} from '@mui/material';
import { Item } from "semantic-ui-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from "react-toastify";

export default function FormContainer(props) {
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    let { username } = useParams();
    console.log("The username is: ", username);
    const [usernameState, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState(null);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangeFirstName = (event) => {
        setFirstname(event.target.value);
    }

    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/ api/v1/accounts/user/${username}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            setUsername(result.data.username);
            setFirstname(result.data.first_name);
            setLastname(result.data.last_name);
            setBirthday(result.data.User_birthdate);
            setGender(result.data.User_gender);
            setPhone(result.data.User_phone_number);
        }).catch((error) => {
            toast.error("Something went wrong while fetching data.")
            {/* TODO => err.response.data.message*/}
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let birthdate = new Date();
        let validData = true;
        if (!usernameState) {
            toast.error("The Username field can not be empty.");
            validData = false;
        }
        if (!firstname) {
            toast.error("The Firstname field can not be empty.");
            validData = false;
        }
        if (!lastname) {
            toast.error("The Lastname field can not be empty");
            validData = false;
        }
        if (birthday) {
            birthdate = new DateObject({
                date: birthday,
                formate: "YYYY-MM-DD"
            }).format("YYYY-MM-DD");
        }
        if (validData) {
            axios({
                method: "patch",
                url: `https://api.nomadjourney.ir/ api/v1/accounts/UserProfileEdit1/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data : {
                    User_birthdate: birthdate,
                    User_gender: gender,
                    User_phone_number: phone,
                    first_name: firstname,
                    last_name: lastname,
                    username: usernameState
                }
            }).then((res) => {
                toast.success("Changes updated successfully.")
            }).catch((error) => {
                toast.error("Something went wrong while updating information.")
            })
        }
    }

    const onCancel = async (event) => {
        event.preventDefault();
        loadUserInfo();
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
                        <form>
                            <div style={{ paddingLeft: "2.5rem" }}>
                                {/* Username */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                Username <span style={{ color: "red"}}>*</span>
                                            </h6>
                                            <FormControl variant="outlined" disabled={true}>
                                                <TextField
                                                    sx={{ width: "30rem"}}
                                                    id="outlined-adornment-username"
                                                    type={"text"}
                                                    label="Username"
                                                    value={usernameState}
                                                    onChange={handleChangeUsername}
                                                    disabled
                                                />
                                            </FormControl>
                                    </Box>
                                </Grid>
                                {/* Firstname */}
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
                                                    value={firstname}
                                                    onChange={handleChangeFirstName}
                                                />
                                            </FormControl>
                                    </Box>
                                </Grid>
                                {/* Lastname */}
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
                                                    value={lastname}
                                                    onChange={handleChangeLastname}
                                                />
                                            </FormControl>
                                    </Box>
                                </Grid>
                                { /* Birthday */}
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
                                                format="YYYY-MM-DD"
                                                name="birthdate"
                                                calendarPosition="bottom-end"
                                                placeholder="Birthday"
                                                hideOnScroll
                                                editable
                                                isClearable
                                                maxDate={new Date()}
                                                value={birthday}
                                                onChange={(date) => {
                                                    // const d = new Date(date);
                                                    setBirthday(date);
                                                    }}
                                                />
                                        </FormControl>
                                    </Box>
                                </Grid>
                                {/* Gender */}
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
                                                value={gender}
                                                onChange={handleChangeGender}
                                            >
                                                <MenuItem value={1}>Male</MenuItem>
                                                <MenuItem value={2}>Female</MenuItem>
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
                                {/* Phone */}
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
                                                    value={phone}
                                                    onChange={handleChangePhone}
                                                />
                                            </FormControl>
                                    </Box>
                                </Grid>
                                <Grid sx={{ display: "flex", justifyContent: "flex-start", paddingBottom: "1rem" }} item xl={3} lg={3} md={3} sm={12} xs={12}>
                                    <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
                                        <Item>
                                            <Button
                                                variant="contained"
                                                sx={{ width: "100%" }}
                                                type="submit"
                                                // disabled={disabled}
                                                color='success'
                                                onClick={onSubmit}
                                            >
                                                Update
                                            </Button>
                                        </Item>
                                        <Item>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                width: "100%",
                                                }}
                                                type="submit"
                                                onClick={onCancel}
                                            >
                                                Cancel
                                            </Button>
                                        </Item>
                                    </Stack>
                                </Grid>
                            </div>
                        </form>
                        
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}
