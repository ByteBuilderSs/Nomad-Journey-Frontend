import  "./NewRequestForm.css";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Button, Dialog } from "@mui/material";
import { styled, StyledEngineProvider, ThemeProvider, createTheme} from '@mui/material/styles';
import { Theme } from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import { useMediaQuery } from "react-responsive";
import PropTypes from 'prop-types';
import {AxiosError} from 'axios';


const intialState = {
    country: "",
    city: "",
    arrival_date: "",
    departure_date: "",
    arrival_date_is_flexible: false,
    departure_date_is_flexible: false,
    message: "",
    countryErr: false,
    cityErr: false,
    arrival_dateErr: false,
    departure_dateErr: false,
};

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Athorization
}

export default function NewRequestForm(props) {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [arrival_date, setArrivalDate] = useState('')
    const [departure_date, setDepartureDate] = useState('');
    const [arrival_date_is_flexible, setIsArrDateFelxible] = useState(false);
    const [departure_date_is_flexible, setIsDptDateFelxible] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }

    const handleChangeArrivalDate = (event) => {
        setArrivalDate(event.target.value);
    }

    const handleChangeDepartureDate = (event) => {
        setDepartureDate(event.target.value);
    }

    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    }

    const handleChangeIsArrDateFlexible = (event) => {
        setIsArrDateFelxible(event.target.checked);
    };
    const handleChangeIsDptDateFlexible = (event) => {
        setIsDptDateFelxible(event.target.checked);
    };
    
    const [values, setValues] = useState(intialState);
    
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

    // Data Validation and Send to Backend
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const onSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/announcement/create/", {
            country : country,
            city : city,
            arrival_date: arrival_date,
            departure_date: departure_date,
            arrival_date_is_flexible: arrival_date_is_flexible,
            departure_date_is_flexible: departure_date_is_flexible,
            message: message,
            })
            .then((res) =>{
                console.log(res.data)
            })
            .catch((error) => {
                if (!error?.response) {
                    console.log("No Server Response");
                } else if (error?.code === AxiosError.ERR_NETWORK) {
                    console.log("Network Error");
                } else if (error.response?.status === 404) {
                    console.log("404 - Not Found");
                } else if (error?.code) {
                    console.log("Code: " + error.code);
                } else {
                    console.log("Unknown Error");
                }
            });
        }


    const handleClose = () => {
        props.setOpen(false);
    };

    const onCancle = () => {
        props.setRequestData({});
        setValues(intialState);
    };

    return (
        <Dialog 
            open={props.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
                <Box className="add-request-center-element" sx={{ m: 2, maxWidth: "100%" }}>
                    <Box className="request-management-add-request">
                        <Grid container spacing={3}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Box className="add-request-center-element">
                                    <form className="add-request-form">
                                        <Box>
                                            <Box className="add-request-center-element form-title">
                                                <h1 style={{ marginBottom: "3rem"}}>Enter The Trip Info</h1>
                                            </Box>
                                            <Grid container spacing={2}>
                                                {/* country name */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <FormControl sx={{width: "100%"}}>
                                                        <TextField 
                                                            id="new-request-country"
                                                            name="country"
                                                            type="text"
                                                            label="Country"
                                                            variant="outlined"
                                                            inputProps={{maxLength: 20}}
                                                            onChange={handleChangeCountry}
                                                            required/>
                                                    </FormControl>
                                                </Grid>
                                                {/* city name */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <FormControl sx={{width: "100%"}}>
                                                        <TextField 
                                                            id="new-request-city"
                                                            name="city"
                                                            type="text"
                                                            label="City"
                                                            variant="outlined"
                                                            inputProps={{maxLength: 20}}
                                                            onChange={handleChangeCity}
                                                            required/>
                                                    </FormControl>
                                                </Grid>
                                                {/* Arrival Date */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <FormControl sx={{ mt: 1 }}
                                                                style={{ width: "100%" }}
                                                                className="rtlDatePicker">
                                                        <DatePicker 
                                                            animations={[
                                                                transition({
                                                                    from: 35,
                                                                    transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                                                })
                                                            ]}
                                                            style={{ width: "100%"}}
                                                            inputClass="new-request-date-picker-input"
                                                            className="date-picker"
                                                            format="YYYY/MM/DD"
                                                            name="arrival_date"
                                                            calendarPosition="bottom-end"
                                                            placeholder="Arrival Date *"
                                                            hideOnScroll
                                                            editable
                                                            // onChange={handleChangeArrivalDate}
                                                            />
                                                    {/*  arrival date is flexible */}
                                                    <FormControlLabel
                                                        control={<Checkbox 
                                                                    value="arrivaldateisflexible" 
                                                                    color="primary" 
                                                                    onChange={handleChangeIsArrDateFlexible}
                                                                    />}
                                                        label="Arrival date is flexible"
                                                    />
                                                    </FormControl>
                                                </Grid>
                                                {/* Departure Date */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <FormControl sx={{ mt: 1 }}
                                                                style={{ width: "100%" }}
                                                                    className="rtlDatePicker">
                                                        <DatePicker 
                                                            animations={[
                                                                transition({
                                                                    from: 35,
                                                                    transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                                                })
                                                            ]}
                                                            style={{ width: "100%"}}
                                                            inputClass="new-request-date-picker-input"
                                                            className="date-picker"
                                                            format="YYYY/MM/DD"
                                                            name="departure_date"
                                                            calendarPosition="bottom-end"
                                                            placeholder="Departure Date *"
                                                            hideOnScroll
                                                            editable
                                                            required
                                                            minDate={values.arrival_date}
                                                            // onChange={handleChangeDepartureDate}
                                                            />
                                                    </FormControl>
                                                    {/* departure date is  flexible */}
                                                    <FormControlLabel
                                                        control={<Checkbox 
                                                                    value="arrivaldateisflexible" 
                                                                    color="primary"
                                                                    onChange={handleChangeIsDptDateFlexible}
                                                                    />}
                                                        label="Departure date is flexible"
                                                    />
                                                </Grid>
                                                {/* Travelers count */}
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <FormControl sx={{ width: "100%", mb: "1rem" }}>
                                                            <InputLabel id="travelers-count-label" required>
                                                                Number of Travelers
                                                            </InputLabel>

                                                                <Select
                                                                    labelId="travelers-count-labe"
                                                                    id="travelers-count"
                                                                    label="Number of Travelers"
                                                                    name="number of travelers"
                                                                    MenuProps={{ style: {
                                                                        maxHeight: "10rem",
                                                                    }}}
                                                                    onChange={handleChange("number_of_travelers")}
                                                                    /* Add value*/
                                                                >
                                                                    <MenuItem value={1}>1</MenuItem>
                                                                    <MenuItem value={2}>2</MenuItem>
                                                                    <MenuItem value={3}>3</MenuItem>
                                                                    <MenuItem value={4}>4</MenuItem>
                                                                    <MenuItem value={5}>5</MenuItem>
                                                                    <MenuItem value={6}>6</MenuItem>
                                                                    <MenuItem value={7}>7</MenuItem>
                                                                    <MenuItem value={8}>8</MenuItem>
                                                                    <MenuItem value={9}>9</MenuItem>
                                                                    <MenuItem value={10}>10</MenuItem>
                                                                    <MenuItem value={11}>11</MenuItem>
                                                                    <MenuItem value={12}>12</MenuItem>
                                                                    <MenuItem value={13}>13</MenuItem>
                                                                    <MenuItem value={14}>14</MenuItem>
                                                                    <MenuItem value={15}>15</MenuItem>
                                                                </Select>
                                                    </FormControl>
                                                </Grid>
                                                {/* message */}
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <FormControl sx={{width: "100%"}}>
                                                        <TextField 
                                                            id="new-request-message"
                                                            name="message"
                                                            type="text"
                                                            label="Message"
                                                            variant="outlined"
                                                            multiline 
                                                            fullWidth="true"
                                                            size="medium"
                                                            rows={10}
                                                            maxRows={10}
                                                            onChange={handleChangeMessage}
                                                            />
                                                    </FormControl>
                                                </Grid>
                                                {/* Confirm Button */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ width: "100%" }}
                                                        type="submit"
                                                        onClick={onSubmit}
                                                    >
                                                        Submit the information
                                                    </Button>
                                                </Grid>
                                                {/* Quit */}
                                                <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                        width: "1000%",
                                                        }}
                                                        type="submit"
                                                        onClick={onCancle}
                                                    >
                                                        Quit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </form>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
        </Dialog>
        
    );

}


