import React from 'react';
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
} from '@mui/material';

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";


const ChangeEmailDialog = (props) => {
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
                {"Change My Email"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    We need your current password to verify the update request.
                </DialogContentText>
                <Box
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <form
                    id={"Change-Email-Form"}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }} style={{ marginTop: "2rem" }}
                    >
                    <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                        New Email
                    </Typography>
                    <FormControl fullWidth variant='outlined'>
                        <TextField 
                            type={"text"}
                            label="New Email"/>
                    </FormControl>
                    <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                        Current Password <span style={{ color: "red"}}>*</span>
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-adornment-password"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            label="Current Password"
                        />
                    </FormControl>
                    <DialogActions>
                        <Button
                            sx={{ m: 1 }}
                            variant="outlined"
                            size="large"
                            type="submit"
                        >
                            Update
                        </Button>
                    </DialogActions>
                </form>
                </Box>
                
            </DialogContent>
            
        </Dialog>
        </div>
    );
}

export default ChangeEmailDialog
