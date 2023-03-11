import  "./NewRequestForm.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Button } from "@mui/material";
import { styled, StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { Theme } from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";


function NewRequestForm() {
    return (
        <div className="request-management-add-request">
            <Box className="add-request-center-element">
                <Box className="request-management-add-request">
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Box className="add-request-center-element">
                                <form className="add-request-form">
                                    <Box>
                                        <Box className="add-request-center-element form-title">
                                            <h1 style={{ marginBottom: "10px"}}>Enter The Trip Info</h1>
                                        </Box>
                                        <Grid container spacing={2}>
                                            {/* country name */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{width: "100%"}}>
                                                    <TextField 
                                                        id="new-request-country"
                                                        name="country"
                                                        type="text"
                                                        label="Country"
                                                        variant="outlined"
                                                        inputProps={{maxLength: 20}}
                                                        required/>
                                                </FormControl>
                                            </Grid>
                                            {/* city name */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{width: "100%"}}>
                                                    <TextField 
                                                        id="new-request-city"
                                                        name="city"
                                                        type="text"
                                                        label="City"
                                                        variant="outlined"
                                                        inputProps={{maxLength: 20}}
                                                        required/>
                                                </FormControl>
                                            </Grid>
                                            {/* Arrival Date */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{ mt: 1 }}
                                                            style={{ width: "100%" }}
                                                            className="rtlDatePicker">
                                                    <DatePicker 
                                                        animations={[
                                                            transition({
                                                                from: 35,
                                                                transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                                            })
                                                        ]}
                                                        style={{ width: "100%"}}
                                                        inputClass="new-request-date-picker-input"
                                                        className="date-picker"
                                                        format="YYYY/MM/DD"
                                                        name="arrival date"
                                                        calendarPosition="bottom-end"
                                                        placeholder="Arrival Date"
                                                        hideOnScroll
                                                        editable
                                                        required
                                                        maxDate={new DateObject()}
                                                        />
                                                {/*  arrival date is flexible */}
                                                <FormControlLabel
                                                    control={<Checkbox value="arrivaldateisflexible" color="primary" />}
                                                    label="Arrival date is flexible"
                                                />
                                                </FormControl>
                                            </Grid>
                                            {/* Departure Date */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <FormControl sx={{ mt: 1 }}
                                                            style={{ width: "100%" }}
                                                                className="rtlDatePicker">
                                                    <DatePicker 
                                                        animations={[
                                                            transition({
                                                                from: 35,
                                                                transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                                            })
                                                        ]}
                                                        style={{ width: "100%"}}
                                                        inputClass="new-request-date-picker-input"
                                                        className="date-picker"
                                                        format="YYYY/MM/DD"
                                                        name="departure date"
                                                        calendarPosition="bottom-end"
                                                        placeholder="Departure Date"
                                                        hideOnScroll
                                                        editable
                                                        required
                                                        maxDate={new DateObject()}/>
                                                </FormControl>
                                                {/* departure date is  flexible */}
                                                <FormControlLabel
                                                    control={<Checkbox value="arrivaldateisflexible" color="primary" />}
                                                    label="Departure date is flexible"
                                                />
                                            </Grid>
                                            {/* message */}
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <FormControl sx={{width: "100%"}}>
                                                    <TextField 
                                                        id="new-request-message"
                                                        name="message"
                                                        type="text"
                                                        label="Message"
                                                        variant="outlined"
                                                        multiline 
                                                        fullWidth="true"
                                                        size="medium"
                                                        rows={10}
                                                        maxRows={10}
                                                        />
                                                </FormControl>
                                            </Grid>
                                            {/* Confirm Button */}
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <Button
                                                    variant="contained"
                                                    sx={{ width: "100%" }}
                                                    type="submit"
                                                >
                                                    Submit the information
                                                </Button>
                                            </Grid>
                                            {/* Quit */}
                                            <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                    width: "1000%",
                                                    }}
                                                    type="submit"
                                                >
                                                    Quit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
        
    );
    
}

export default NewRequestForm;