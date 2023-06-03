import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import '../../UserPanel/EditProfile/EditHome.css';
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
    Chip,
    Checkbox,
    FormControlLabel,
    Tooltip,
} from '@mui/material';
import { Item } from "semantic-ui-react";
import GeoSearchField from '../../UserPanel/EditProfile/GeoSearch';
import { usePosition } from 'use-position';
import L from 'leaflet';
import { useGeolocated } from "react-geolocated";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {renderToStaticMarkup} from "react-dom/server";
import {FaMapMarkerAlt} from "react-icons/fa";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
import {makeStyles} from "@mui/styles";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";

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
let username = "";
let access_token = "";

if (localStorage.getItem('tokens')) {
    const Data = JSON.parse(localStorage.getItem('tokens'));
    username = Data.username;
    access_token = Data.access;
}
const MyHome = () => {
    const classes = styles();
    const counter = useCounter();
    const setCounter = useCounterActions();
    // User_address_lat, User_address_long
    const navigate = useNavigate();
    const [sleepArg, setSleepArg] = useState('');
    const [descArg, setDescArg] = useState('');
    const [roomateSituation, setRoomateSituation] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [havePet, setHavePet] = useState(false);
    const [haveKid, setHaveKid] = useState(false);
    const [doesSmoke, setDoesSmoke] = useState(false);
    const [wheelchair, setWheelchair] = useState(false);
    const handleChangeSleepArg = (event) => {
        setSleepArg(event.target.value);
    }

    const handleChangeSleepArgDesc = (event) => {
        setDescArg(event.target.value);
    }

    const handleChangeRoomateSituation = (event) => {
        setRoomateSituation(event.target.value);
    }

    const handleChangeHP = (event) => {
        setHavePet(event.target.checked);
    };
    const handleChangeHK = (event) => {
        setHaveKid(event.target.checked);
    };
    const handleChangeDS = (event) => {
        setDoesSmoke(event.target.checked);
    };
    const handleWheel = (event) => {
        setWheelchair(event.target.checked);
    };
    const handleChangeAdditionalInfo = (event) => {
        setAdditionalInfo(event.target.value);
    }

    const loadUserHomeInfo = async () => {
        axios({
            method: "get",
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit7/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            setSleepArg(result.data.data.sleeping_arrangments);
            setDescArg(result.data.data.description_of_sleeping_arrangement);
            setRoomateSituation(result.data.data.roommate_situation);
            setAdditionalInfo(result.data.data.additional_information);
            setHavePet(result.data.data.i_have_pet);
            setHaveKid(result.data.data.kids_at_home);
            setDoesSmoke(result.data.data.smoking_at_home);
            setWheelchair(result.data.data.wheelchair_accessible);
        }).catch((error) => {
            toast.error("Something went wrong while fetching user home info.")
            {/* TODO => err.response.data.message*/}
        })
    }

    useEffect(() => {
        loadUserHomeInfo();
    }, [counter]);

    const onSubmit = async (event) => {
        event.preventDefault();


        axios({
            method: "patch",
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit7/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data : {
                sleeping_arrangments: sleepArg,
                description_of_sleeping_arrangement: descArg,
                roommate_situation: roomateSituation,
                additional_information: additionalInfo,
                i_have_pet: havePet,
                kids_at_home: haveKid,
                smoking_at_home: doesSmoke,
                wheelchair_accessible: wheelchair,
            }
        }).then((res) => {
            console.log(res);
            toast.success("Changes updated successfully.");
            setCounter(counter+1);
        }).catch((error) => {
            toast.error("Something went wrong while updating information.");
            console.log(error);
        })
    }

    const onCancel = async (event) => {
        event.preventDefault();
        loadUserHomeInfo();
    }

    return (
        <React.Fragment>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, maxWidth: "100%"},
                    justifyContent:"center",
                    alignItems:"center", display:"flex"}}
                noValidate
                autoComplete="off"
                dir="ltr"
            >
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <form>
                        <div style={{ paddingLeft: "2.5rem" }}>
                            {/* ---------------------------- My Home ----------------------------------*/}
                            {/* Sleeping Arrangements */}
                            <div style={{
                                paddingTop:"5rem",
                                paddingBottom:"5rem",
                                paddingRight:"5rem",
                                borderRadius:"15px",
                                color:"#EFEFD0"
                            }}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1.25rem"
                                    }}
                                    >
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.5rem", marginLeft: "3rem"  }}>
                                            Sleeping Arrangements
                                        </h6>
                                        <FormControl sx={{ width: "15rem"}}>
                                            <Select
                                                labelId="max-guests-number-label"
                                                id="max-guests-number"
                                                sx={{ height: "2rem",
                                                    color: '#EFEFD0',
                                                    backgroundColor:"rgba(239,239,208,0.11)",
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(239,239,208,0.11)',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(239,239,208,0.11)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(239,239,208,0.11)',
                                                    }  }}
                                                defaultValue={3}
                                                value={sleepArg}
                                                onChange={handleChangeSleepArg}
                                            >
                                                <MenuItem value={1}>Shared Bed</MenuItem>
                                                <MenuItem value={2}>Shared Room</MenuItem>
                                                <MenuItem value={3}>Private Room</MenuItem>
                                                <MenuItem value={4}>Public Room (Eg: Living Room)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                {/*  */}
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%', mt: "2rem" }}>
                                        <Stack spacing={3}>
                                            {/* Description of Sleeping Arrangement */}
                                            <Item>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "8rem" , marginLeft: "3rem"}}>
                                                    Description of Sleeping Arrangement
                                                </h6>
                                                <FormControl sx={{ width: "56rem", marginLeft: "3rem" }}>
                                                    <TextField
                                                        className={classes.text_field}
                                                        id="edit-profile-aboutme"
                                                        name="aboutme"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        type="text"
                                                        multiline
                                                        fullWidth="true"
                                                        size="medium"
                                                        rows={5}
                                                        maxRows={10}
                                                        value={descArg}
                                                        onChange={handleChangeSleepArgDesc}
                                                    />
                                                </FormControl>
                                            </Item>
                                            {/* Roommate Situation */}
                                            <Item>
                                                <h6 style={{ fontWeight: "bold", paddingRight: "8rem", marginLeft: "3rem" }}>
                                                    Roommate Situation
                                                </h6>
                                                <FormControl sx={{ width: "56rem", marginLeft: "3rem" }}>
                                                    <TextField
                                                        className={classes.text_field}
                                                        id="edit-profile-aboutme"
                                                        name="aboutme"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        type="text"
                                                        multiline
                                                        fullWidth="true"
                                                        size="medium"
                                                        rows={5}
                                                        maxRows={10}
                                                        value={roomateSituation}
                                                        onChange={handleChangeRoomateSituation}
                                                    />
                                                </FormControl>
                                            </Item>
                                        </Stack>
                                    </Box>
                                </Grid>
                                {/* Miscellaneous */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                        flexWrap: "wrap",
                                        mt: "1.25rem"
                                    }}
                                    >
                                        <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "4.9rem", marginTop: "0.69rem" }}>
                                            Miscellaneous
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel sx={{color: havePet ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={havePet} onChange={handleChangeHP}/>} label=" I Have a Pet" labelPlacement='right'/>
                                            <FormControlLabel sx={{color: haveKid ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={haveKid} onChange={handleChangeHK}/>} label="Kids at Home" labelPlacement='right'/>
                                            <FormControlLabel sx={{color: doesSmoke ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={doesSmoke} onChange={handleChangeDS}/>} label="Smoking at Home" labelPlacement='right'/>
                                            <FormControlLabel sx={{color: wheelchair ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={wheelchair} onChange={handleWheel}/>} label="Wheelchair Accessible" labelPlacement='right'/>
                                        </Box>
                                    </Box>
                                </Grid>
                                {/* Additional Information */}
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%', mt: "2rem" }}>
                                        <Stack spacing={3}>
                                            <Item>
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "8rem" }}>
                                                    Additional Information
                                                </h6>
                                                <FormControl sx={{ width: "56rem", marginLeft: "3rem" }}>
                                                    <TextField
                                                        id="edit-profile-aboutme"
                                                        className={classes.text_field}
                                                        name="aboutme"
                                                        InputProps={{
                                                            style: { color: '#EFEFD0',
                                                                backgroundColor:"rgba(239,239,208,0.11)",
                                                                border:"none"},
                                                            disableUnderline: true}}
                                                        type="text"
                                                        multiline
                                                        fullWidth="true"
                                                        size="medium"
                                                        rows={5}
                                                        maxRows={10}
                                                        value={additionalInfo}
                                                        onChange={handleChangeAdditionalInfo}
                                                    />
                                                </FormControl>
                                            </Item>
                                        </Stack>
                                    </Box>
                                </Grid>
                                {/* MAP🥳 */}
                                {/* Confirm Button */}
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                                      sx={{
                                          paddingTop:"3rem", marginLeft: "3rem"
                                      }}>
                                    <Button className={classes.button}
                                            onClick={onSubmit}>
                                        Update Home
                                    </Button>
                                </Grid>
                            </div>
                        </div>
                    </form>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default MyHome;
