import React, { useState } from "react";
import "./login.css";
import {Link} from 'react-router-dom';

import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    FormControl,
    Button,
    Grid,
    CssBaseline,
    Paper,
    StyledEngineProvider,
    Tab,
    Tabs,
    AppBar
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import logo from "../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";
import { useLogin } from "../../hooks/useLogin";


//-------------------------------------------------------------

export default function SignInSide()
{
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} =useLogin()
    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(Email,password)
    };

    return (
    
        <div className="auth">
        <Box
            className="Mui-login-box"
            sx={{ bgcolor: "background.paper", 
            width: 500,
            height:'94vh', 
            boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'}}>
           <AppBar sx={{ backgroundColor: "#E55405"}} position="static">
           <Tabs
                variant="fullWidth"
                TabIndicatorProps={{
                style: {
                    backgroundColor: "#1A237D",
                },
                }}>
                <Tab
                    tabIndex={0}
                    style={{ color: "white", fontSize: 18 }}
                    label="Login"
                   
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
                <Grid 
                id={"Login-Form"}>
                
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
                    <Button
                        onClick={handleSubmit}
                        sx={{ m: 1 }}
                        variant="outlined"
                        size="large"
                        type="submit"
                    >
                    Submit
                    </Button>
                    
                    <Grid container sx={{paddingLeft:'2vh',paddingRight:'2vh'}}>
                    <Grid item xs sx={{paddingTop:'1vh'}}>
                        <Link to="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item xs  sx={{paddingTop:'1vh'}}>
                        <Link to="/signup" variant="body2">
                        {"don't have an account? Register Now!"}
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