import '../EditFormContainer.css';
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
import {makeStyles} from "@mui/styles";
import SideBarCard from "../../UserPanel/EditProfile/SideBarCard";
import UpdateProfileImage from "./UpdateProfile";

const styles = makeStyles(theme => ({
    text_field:{
        borderRadius:"15px",
        "& fieldset": { border:"none"}
    },
    button:{
        width:"15em",
        background:"linear-gradient(to right, #F7C59F 50%, #1A659E 50%)",
        backgroundPosition:"right bottom",
        color:"#F7C59F",
        border:"solid 2px #F7C59F",
        borderRadius:"15px",
        transition:"all 0.3s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            color:"#1A659E"
        }
    }

}))
export default function PersonalDetails(props) {
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
    const classes = styles();
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
            url: `https://api.nomadjourney.ir/api/v1/accounts/user/${username}/`,
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
                url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit1/${username}`,
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
                        <form>
                            <div style={{
                                paddingTop:"5rem",
                                paddingBottom:"3rem",
                                paddingRight:"5rem",
                                paddingLeft:"8rem",
                                borderRadius:"15px",
                                color:"#EFEFD0",
                            }}>
                                <Stack direction={`row`} spacing={5}
                                sx={{justifyContent:"center", alignItems:"center", display:"flex"}}>
                                    <Item>
                                        {/* Profile picture */}
                                        <div style={{width:"100%"}}>
                                        <UpdateProfileImage />
                                        </div>
                                    </Item>
                                    <Item>
                                        {/* Username */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "4.8rem" }}>
                                                    Username
                                                </h6>
                                                <FormControl variant="outlined" disabled={true}>
                                                    <TextField
                                                        id="outlined-adornment-username"
                                                        className={classes.text_field}
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        type={"text"}
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
                                                <h6 style={{ fontWeight: "bold", paddingRight: "4.6rem" }}>
                                                    First name
                                                </h6>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        className={classes.text_field}
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        id="outlined-adornment-firstname"
                                                        type={"text"}
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
                                                <h6 style={{ fontWeight: "bold", paddingRight: "4.8rem" }}>
                                                    Last name
                                                </h6>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        className={classes.text_field}
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        id="outlined-adornment-lastname"
                                                        type={"text"}
                                                        value={lastname}
                                                        onChange={handleChangeLastname}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        {/* Phone */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "6.5rem" }}>
                                                    Phone
                                                </h6>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        className={classes.text_field}
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        id="outlined-adornment-phone"
                                                        type={"text"}
                                                        value={phone}
                                                        onChange={handleChangePhone}
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
                                                paddingBottom:"1rem"
                                            }}>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "6rem" }}>
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
                                                        style={{
                                                            color: '#EFEFD0',
                                                            backgroundColor:"rgba(239,239,208,0.11)",
                                                            maxHeight:"0.5rem",
                                                            maxWidth:"15rem",
                                                            border:"none"}}
                                                        inputClass="new-request-date-picker-input"
                                                        className="date-picker"
                                                        format="YYYY-MM-DD"
                                                        name="birthdate"
                                                        calendarPosition="bottom-end"
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
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "6.5rem" }}>
                                                    Gender
                                                </h6>
                                                <FormControl sx={{ width: "15rem", mb: "1rem" }}>
                                                    <Select
                                                        id="gender"
                                                        name="Gender"
                                                        MenuProps={{ style: {
                                                                maxHeight: "10rem",
                                                            }}}
                                                        value={gender}
                                                        onChange={handleChangeGender}
                                                        sx={{ height: "2rem",
                                                            color: '#EFEFD0',
                                                            backgroundColor:"rgba(239,239,208,0.11)",
                                                            '.MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            }  }}
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
                                                <h6 style={{ fontWeight: "bold", paddingRight: "1rem" }}>
                                                    Preferred Language
                                                </h6>
                                                <FormControl sx={{ width: "15rem", mb: "1rem" }}>

                                                    <Select
                                                        id="pref-lang"
                                                        name="Preferred Language"
                                                        MenuProps={{ style: {
                                                                maxHeight: "10rem",
                                                            }}}
                                                        sx={{ height: "2rem",
                                                            color: '#EFEFD0',
                                                            backgroundColor:"rgba(239,239,208,0.11)",
                                                            '.MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(239,239,208,0.11)',
                                                            }  }}
                                                    >
                                                        <MenuItem value={1}>English</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                    </Item>
                                </Stack>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                                      sx={{
                                          paddingTop:"3rem", paddingBottom:"3rem",
                                      }}>
                                    <Button className={classes.button}
                                            onClick={onSubmit}>
                                        Update Details
                                    </Button>
                                </Grid>
                            </div>
                        </form>

                    </Grid>
                </Box>
        </React.Fragment>
    )
}
