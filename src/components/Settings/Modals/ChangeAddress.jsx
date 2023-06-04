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
    Autocomplete,
    CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


const SetAddress = (props) => {
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const { username } = useParams();

    const [street, setStreet] = useState("")
    const [apt, setApt] = useState("")
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
    const [postalCode, setPostalCode] = useState("")

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
            url: "https://api.nomadjourney.ir/ api/v1/utils/get-countries/",
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
                url: `https://api.nomadjourney.ir/ api/v1/utils/get-cities-of-country/${country.id}`,
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

    const handleChangeStreet = (event) => {
        setStreet(event.target.value);
    }
    const handleChangeApt = (event) => {
        setApt(event.target.value);
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
            url: `https://api.nomadjourney.ir/ api/v1/accounts/user/${username}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            setStreet(result.data.User_address);
            setApt(result.data.User_apt);
            setCity({id: result.data.User_city, city_name: result.data.city_name});
            setCountry({id: result.data.User_city, country: result.data.city_country});
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
                url: `https://api.nomadjourney.ir/ api/v1/accounts/UserProfileEdit2/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data : {
                    User_address: street,
                    User_apt: apt,
                    User_city: city.id,
                    User_postal_code: postalCode,
                    city_name: city.city_name,
                    city_country: city.country
                }
            }).then((res) => {
                toast.success("Changes updated successfully.");
                props.setOpen(false);
            }).catch((error) => {
                toast.error("Something went wrong while updating information.");
                props.setOpen(true);
            })
        }
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
                                    {/* TODO => City */}
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                            City <span style={{ color: "red"}}>*</span>
                                        </Typography>
                                        <FormControl fullWidth variant='outlined'>
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
                                    {/* TODO => Country */}
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                            Country <span style={{ color: "red"}}>*</span>
                                        </Typography>
                                        <FormControl fullWidth variant='outlined'>
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

export default SetAddress;