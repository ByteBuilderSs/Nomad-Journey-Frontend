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
} from '@mui/material';

const ChangeAddressDialog = (props) => {

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
                                        label="Street Address"/>
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
                                        label="Apt/Suit/Bldg"/>
                                </FormControl>
                            </Grid>
                            {/* City */}
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    City <span style={{ color: "red"}}>*</span>
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="City"/>
                                </FormControl>
                            </Grid>
                            {/* Country */}
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Typography component="h6" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
                                    Country <span style={{ color: "red"}}>*</span>
                                </Typography>
                                <FormControl fullWidth variant='outlined'>
                                    <TextField 
                                        type={"text"}
                                        label="Country"/>
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
                                        label="Postal Code"/>
                                </FormControl>
                            </Grid>
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
                        </Grid>
                    </Grid>
                
                </Box>
                
            </DialogContent>
            
        </Dialog>
        </div>
    )
}

export default ChangeAddressDialog;
