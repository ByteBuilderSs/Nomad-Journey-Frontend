import React, { useState } from "react";
import "./ForgotPass.css";
import {Link} from 'react-router-dom';

import {
    Box,
    TextField,
    FormControl,
    Button,
    Grid,
    Tab,
    Tabs,
    AppBar,
    Typography
} from "@mui/material";



import logo from "../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";
import sucs from '../../Assets/icons/approved.jpg'
import { useForgotPass } from "../../hooks/useForgotPass";
import { toast } from "react-toastify";


//-------------------------------------------------------------

export default function ForgotPass()
{
   
    
    const [Email, setEmail] = useState("");
    const {forgotPass,success} = useForgotPass()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(Email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email))
        {
            toast.error("Email is not valid")
        }
        else
        {
            await forgotPass(Email)
        }
    };

    return (
    
        <div className="auth">
            <Box
                className="Mui-Forgot-box"
                sx={{ bgcolor: "background.paper", 
                width: 510,
                maxHeight: "60vh",
                minHeight: "40vh",
                boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'}}>
                <AppBar sx={{ backgroundColor: "rgba(0,78,137,1)", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}} position="static">
                <Tabs
                        variant="fullWidth"
                        TabIndicatorProps={{
                        style: {
                            backgroundColor: "#1A237D",
                            borderRadius: "15px"
                        },
                        }}>
                      <Tab
                            tabIndex={0}
                            style={{ color: "white", fontSize: 18, borderRadius: "15px" }}
                            label="Reset Password"
                        
                        />
                    </Tabs>
                </AppBar>
                {!success?
                <>
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

                   
                  
                    <Grid id={"ForgotPass-Form"}>
                    
                        <FormControl fullWidth variant="outlined">
                            <TextField
                            id="signup-outlined-adornment-email"
                            label="Email"
                            onChange={e=>{setEmail(e.target.value)}}
                            value={Email}
                            />
                        </FormControl>
                        <Grid sx={{marginLeft:'0.6rem',marginBottom:'1.5rem'}}>
                                <Typography color='gray' variant='caption'>
                                    We will send you a link to your email account
                                </Typography>
                            </Grid>
                        <FormControl fullWidth variant="outlined">
                            <Button
                                onClick={handleSubmit}
                                sx={{ m: 1 }}
                                variant="outlined"
                                size="large"
                                type="submit"
                            >
                            Reset
                            </Button>
                            
                
                            <Grid container sx={{paddingLeft:'2vh', paddingRight:'2vh', mb: "1rem", mt: "0.8rem"}}>
                                
                                <Grid item xs>
                                    <Link to="/login" >
                                    {"Back to login"}
                                    </Link>
                                </Grid>
                            </Grid>
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
                               We have sent you an email !
                            </Typography>
                        </Grid>
                        <Grid sx={{marginLeft:'0.4rem',justifyContent:'center'}}>
                            <Typography variant='caption' color='gray'>
                               Please check the email address for instruction to reset your password
                            </Typography>
                        </Grid>
                            
                    </Grid>
                    </Box>
                </div>
                </>
                }
                
                  
                
            </Box>
        </div>
    );
}