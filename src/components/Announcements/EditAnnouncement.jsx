import  "./AddAnnouncement/NewAnnouncementForm.css";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
    FormControl,
    TextField,
    Box,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    FormControlLabel,
    Checkbox,
    IconButton,
    Button,
    Dialog,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import { toast } from "react-toastify";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
export let editAnnouncement = 0;
export default function EditAnnouncementForm(props) {
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;

    console.log("*********** THE PROPS IN ANNOUNCEMENT DETAILS *********** ", props);

    const [country, setCountry] = useState({id: props.anc.anc_city, country: props.anc.city_country});
    console.log("+++++++++++++++ THE COUNTRY IS +++++++++++++ ", country);
    const [city, setCity] = useState({id: props.anc.anc_city, city_name: props.anc.city_name});
    console.log("--------------- THE CITY IS ---------------- ", city);
    const [arrival_date, setArrivalDate] = useState(props.anc.arrival_date);
    const [departure_date, setDepartureDate] = useState(props.anc.departure_date);
    const [arrival_date_is_flexible, setIsArrDateFelxible] = useState(props.anc.arrival_date_is_flexible);
    const [departure_date_is_flexible, setIsDptDateFelxible] = useState(props.anc.departure_date_is_flexible);
    const [travelers_count, setTravelersCount] = useState(props.anc.travelers_count);
    const [message, setMessage] = useState(props.anc.anc_description);

    const [disabled, setDisabled] = useState(false);

    /* ADDED */
    
    const [countries, setCountries] = React.useState([]);
    const [countryInput, setCountryInput] = useState('');
    const [open, setOpen] = React.useState(false);
    const loading = open && countries.length === 0;
    
    const [cities, setCities] = React.useState([]);
    const [cityInput, setCityInput] = useState('');
    const [openC, setOpenC] = React.useState(false);
    const loadingC = openC && cities.length === 0;

    const loadCountries = async () => {
        console.log("----------------------- IN LOAD COUNTRIES ------------------- ")
        axios({
            method: "get",
            url: "http://91.107.163.14:8000/api/v1/utils/get-countries/",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            setCountries(result.data);
            console.log("The result.data is: ", result.data);
        }).catch((error) => {
            toast.error("Something went wrong while fetching countries.")
        })
    }
    console.log("********** THE COUNTRIES ARE ******** ", countries);

    const loadCities = async () => {
        if (country) {
            axios({
                method: "get",
                url: `http://91.107.163.14:8000/api/v1/utils/get-cities-of-country/${country.id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                setCities(result.data);
            }).catch((error) => {
                toast.error("Something went wrong while fetching cities.")
            })
        }
    }

    console.log("+++++++++++++ THE CORRESPONDING CITIES ARE +++++++++++++ ", cities);
    
    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        const asyncFn = async () => {
            await sleep(1e3); // For demo purposes.
            if (active) 
            {
                loadCountries();
            }
        };
        asyncFn()
        return () => {
            active = false;
        };
    }, [loading]);
    
    React.useEffect(() => {
        if (!open) {
            setCountries([]);
        }
    }, [open]);

    React.useEffect(() => {
        let active = true;
        if (!loadingC) {
            return undefined;
        }
        const asyncFn = async () => {
            await sleep(1e3); // For demo purposes.
            if (active) 
            {
                loadCities();
            }
        };
        asyncFn();

        return () => {
            active = false;
        };
    }, [loadingC, country]);
    
    React.useEffect(() => {
        if (!openC) {
            setCities([]);
        }
    }, [openC]);

    const handleCountrySelection = (value) => {
        setCountry(value);
    }

    console.log("!!!!!!!!!!!!!!!!! THE SELECTED COUNTRY IS !!!!!!!!!!!!!!!!", country);

    const handleCitySelection = (value) => {
        setCity(value);
    }

    console.log("------------------- THE SELECTED CITY IS ------------------", city);



    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    }

    const handleChangeIsArrDateFlexible = (event) => {
        setIsArrDateFelxible(event.target.checked);
    };
    const handleChangeIsDptDateFlexible = (event) => {
        setIsDptDateFelxible(event.target.checked);
    };

    const handleChangeTravelersCount = (event) => {
        setTravelersCount(event.target.value);
    }

    // Data Validation and Send to Backend
    const onSubmit = async (e) => {
        e.preventDefault();
        let arrDate = new Date();
        let deptDate = new Date();
        
        let isDataValid = true;
        if (!country) {
            toast.error("Fill out destination country");
            isDataValid = false;
        }
        if (!city) {
            toast.error("Fill out destination city");
            isDataValid = false;
        }
        if (!arrival_date) {
            toast.error("Fill out arrival date");
            isDataValid = false;
        }
        if (!departure_date) {
            toast.error("Fill out departure date");
            isDataValid = false;
        }
        if (arrival_date) {
            arrDate = new DateObject({
                date: arrival_date,
                format: "YYYY-MM-DD"
            }).format("YYYY-MM-DD");
        }
        if (departure_date) {
            deptDate = new DateObject({
                date: departure_date,
                format: "YYYY-MM-DD"
            }).format("YYYY-MM-DD");
        }
        if (!travelers_count) {
            toast.error("Please specify the travelers count");
            isDataValid = false;
        }
        if (arrDate && deptDate && arrDate > deptDate) {
            toast.error("The departure date can not be sooner than arrival date");
            isDataValid = false;
        }
        if (isDataValid) {
            console.log(`********** the access token is: ${access_token}`);
            axios({
                method: "put",
                url: `http://91.107.163.14:8000/api/v1/announcement/edit/${props.anc.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    /* TODO */
                    anc_city: city.id,
                    arrival_date: arrDate,
                    departure_date: deptDate,
                    arrival_date_is_flexible: arrival_date_is_flexible,
                    departure_date_is_flexible: departure_date_is_flexible,
                    anc_description: message,
                    travelers_count: travelers_count
                }
            })
                .then((res) =>{
                    props.setOpen(false);
                    props.setClose(true);
                    setTimeout(() => {
                        props.setClose(false);
                    }, 5000);
                    props.setRequestData({});
                    toast.success("Announcement has been updated");
                    setCountry(props.anc.city_country);
                    setCity(props.anc.city_name);
                    setArrivalDate(props.anc.arrival_date);
                    setDepartureDate(props.anc.departure_date);
                    setIsArrDateFelxible(props.arrival_date_is_flexible);
                    setIsDptDateFelxible(props.anc.departure_date_is_flexible);
                    setTravelersCount(props.anc.travelers_count);
                    setMessage(props.anc.anc_description);
                    
                })
                .catch((error) => {
                    toast.error("Unexpected error has occurred");
                });
                props.setOpen(false);
                editAnnouncement += 1;
        }
    }


    const handleClose = () => {
        props.setOpen(false);
        setCountry(props.anc.city_country);
        setCity(props.anc.city_name);
        setArrivalDate(props.anc.arrival_date);
        setDepartureDate(props.anc.departure_date);
        setIsArrDateFelxible(props.arrival_date_is_flexible);
        setIsDptDateFelxible(props.anc.departure_date_is_flexible);
        setTravelersCount(props.anc.travelers_count);
        setMessage(props.anc.anc_description);
    };

    const onCancle = async (event) => {
        event.preventDefault();
        props.setRequestData({});
        setCountry(props.anc.city_country);
        setCity(props.anc.city_name);
        setArrivalDate(props.anc.arrival_date);
        setDepartureDate(props.anc.departure_date);
        setIsArrDateFelxible(props.arrival_date_is_flexible);
        setIsDptDateFelxible(props.anc.departure_date_is_flexible);
        setTravelersCount(props.anc.travelers_count);
        setMessage(props.anc.anc_description);
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
                                            {/* TODO => country name */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{width: "100%"}}>
                                                    <Autocomplete
                                                        id="asynchronous-demo-country"
                                                        open={open}
                                                        onOpen={() => {
                                                            setOpen(true);
                                                        }}
                                                        onClose={() => {
                                                            setOpen(false);
                                                        }}
                                                        options={countries ?? []}
                                                        value={country}
                                                        onChange={(e, newValue) => {
                                                            handleCountrySelection(newValue);
                                                        }}
                                                        inputValue={countryInput}
                                                        onInputChange={(e, newInputValue) => {
                                                            setCountryInput(newInputValue);
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            console.log("isOptionEqualToValue => The value is: ", value);
                                                            console.log("isOptionEqualToValue => The option is: ", option);
                                                            if (option && value) {
                                                                return option.country === value.country;
                                                            } else {
                                                                return false;
                                                            }
                                                        }}
                                                        getOptionLabel={(option) => {
                                                            console.log("getOptionLabel => The option is: ", option);
                                                            return (option ? option.country : "");
                                                        }}
                                                        getOptionSelected={(option, value) => {
                                                            console.log("getOptionSelected => The value is: ", value);
                                                            console.log("getOptionSelected => The option is: ", option);
                                                            return option.country === value.country;
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField 
                                                                {...params} 
                                                                label="Country"
                                                                required
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                    <React.Fragment>
                                                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                        {params.InputProps.endAdornment}
                                                                    </React.Fragment>
                                                                    ),
                                                                }} />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            {/* TODO => city name */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{width: "100%"}}>
                                                    <Autocomplete
                                                        id="asynchronous-demo-city"
                                                        open={openC}
                                                        onOpen={() => {
                                                            setOpenC(true);
                                                        }}
                                                        onClose={() => {
                                                            setOpenC(false);
                                                        }}
                                                        isOptionEqualToValue={(option, value) => option.city_name === value.city_name}
                                                        getOptionLabel={(option) => option.city_name}
                                                        getOptionSelected={(option, value) => {
                                                            return option.city_name === value.city_name;
                                                        }}
                                                        options={cities}
                                                        value={city}
                                                        onChange={(e, newValue) => {
                                                            handleCitySelection(newValue)
                                                        }}
                                                        inputValue={cityInput}
                                                        onInputChange={(e, newInputValue) => {
                                                            setCityInput(newInputValue);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField 
                                                                {...params} 
                                                                label="City"
                                                                required
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                    <React.Fragment>
                                                                        {loadingC ? <CircularProgress color="inherit" size={20} /> : null}
                                                                        {params.InputProps.endAdornment}
                                                                    </React.Fragment>
                                                                    ),
                                                                }} 
                                                            />
                                                        )}
                                                    />
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
                                                        isClearable
                                                        minDate={new Date()}
                                                        value={arrival_date}
                                                        onChange={(date) => {
                                                            setArrivalDate(date);
                                                        }}
                                                    />
                                                    {/*  arrival date is flexible */}
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            value={arrival_date_is_flexible}
                                                            color="primary"
                                                            onChange={handleChangeIsArrDateFlexible}
                                                            checked={arrival_date_is_flexible === true}
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
                                                        minDate={new Date()}
                                                        isClearable
                                                        value={departure_date}
                                                        onChange={(date) => {
                                                            // const d = new Date(date);
                                                            setDepartureDate(date);
                                                        }}
                                                    />
                                                </FormControl>
                                                {/* departure date is  flexible */}
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        value={departure_date_is_flexible}
                                                        color="primary"
                                                        onChange={handleChangeIsDptDateFlexible}
                                                        checked={departure_date_is_flexible === true}
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
                                                        value={travelers_count}
                                                        onChange={handleChangeTravelersCount}
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
                                                        value={message}
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
                                                    disabled={disabled}
                                                >
                                                    Update announcement
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


