import React from 'react';
import {FormControl, IconButton, TextField, InputAdornment, Button} from "@mui/material";
import { makeStyles } from '@mui/styles';
import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

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

let allData;
let access_token;
let username;
if (localStorage.getItem('tokens'))
{
    allData = JSON.parse(localStorage.getItem('tokens'));
    access_token = allData.access;
    username = allData.username;
}

const ResetEmail = (props) => {
    const classes = styles();
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const onResetEmail = async (e) => {
        let isDataValid = true;
        e.preventDefault();
        if (!password || !email) {
            isDataValid = false;
            toast.error("All the two fields are required");
        }

        if (isDataValid) {
            axios({
                method: "patch",
                url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit10/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    password: password,
                    new_email: email
                }
            })
            .then((res) => {
                setPassword('');
                setEmail('');
                toast.success("Your email changed successfully")
            })
            .catch((error) => {
                toast.error("Unexpected error has occurred");
            })
        }
        }
    return (
        <div style={
            {borderRadius:"15px",
                width:"25em",height:"22em",
                backgroundColor:"#1A659E",
                color:"#EFEFD0"}
        }>
            <h2
                style={{paddingTop:"0.5em"}}>Change Email</h2>
            <FormControl sx={{paddingTop:"1em",display:"flex",justifyContent:"center", alignItems:"center"}} variant='standard'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>

                    <TextField
                        value={email}
                        onChange={e=>{setEmail(e.target.value)}}
                        size={`small`}
                        className={classes.text_field}
                        InputLabelProps={{
                            style: { color: '#EFEFD0' }
                        }}
                        InputProps={{
                            style: { color: '#EFEFD0',
                                backgroundColor:"rgba(239,239,208,0.11)",
                                width:"16.7em",
                                border:"none"},
                            disableUnderline: true,
                        }}
                        type={"text" }
                        label="New Email"
                        variant='outlined'/>
                </div>
                <div style={{paddingTop:"0.75em" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <TextField
                        value={password}
                        onChange={e=>{setPassword(e.target.value)}}
                        size={`small`}
                        className={classes.text_field}
                        InputLabelProps={{
                            style: { color: '#EFEFD0' }
                        }}
                        InputProps={{
                            style: { color: '#EFEFD0',
                                backgroundColor:"rgba(239,239,208,0.11)",
                                border:"none"},
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        sx={{color:'#EFEFD0'}}
                                    >
                                        {!showNewPassword ? (<Visibility/>) : (<VisibilityOff />)}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        type={showNewPassword ? "text" :"password"}
                        label="Password"
                        variant='outlined' />
                </div>
                <div style={{paddingTop:"4.4em" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Button
                        sx={{
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
                        }}
                        onClick={onResetEmail}>
                        submit
                    </Button>
                </div>
            </FormControl>


        </div>
    );
}

export default ResetEmail;
