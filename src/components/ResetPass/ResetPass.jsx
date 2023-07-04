import React, { useState } from "react";
import "./ResetPass.css";
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
    Typography
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import logo from "../../Assets/icons/lock.png";
import sucs from '../../Assets/icons/approved.jpg'
import { useResetPass } from "../../hooks/useResetPass";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function SignInSide()
{
    
    const [password, setPassword] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");

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
    
    const {resetpass,success}=useResetPass()
    const handleSubmit =  (event) => {
        
        event.preventDefault();
        
        
        if(!password)
        {
            toast.error("Password is required!");
        }
        if (!ConfirmPass)
        {
            toast.error("Confirm Password is required!");
        }
        if (password && ConfirmPass && password !== ConfirmPass)
        {
            toast.error("Password and Confirm Password do not match!");
        }
        
        else
        {
            resetpass(password)
        }
    };


    return (
    
        <div className="auth">
            <Box
                className="Mui-Reset-box"
                sx={{ bgcolor: "background.paper", 
                width: 500,
                boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'
                }}>
                <AppBar sx={{ backgroundColor: "rgba(0,78,137,1)", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}} position="static">
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
                            label="Change Password"
                        />
                    </Tabs>
                </AppBar>
                {!success?
                <>
                <div>
                    <div className="authLogo">
                        <img src={logo} alt="logo" />
                    </div>
                    
                    <Box
                        component="form"
                        sx={{
                        "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    
                    >
                    <Grid form id={"ResetPass-Form"} >
                        
                        <Grid  sx={{display:'flex',flexDirection:'column' }}>
                            
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? "text" : "password"}
                                    onChange={e=>{setPassword(e.target.value)}}
                                    value={password}
                                    required
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
                                    required
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
                                />
                            </FormControl>
                        </Grid>
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
                            
                        </FormControl>
                    </Grid>
                    </Box>
                </div>
                </>
                :
                
                <>
                <div>
                    <div className="authLogo">
                        <img src={sucs} alt="logo" />
                    </div>
                    
                    <Box
                        component="form"
                        sx={{
                        "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    
                    >
                    <Grid container sx={{justifyContent:'center'}}>
                        <Grid sx={{marginLeft:'0.4rem',justifyContent:'center'}}>
                            <Typography variant='h5' >
                               Password successfuly changed !
                            </Typography>
                        </Grid>
                        
                            
                    </Grid>
                    <Grid sx={{margin:'2rem'}}>
                        <Link to="/login" >{"Back to login"}</Link>
                    </Grid>
                    </Box>
                </div>
                </>
                }
               
                
            </Box>
        </div>
    );
}