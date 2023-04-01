import './EditAbout.css';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Grid,
    FormControl,
    TextField,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Avatar,
    Card,
    Typography,
    Container,
    Tabs,
    Tab,
    Autocomplete,
    Chip
} from '@mui/material';
import { Item } from "semantic-ui-react";

import LabelIcon from '@mui/icons-material/Label';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const EditAbout = () => {
    const [items_f, setItemsF] = useState([]);
    const [inputValue_f, setInputValueF] = useState("");

    const [items_l, setItemsL] = useState([]);
    const [inputValue_l, setInputValueL] = useState("");

    const [interests, setInterests] = useState([]);
    const [interestValue, setInterestValue] = useState("");

    const addItem = (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            let _items = [...items_f];
            _items.push(event.target.value);

            setItemsF(_items);
            setInputValueF("");
        }
    };
    
    const removeItem = (item) => {
        const _items = items_f.filter((x) => x !== item);
        setItemsF(_items);
    };
    
    const addItemL = (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            let _items = [...items_l];
            _items.push(event.target.value);

            setItemsL(_items);
            setInputValueL("");
        }
    };
    
    const removeItemL = (item) => {
        const _items = items_l.filter((x) => x !== item);
        setItemsL(_items);
    };

    const addInterest = (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            let _items = [...interests];
            _items.push(event.target.value);

            setInterests(_items);
            setInterestValue("");
        }
    };
    
    const removeInterest = (item) => {
        const _items = interests.filter((x) => x !== item);
        setInterests(_items);
    };

    return (
        <React.Fragment>
            {/* <form> */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <div style={{ paddingLeft: "2.5rem" }}>
                        {/* Hosting Availability */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                        Hosting Availability
                                    </h6>
                                    <FormControl sx={{ width: "15rem" }}>
                                        <Select
                                            defaultValue={3}
                                            labelId="hosting-availability-label"
                                            id="hosting-availability"
                                            sx={{ height: "2rem" }}
                                        >
                                            <MenuItem value={1}>Accepting Guests</MenuItem>
                                            <MenuItem value={2}>Maybe Accepting Guests</MenuItem>
                                            <MenuItem value={3}>Not Accepting Guests</MenuItem>
                                            <MenuItem value={4}>Wants to Meet Up</MenuItem>
                                        </Select>
                                    </FormControl>
                                <Divider sx={{ width: "100rem", borderBottomWidth: 3, mt: "1rem" }}/>
                            </Box>
                        </Grid>
                        {/* Hometown */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1rem"
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "11.5rem" }}>
                                        Where I Grew Up
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            placeholder='e.g. Italy'
                                            size='small'
                                        />
                                    </FormControl>
                            </Box>
                        </Grid>
                        {/* Occupation */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1rem"
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "13.8rem" }}>
                                        Occupation
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            size='small'
                                        />
                                    </FormControl>
                            </Box>
                        </Grid>
                        {/* Education */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1rem"
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "14.4rem" }}>
                                        Education
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            size='small'
                                        />
                                    </FormControl>
                            </Box>
                            <Divider  sx={{ borderBottomWidth: 3, mb: "1rem", mt: "1rem" }} />
                        </Grid>
                        {/* TODO => Languages I'm Fluent In */}
                        <Grid item xs={12}>
                            <p style={{ color: "#072147",  marginLeft: "0.1rem", marginBottom: "0.5rem" }}>Type languages and press `Enter` ...</p>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1rem"
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                        Languages I'm Fluent In
                                    </h6>
                                    <FormControl>
                                        <div className="wrapper">
                                            {items_f.map((item) => (
                                                <div className="chip">
                                                {item}
                                                <span onClick={() => removeItem(item)}><HighlightOffIcon size="large"/></span>
                                                </div>
                                            ))}
                                            <input
                                                value={inputValue_f}
                                                onChange={(e) => setInputValueF(e.target.value)}
                                                type="text"
                                                className={"myInput"}
                                                onKeyDown={addItem}
                                            />

                                        </div>
                                    </FormControl>
                            </Box>
                        </Grid>
                        {/* TODO => Languages I'm Learning */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1rem",
                                        mb: "1rem"
                                    }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                        Languages I'm Learning
                                    </h6>
                                    <FormControl>
                                        <div className="wrapper">
                                            {items_l.map((item) => (
                                                <div className="chip">
                                                {item}
                                                <span onClick={() => removeItemL(item)}><HighlightOffIcon size="large"/></span>
                                                </div>
                                            ))}
                                            <input
                                                value={inputValue_l}
                                                onChange={(e) => setInputValueL(e.target.value)}
                                                type="text"
                                                className={"myInput"}
                                                onKeyDown={addItemL}
                                            />

                                        </div>
                                    </FormControl>
                            </Box>
                            <Divider  sx={{ borderBottomWidth: 3, mb: "1rem" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%' }}>
                                <Stack spacing={3}>
                                    {/* About Me */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            About Me
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                    {/* Why I'm on Nomad Journey */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            Why I'm on Nomad Journey
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                    {/* My Interests */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", 
                                                        paddingRight: "8rem",  
                                                        display: "flex", 
                                                        alignItems: "center", 
                                                        alignContent: "center" }}>
                                            <LabelIcon sx={{ mr: "0.5rem" }}/>
                                            My Interests
                                        </h6>
                                        <FormControl>
                                            <div className="wrapper">
                                                {interests.map((item) => (
                                                    <div className="chip">
                                                    {item}
                                                    <span onClick={() => removeInterest(item)}><HighlightOffIcon size="large"/></span>
                                                    </div>
                                                ))}
                                                <input
                                                    value={interestValue}
                                                    onChange={(e) => setInterestValue(e.target.value)}
                                                    type="text"
                                                    className={"myInput"}
                                                    onKeyDown={addInterest}
                                                />
                                            </div>
                                        </FormControl>
                                    </Item>
                                    {/* My Favorite Music, Movies & Books */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            My Favorite Music, Movies & Books
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                    {/* One Amazing Thing I’ve Done */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            One Amazing Thing I’ve Done
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                    {/* Teach, Learn, Share */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            Teach, Learn, Share
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                    {/* Teach, Learn, Share */}
                                    <Item>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                            What I Can Share with Hosts
                                        </h6>
                                        <FormControl sx={{ width: "56rem" }}>
                                            <TextField 
                                                id="edit-profile-aboutme"
                                                name="aboutme"
                                                type="text"
                                                multiline 
                                                fullWidth="true"
                                                size="medium"
                                                rows={8}
                                                maxRows={10}
                                                />
                                        </FormControl>
                                    </Item>
                                </Stack>
                            </Box>
                        </Grid>

                        {/* Confirm Button */}
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                            <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
                                <Item>
                                    <Button
                                        variant="contained"
                                        sx={{ width: "100%" }}
                                        type="submit"
                                        // disabled={disabled}
                                        color='success'
                                    >
                                        Update
                                    </Button>
                                </Item>
                                <Item>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                        width: "100%",
                                        }}
                                        type="submit"
                                        // disabled={disabled}
                                    >
                                        Cancel
                                    </Button>
                                </Item>
                            </Stack>
                        </Grid>
                    </div>
                </Grid>
            {/* </form> */}
        </React.Fragment>
    )
}

export default EditAbout;
