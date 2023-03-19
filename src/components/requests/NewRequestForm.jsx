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



const intialState = {
    country: "",
    city: "",
    arrival_date: "",
    departure_date: "",
    arrival_data_is_flexible: false,
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
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const [
        {
            country,
            city,
            arrival_date,
            departure_date,
            arrival_data_is_flexible,
            departure_date_is_flexible,
            message,
            countryErr,
            cityErr,
            arrival_dateErr,
            departure_dateErr,
        },
        setState
    ] = useState(intialState);

    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        country: "",
        city: "",
        arrival_date: "",
        departure_date: "",
        arrival_data_is_flexible: false,
        departure_date_is_flexible: false,
        message: "",
        countryErr: false,
        cityErr: false,
        arrival_dateErr: false,
        departure_dateErr: false,
    });


    // Data Validation and Send to Backend
    const onSubmit = async (e) => {
        e.preventDafault();
        let isDataValid = true;
        let arrDate = new Date();
        let dptDate = new Date();
        if (!values.country) {
            setValues({
                ...values,
                countryErr: true,
            });
            isDataValid = false;
            console.log("The country field can not be empty");
        }
        if (!values.city) {
            setValues({
                ...values,
                cityErr: true,
            });
            isDataValid = false;
            console.log("The city field can not be empty");
        }
        if (!values.arrival_date) {
            setValues({
                ...values,
                arrival_dateErr: true,
            });
            isDataValid = false;
            console.log("The arrival date must be specific");
        }
        if (!values.departure_date) {
            setValues({
                ...values,
                departure_dateErr: true,
            });
            isDataValid = false;
            console.log("The departure date must be specific");
        }

        if (isDataValid) {
            let data = {
                /* TODO */
            }
            axios({
                method: "post",
                url: "http://127.0.0.1:8000/announcement/create/",
                headers: Headers,
                data: data,
            }).then((res) => {
                setValues(intialState);
                props.setOpen(false);
                /* TODO */
            })
        }

    }

    const handleClose = () => {
        props.setOpen(false);
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
                                                            name="arrival date"
                                                            calendarPosition="bottom-end"
                                                            placeholder="Arrival Date *"
                                                            hideOnScroll
                                                            editable
                                                            maxDate={new DateObject()}
                                                            />
                                                    {/*  arrival date is flexible */}
                                                    <FormControlLabel
                                                        control={<Checkbox value="arrivaldateisflexible" color="primary" />}
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
                                                            name="departure date"
                                                            calendarPosition="bottom-end"
                                                            placeholder="Departure Date *"
                                                            hideOnScroll
                                                            editable
                                                            required
                                                            maxDate={new DateObject()}/>
                                                    </FormControl>
                                                    {/* departure date is  flexible */}
                                                    <FormControlLabel
                                                        control={<Checkbox value="arrivaldateisflexible" color="primary" />}
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
                                                            />
                                                    </FormControl>
                                                </Grid>
                                                {/* Confirm Button */}
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ width: "100%" }}
                                                        type="submit"
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


