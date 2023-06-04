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
const MyPreference = () => {
    const classes = styles();
    const navigate = useNavigate();
    const [sat, setSat] = useState(false);
    const [sun, setSun] = useState(false);
    const [mon, setMon] = useState(false);
    const [tue, setTue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);
    const [guestsCount, setGuestsCount] = useState('');
    const [prefGender, setPrefGender] = useState('');
    const [isPetFriendly, setIsPetFriendly] = useState(false);
    const [isKidFriendly, setIsKidFriendly] = useState(false);
    const [isSmokingAllowed, setIsSmokingAllowed] = useState(false);

    console.log("THE SAT VALUE: ", sat);
    console.log("THE MON VALUE: ", mon);

    const handleChangeSat = (event) => {
        setSat(event.target.checked);
    };
    const handleChangeSun = (event) => {
        setSun(event.target.checked);
    };
    const handleChangeMon = (event) => {
        setMon(event.target.checked);
    };
    const handleChangeTue = (event) => {
        setTue(event.target.checked);
    };
    const handleChangeWed = (event) => {
        setWed(event.target.checked);
    };
    const handleChangeThu = (event) => {
        setThu(event.target.checked);
    };
    const handleChangeFri = (event) => {
        setFri(event.target.checked);
    };

    const handleMaxGuestCount = (event) => {
        setGuestsCount(event.target.value);
    }

    const handleChangeGender = (event) => {
        setPrefGender(event.target.value);
    }
    const handleChangeKF = (event) => {
        setIsKidFriendly(event.target.checked);
    };
    const handleChangePF = (event) => {
        setIsPetFriendly(event.target.checked);
    };
    const handleChangSA = (event) => {
        setIsSmokingAllowed(event.target.checked);
    };

    const loadUserHomeInfo = async () => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/ api/v1/accounts/UserProfileEdit8/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            let is_sat = result.data.data.is_sat;
            setSat(is_sat);


            let is_sun = result.data.data.is_sun;
            setSun(is_sun);


            let is_mon = result.data.data.is_mon;
            setMon(is_mon);


            let is_tue = result.data.data.is_tue;
            setTue(is_tue);


            let is_wed = result.data.data.is_wed;
            setWed(is_wed);

            let is_thu = result.data.data.is_thu;
            setThu(is_thu);


            let is_fri = result.data.data.is_fri;
            setFri(is_fri);

            setGuestsCount(result.data.data.maximum_number_of_guests);
            setPrefGender(result.data.data.prefered_gender_to_host);
            setIsPetFriendly(result.data.data.is_pet_friendly);
            setIsKidFriendly(result.data.data.is_kid_friendly);
            setIsSmokingAllowed(result.data.data.is_smoking_allowed);
        }).catch((error) => {
            toast.error("Something went wrong while fetching user home info.")
            {/* TODO => err.response.data.message*/}
        })
    }

    useEffect(() => {
        loadUserHomeInfo();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();


        axios({
            method: "patch",
            url: `https://api.nomadjourney.ir/ api/v1/accounts/UserProfileEdit5/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data : {
                is_sun: sun,
                is_sat: sat,
                is_mon: mon,
                is_tue: tue,
                is_wed: wed,
                is_thu: thu,
                is_fri: fri,
                maximum_number_of_guests: guestsCount,
                prefered_gender_to_host: prefGender,
                is_pet_friendly: isPetFriendly,
                is_kid_friendly: isKidFriendly,
                is_smoking_allowed: isSmokingAllowed,
            }
        }).then((res) => {
            console.log(res);
            toast.success("Changes updated successfully.");
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
                        <div style={{ marginLeft: "-3.5rem" }}>
                            {/* Available nights */}
                            <div style={{
                                paddingTop:"4rem",
                                paddingBottom:"5rem",
                                paddingRight:"5rem",
                                borderRadius:"15px",
                                color:"#EFEFD0"
                            }}>
                                <Grid item xs={12} >
                                    <Box sx={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                                        <h6 style={{  fontWeight: "bold", marginTop: "2rem", paddingRight: "3rem", marginLeft: "3rem" }}>
                                            Available Nights to Host
                                        </h6>
                                        <FormControlLabel
                                            sx={{color: sun ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={sun} onChange={handleChangeSun}/>} label="Sun" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: mon ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={mon} onChange={handleChangeMon}/>} label="Mon" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: tue ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={tue} onChange={handleChangeTue}/>} label="Tue" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: wed ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={wed} onChange={handleChangeWed}/>} label="Wed" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: thu ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={thu} onChange={handleChangeThu}/>} label="Thu" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: fri ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={fri} onChange={handleChangeFri}/>} label="Fri" labelPlacement='top'/>
                                        <FormControlLabel sx={{color: sat ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                            color: "#EFEFD0",
                                            '&.Mui-checked': {
                                                color: "#F7C59F",
                                            }}} variant="solid" checked={sat} onChange={handleChangeSat}/>} label="Sat" labelPlacement='top'/>
                                    </Box>
                                </Grid>
                                {/* Maximum Number of Guests */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1.25rem"
                                    }}>
                                        <h6 style={{ fontWeight: "bold", paddingRight: "2.5rem", marginLeft: "3rem" }}>
                                            Maximum Number of Guests
                                        </h6>
                                        <FormControl sx={{ width: "5rem" }}>
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
                                                    }}}
                                                MenuProps={{ style: {
                                                        maxHeight: "10rem",
                                                    }}}
                                                defaultValue={1}
                                                value={guestsCount}
                                                onChange={handleMaxGuestCount}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={9}>9</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={11}>11</MenuItem>
                                                <MenuItem value={12}>12</MenuItem>
                                                <MenuItem value={13}>13</MenuItem>
                                                <MenuItem value={14}>14</MenuItem>
                                                <MenuItem value={15}>15</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                {/* Preferred Gender to Host */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        mt: "1.25rem"
                                    }}
                                    >
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4rem", marginLeft: "3rem" }}>
                                            Preferred Gender to Host
                                        </h6>
                                        <FormControl sx={{ width: "15rem" }}>
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
                                                    } }}
                                                defaultValue={1}
                                                value={prefGender}
                                                onChange={handleChangeGender}
                                            >
                                                <MenuItem value={1}>Any</MenuItem>
                                                <MenuItem value={2}>Male</MenuItem>
                                                <MenuItem value={3}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                {/* Children, Pets, Smoking */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex",
                                        flexWrap: "wrap",
                                        mt: "1.25rem"
                                    }}
                                    >
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.69rem", marginLeft: "3rem" }}>
                                            Children, Pets, Smoking
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel sx={{color: isKidFriendly ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={isKidFriendly} onChange={handleChangeKF}/>} label="Kid Friendly" labelPlacement='right'/>
                                            <FormControlLabel sx={{color: isPetFriendly ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={isPetFriendly} onChange={handleChangePF}/>} label="Pet Friendly" labelPlacement='right'/>
                                            <FormControlLabel sx={{color: isSmokingAllowed ? `#F7C59F` : `#EFEFD0`}} control={<Checkbox sx={{
                                                color: "#EFEFD0",
                                                '&.Mui-checked': {
                                                    color: "#F7C59F",
                                                }}} variant="solid" checked={isSmokingAllowed} onChange={handleChangSA}/>} label="Smoking is Allowed" labelPlacement='right'/>
                                        </Box>
                                    </Box>
                                </Grid>
                            </div>
                            {/*<Grid item xs={12}>*/}
                            {/*    <Divider sx={{ width: "57rem", borderBottomWidth: 3, mt: "1rem" }}/>*/}
                            {/*</Grid>*/}
                            {/* ---------------------------- My Home ----------------------------------*/}
                                {/* Confirm Button */}
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                                sx={{
                                    paddingBottom:"3rem",marginLeft: "3rem"
                                }}>
                                    <Button className={classes.button}
                                            onClick={onSubmit}>
                                        Update Preferences
                                    </Button>
                                </Grid>
                        </div>
                    </form>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default MyPreference;
