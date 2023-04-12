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
    Autocomplete 
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import logo from "../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-toastify";

//-------------------------------------------------------------

const citys=[
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 }];
export default function SignInSide()
{
    
    const [values, setValues] = React.useState({
        showPassword: false,
        showConfirmPassword: false,
    });
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
    const [FirstName, setName] = useState("");
    const [FamilyName, setFamilyName] = useState("");
    const [UserName,setUserName]=useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");
    const [city,setCity]=useState("")
    
    const {signup} =useSignup()
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        if(FirstName.length ==0)
        {
            toast.error("FirstName required!")
        }
        else if(FamilyName.length ==0)
        {
            toast.error("FamilyName required!")
        }
        else if(UserName.length ==0)
        {
            toast.error("UserName required!")
        }
        else if(Email.length ==0)
        {
            toast.error("Email required!")
        }
        else if(city.length ==0)
        {
            toast.error("CityName required!")
        }
        else if(password.length ==0)
        {
            toast.error("password required!")
        }
        else if(ConfirmPass.length ==0)
        {
            toast.error("Confirm Password!")
        }
        if(password !=ConfirmPass)
        {
            toast.error("mismatch Confirm Password !")
        }
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email))
        {
            toast.error("Email is not valid")
        }
        else{
        await signup(FirstName,FamilyName,Email,password,ConfirmPass,UserName,city)}
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
                    
                <Grid form 
                id={"Signup-Form"}>
                <Grid fullWidth sx={{display:'flex',flexDirection:'row'}}>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        id="outlined-adornment-firstname"
                        label="Firstname"
                        onChange={e=>{setName(e.target.value)}}
                        value={FirstName}
                        
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                    <TextField
                    id="outlined-adornment-lastname"
                    label="Lastname"
                    onChange={e=>{setFamilyName(e.target.value)}}
                    value={FamilyName}
                    />
                </FormControl>
                </Grid>
                <FormControl fullWidth variant="outlined">
                    <TextField
                    id="signup-outlined-adornment-city"
                    label="City"
                    onChange={e=>{setCity(e.target.value)}}
                    value={city}
                    />
                </FormControl>
                {/* <FormControl fullWidth variant="outlined">
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={citys}
                sx={{ width: '97%' }}
                renderInput={(params) => <TextField {...params} label="city" />}
                onChange={e=>{setCity(e.target.value)}}
                />
                </FormControl> */}
                <FormControl fullWidth variant="outlined">
                    <TextField
                    id="signup-outlined-adornment-username"
                    label="Username"
                    onChange={e=>{setUserName(e.target.value)}}
                    value={UserName}
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                    <TextField
                    id="signup-outlined-adornment-email"
                    label="Email"
                    onChange={e=>{setEmail(e.target.value)}}
                    value={Email}
                    />
                </FormControl>
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
                    />
                </FormControl>
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
                    label="Password confirmation "
                    />
                </FormControl>
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