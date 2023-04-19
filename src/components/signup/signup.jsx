import React, { useState } from "react";
import "./signup.css";
import {Link} from 'react-router-dom';

import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    FormControl,
    Button,
    Grid,
    Tab,
    Tabs,
    AppBar,
    Autocomplete,
    CircularProgress,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import logo from "../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-toastify";
import axios from 'axios';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function SignInSide()
{
    const [FirstName, setName] = useState("");
    const [FamilyName, setFamilyName] = useState("");
    const [UserName,setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryInput, setCountryInput] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityInput, setCityInput] = useState('');

    const [values, setValues] = React.useState({
        showPassword: false,
        showConfirmPassword: false,
    });
    const [countries, setCountries] = React.useState([]);
    const [cities, setCities] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const loading = open && countries.length === 0;
    const [openC, setOpenC] = React.useState(false);
    const loadingC = openC && cities.length === 0;

    const loadCountries = async () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/v1/utils/get-countries/",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            setCountries(result.data);
        }).catch((error) => {
            toast.error("Something went wrong while fetching countries.")
        })
    }
    
    console.log("********** THE COUNTRIES ARE ******** ", countries);

    const loadCities = async () => {
        if (selectedCountry) {
            axios({
                method: "get",
                url: `http://127.0.0.1:8000/api/v1/utils/get-cities-of-country/${selectedCountry.id}`,
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
        (async () => {
            await sleep(1e3); // For demo purposes.
            if (active) 
            {
                loadCountries();
            }
        })();
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
        (async () => {
            await sleep(1e3); // For demo purposes.
            if (active) 
            {
                loadCities();
            }
        })();
        return () => {
            active = false;
        };
    }, [loadingC, selectedCountry]);
    
    React.useEffect(() => {
        if (!openC) {
            setCities([]);
        }
    }, [openC]);


    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleCountrySelection = (value) => {
        setSelectedCountry(value);
    }

    console.log("!!!!!!!!!!!!!!!!! THE SELECTED COUNTRY IS !!!!!!!!!!!!!!!!", selectedCountry);

    const handleCitySelection = (value) => {
        setSelectedCity(value);
    }

    console.log("------------------- THE SELECTED CITY IS ------------------", selectedCity);

    const {signup} = useSignup()
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        if (!FirstName)
        {
            toast.error("First name is required!")
        }
        if (!FamilyName)
        {
            toast.error("Family name is required!")
        }
        if (!UserName)
        {
            toast.error("Username is required!")
        }
        if (!Email)
        {
            toast.error("Email is required!")
        }
        if (!selectedCity)
        {
            toast.error("City is required!")
        }
        if(!password)
        {
            toast.error("Password is required!")
        }
        if (!ConfirmPass)
        {
            toast.error("Confirm Password is required!")
        }
        if (password && ConfirmPass && password !== ConfirmPass)
        {
            toast.error("Password and Confirm Password do not match!")
        }
        if (Email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email))
        {
            toast.error("Email is not valid!")
        }
        else
        {
            await signup(FirstName, FamilyName, Email, password, ConfirmPass, UserName, selectedCity.id)
        }
    };


    return (
    
        <div className="auth">
            <Box
                className="Mui-login-box"
                sx={{ bgcolor: "background.paper", 
                width: 500,
                maxHeight: "100vh",
                minHeight: "69vh",
                boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'
                }}>
                <AppBar sx={{ backgroundColor: "#E55405"}} position="static">
                    <Tabs
                        value={'0'}
                        variant="fullWidth"
                        TabIndicatorProps={{
                        style: {
                            backgroundColor: "#1A237D",
                        },
                        }}>
                        <Tab
                            tabIndex={0}
                            style={{ color: "white", fontSize: 18 }}
                            label="Register"
                        />
                    </Tabs>
                </AppBar>
                <div>
                    <div className="authLogo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="authLogoLabel" style={{ marginBottom: "1rem"}}>
                        <h1>
                            Welcome to <b className="NJText">Nomad Journey</b> !
                        </h1>
                    </div>
                    <Box
                        component="form"
                        sx={{
                        "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    
                    >
                    <Grid form id={"Signup-Form"}>
                        <Grid fullWidth sx={{display:'flex', flexDirection:'row'}}>
                            {/* Firstname */}
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-adornment-firstname"
                                    label="Firstname"
                                    onChange={e=>{setName(e.target.value)}}
                                    placeholder="Eg. Nariman"
                                    value={FirstName}
                                    
                                />
                            </FormControl>
                            {/* Lastname */}
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                id="outlined-adornment-lastname"
                                label="Lastname"
                                onChange={e=>{setFamilyName(e.target.value)}}
                                value={FamilyName}
                                placeholder="Eg. Masjedi"
                                />
                            </FormControl>
                        </Grid>
                        {/* TODO => Country */}
                        <FormControl fullWidth variant="outlined">
                            <Autocomplete
                                id="asynchronous-demo-country"
                                sx={{ width: 483 }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                options={countries ?? []}
                                value={selectedCountry}
                                onChange={(e, newValue) => {
                                    handleCountrySelection(newValue);
                                }}
                                inputValue={countryInput}
                                onInputChange={(e, newInputValue) => {
                                    setCountryInput(newInputValue);
                                }}
                                isOptionEqualToValue={(option, value) => {
                                    if (option && value) {
                                        return option.country === value.country;
                                    } else {
                                        return false;
                                    }
                                }}
                                getOptionLabel={(option) => {
                                    return (option ? option.country : "");
                                }}
                                getOptionSelected={(option, value) => {
                                    return option.country === value.country;
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        label="Country"
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
                        {/* TODO => City */}
                        <FormControl fullWidth variant="outlined">
                            <Autocomplete
                                id="asynchronous-demo-city"
                                sx={{ width: 483 }}
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
                                value={selectedCity}
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
                        {/* Username */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                            id="signup-outlined-adornment-username"
                            label="Username"
                            onChange={e=>{setUserName(e.target.value)}}
                            value={UserName}
                            placeholder="Eg. @Nariman1234"
                            />
                        </FormControl>
                        {/* Email */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                            id="signup-outlined-adornment-email"
                            label="Email"
                            onChange={e=>{setEmail(e.target.value)}}
                            value={Email}
                            placeholder="Eg. nariman.masjedi@gmail.com"
                            />
                        </FormControl>
                        <Grid fullWidth sx={{display:'flex', flexDirection:'row'}}>
                            {/* Password */}
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                onChange={e=>{setPassword(e.target.value)}}
                                value={password}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                label="Password"
                                placeholder="nariman1234"
                                />
                            </FormControl>
                            {/* Confirm Password */}
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                id="outlined-adornment-confirmPassword"
                                type={values.showConfirmPassword ? "text" : "password"}
                                onChange={e=>{setConfirmPass(e.target.value)}}
                                value={ConfirmPass}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment>
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                label="Password confirmation"
                                placeholder="nariman1234"
                                />
                            </FormControl>
                        </Grid>
                        {/* Submit button */}
                        <FormControl fullWidth variant="outlined">
                            <Button
                                sx={{ m: 1 }}
                                variant="outlined"
                                size="large"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Grid container sx={{paddingLeft:'2vh',paddingRight:'2vh'}}>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                {"Already registered? Login"}
                                </Link>
                            </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    </Box>
                </div>
                
            </Box>
        </div>
    );
}