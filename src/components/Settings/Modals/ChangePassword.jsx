import React from 'react';
import {FormControl, IconButton, TextField, InputAdornment, Button} from "@mui/material";
import { makeStyles } from '@mui/styles';
import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

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
const ResetPassword = (props) => {
    const classes = styles();
    const [showCurrPassword, setShowCurrPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfPassword, setShowConfPassword] = React.useState(false);

    return (
        <div style={
            {borderRadius:"15px",
            width:"25em",height:"22em",
            backgroundColor:"#1A659E",
            color:"#EFEFD0"}
        }>
            <h2
            style={{paddingTop:"0.5em", color: "#EFEFD0"}}>Reset Password</h2>
            <div style={{paddingTop:"1em",display:"flex",justifyContent:"center", alignItems:"center"}}>
                <FormControl sx={{display:"flex",justifyContent:"center", alignItems:"center"}} variant='standard'>
                    <TextField
                        size={`small`}
                        className={classes.text_field}
                        InputLabelProps={{
                            style: { color: '#EFEFD0', fontWeight: "bold" }
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
                                        onClick={() => setShowCurrPassword(!showCurrPassword)}
                                        sx={{color:'#EFEFD0'}}
                                    >
                                        {!showCurrPassword ? (<Visibility/>) : (<VisibilityOff />)}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        type={showCurrPassword ? "text" :"password"}
                        label="Current Password"
                        variant='outlined'/>
                </FormControl>
                </div>
                <div style={{paddingTop:"0.75em" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <FormControl sx={{display:"flex",justifyContent:"center", alignItems:"center"}} variant='standard'>
                    <TextField
                        size={`small`}
                        className={classes.text_field}
                        InputLabelProps={{
                            style: { color: '#EFEFD0',fontWeight: "bold" }
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
                        label="New Password"
                        variant='outlined' />
                    </FormControl>
                </div>
                <div style={{paddingTop:"0.75em" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <FormControl sx={{display:"flex",justifyContent:"center", alignItems:"center"}} variant='standard'>
                    <TextField
                        size={`small`}
                        className={classes.text_field}
                        InputLabelProps={{
                            style: { color: '#EFEFD0',fontWeight: "bold" }
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
                                        onClick={() => setShowConfPassword(!showConfPassword)}
                                        sx={{color:'#EFEFD0'}}
                                    >
                                        {!showConfPassword ? (<Visibility/>) : (<VisibilityOff />)}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        type={showConfPassword ? "text" :"password"}
                        label="Confirm Password"
                        variant='outlined'/>
                    </FormControl>

            </div>
                <div style={{paddingTop:"1em" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Button className={classes.button}>
                        reset password
                    </Button>
                </div>


        </div>
    );
}

export default ResetPassword;
