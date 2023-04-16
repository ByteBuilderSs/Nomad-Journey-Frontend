import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import './EditHome.css';
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
} from '@mui/material';
import { Item } from "semantic-ui-react";
import GeoSearchField from './GeoSearch';
import { usePosition } from 'use-position';
import L from 'leaflet';
import { useGeolocated } from "react-geolocated";

const SetViewToCurrentLocation = () => {
    const [location, setLocation] = useState({});
    const map = useMap();

    function getGeo() {
        navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
        });
        });
    }

    useEffect(() => {
        getGeo();
    }, []);

    useEffect(() => {
        if (location.lat && location.long) {
            map.setView([location.lat, location.long]);
        }
    }, [location]);

    return null;
};

const EditHome = () => {
    const { latitude, longitude, error } = usePosition();
    // const [location, setLocation] = useState({});
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    // let lat = coords.latitude;
    // let long = coords.longitude;
    // function getGeo() {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         setLocation({
    //             lat: position.coords.latitude,
    //             long: position.coords.longitude,
    //             });
    //         });
    // }
    
    // useEffect(() => {
    //     getGeo();
    // }, []);
    
    // const map = useMap();
    // map.setView([location.lat, location.long ])
    // console.log("********** THE LAT IS *********", location.lat);
    // console.log("********** THE LANG IS *********", location.long);

    // useEffect(() => {
        //     const map = L.map('map');
        //     if (location.lat === undefined || location.lang === undefined) return;
        
        //     // if (latitude && longitude && !error) {
            //     //     console.log("************* EVERYTHING WORKS FINE ***********");
            //     //     map.setView([latitude, longitude]);
            //     //     console.log(latitude);
            //     // }
    //     // else {
    //     //     console.log("-------------- YOUR LOCATION CAN NOT BE FETCHED -------------");
    //     // }
    //     map.setView([location.lat, location.long ])
    // }, [location.lat, location.long ]);

    // const locateCurrentPosition = () => new Promise((resolve,reject)=> {
    //     navigator.geolocation.getCurrentPosition(
    //     position => {
    //         console.log(position);
    //         resolve(position);
    //     error => {
    //     },
    //         console.log(error.message);
    //         reject(error);
    //     },
    //     {
    //         enableHighAccuracy: false,
    //         timeout: 10000,
    //         maximumAge: 1000
    //     }
    //     );
    // }).then(position=>console.log(position));

    // useEffect(() => {
    //     locateCurrentPosition();
    // }, []);

    return (
        <React.Fragment>
            <Box
                className="drawerContainer"
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, maxWidth: "100%"},
                }}
                noValidate
                autoComplete="off"
                dir="ltr"
            >
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <h6 style={{ textAlign: "left", paddingLeft: "1rem", paddingTop: "0.5rem", paddingBottom: "0.4rem", color: "#E55405", fontWeight: "bold" }}>MY PREFERENCES</h6>
                    </Grid>
                    <form>
                        <div style={{ paddingLeft: "2.5rem" }}>
                            {/* Available nights */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                                        <h6 style={{  fontWeight: "bold", marginTop: "2rem", paddingRight: "3rem", marginLeft: "-7rem" }}>
                                            Available Nights to Host 
                                        </h6>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Sun" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Mon" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Tue" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Wed" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Thu" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Fri" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid"/>} label="Sat" labelPlacement='top'/>
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "2.5rem" }}>
                                            Maximum Number of Guests
                                        </h6>
                                        <FormControl sx={{ width: "5rem" }}>
                                            <Select
                                                labelId="max-guests-number-label"
                                                id="max-guests-number"
                                                sx={{ height: "2rem" }}
                                                MenuProps={{ style: {
                                                    maxHeight: "10rem",
                                                }}}
                                                defaultValue={1}
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4rem" }}>
                                            Preferred Gender to Host
                                        </h6>
                                        <FormControl sx={{ width: "15rem" }}>
                                            <Select
                                                labelId="max-guests-number-label"
                                                id="max-guests-number"
                                                sx={{ height: "2rem" }}
                                                defaultValue={1}
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.69rem" }}>
                                            Children, Pets, Smoking
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Kid Friendly" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Pet Friendly" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Smoking is Allowed" labelPlacement='right'/>
                                        </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ width: "57rem", borderBottomWidth: 3, mt: "1rem" }}/>
                            </Grid>
                            {/* ---------------------------- My Home ----------------------------------*/}
                            <Grid item xs={12}>
                                <h6 style={{ textAlign: "left", paddingTop: "0.5rem",  color: "#E55405", fontWeight: "bold", marginTop: "1.25rem" }}>MY HOME</h6>
                            </Grid>
                            {/* Sleeping Arrangements */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            mt: "1.25rem"
                                        }}
                                        >
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.5rem" }}>
                                            Sleeping Arrangements
                                        </h6>
                                        <FormControl sx={{ width: "15rem" }}>
                                            <Select
                                                labelId="max-guests-number-label"
                                                id="max-guests-number"
                                                sx={{ height: "2rem" }}
                                                defaultValue={3}
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
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                Description of Sleeping Arrangement
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField 
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline 
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={5}
                                                    maxRows={10}
                                                    />
                                            </FormControl>
                                        </Item>
                                        {/* Roommate Situation */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                Roommate Situation
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField 
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline 
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={5}
                                                    maxRows={10}
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.69rem" }}>
                                            Miscellaneous
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label=" I Have a Pet" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Kids at Home" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Smoking at Home" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid"/>} label="Wheelchair Accessible" labelPlacement='right'/>
                                        </Box>
                                </Box>
                            </Grid>
                            {/* Additional Information */}
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%', mt: "2rem" }}>
                                    <Stack spacing={3}>
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                Additional Information
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField 
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline 
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={5}
                                                    maxRows={10}
                                                    />
                                            </FormControl>
                                        </Item>
                                    </Stack>
                                </Box>
                            </Grid>
                            {/* MAP🥳 */}
                            <Grid item xs={12}>
                                <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.8rem" }}>
                                    Specify The Location of Your Home on The Map
                                </h6>
                                <MapContainer center={[0, 0]} zoom={6} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <GeoSearchField />
                                    <SetViewToCurrentLocation />
                                    <Marker position={[0, 0]}>
                                        <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Grid>
                            {/* Confirm Button */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                    </form>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default EditHome;
