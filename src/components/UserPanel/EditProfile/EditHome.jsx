import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
    Tooltip,
} from '@mui/material';
import { Item } from "semantic-ui-react";
import GeoSearchField from './GeoSearch';
import { usePosition } from 'use-position';
import L from 'leaflet';
import { useGeolocated } from "react-geolocated";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


let username = "";
let access_token = "";

if (localStorage.getItem('tokens')) {
    const Data = JSON.parse(localStorage.getItem('tokens'));
    username = Data.username;
    access_token = Data.access;
}


const RecenterAutomatically = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

const SetViewToCurrentLocation = ({location, setLocation}) => {
    console.log("&&&&&&&&&&&&&&&&&&&&&& THE LOCATION IN SetViewToCurrentLocation &&&&&&&&&&&&&&&&&&&&&&&&&&&&", location.lat);
    const map = useMap();

    function getGeo() {
        if (!location.lat && !location.lng) {
            console.log("+++++++++++++++++ TRY TO GET LOCATION FROM BROWSER +++++++++++++++++++");
            navigator.geolocation.getCurrentPosition( 
                (position) =>  {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                }, 
                (error) => {
                    console.log("--------- ERROR WHILE FETCHING LOCATION ----------- ", error);
                    console.log("THE LOCATION.LAT ", location.lat);
                    console.log("THE LOCATION.LNG ", location.lng);
                    setLocation({lat: 51.505, lng: -0.09});
    
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                ) ;
        }
    }

    useEffect(() => {
        if (location) {
            console.log("LATITUDE IS: ", location.lat);
            console.log("LONGTITUDE IS: ", location.lng);
            console.log("THE LOCATIONS IS ", location);
            getGeo();
        }
    }, [location, location]);

    useEffect(() => {
        if (location.lat && location.lng) {
            console.log("THE LOCATION IN USEEFFECT IS: ", location);
            map.setView([location.lat, location.lng]);
        }
    }, [location]);

    return null;
};

const CustomizeMarker = ({location, setLocation}) => {
    const [draggable, setDraggable] = useState(false);
    console.log("*************** THE INPUT LOCATION IS ***************** ", location);
    let lat = location.lat;
    let lng = location.lng;
    // const [position, setPosition] = useState({lat, lng});
    
    // console.log("-----------------THE POS VALUE IS ------------------- ", position);
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
            const marker = markerRef.current
            if (marker != null) {
                console.log("+++++++++++ THE OUTPUT OF getLatLng IS ++++++++++++ ", marker.getLatLng());
                setLocation(marker.getLatLng());
                setDraggable(false);
            }
            },
        }),
        [],
    );

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);

    const saveLocation = () => {
        if (markerRef.current)
        {
            console.log(
                "+++++++++++ THE NEW LATLONG AFTER SUBMIT IS ++++++++++++ ",
                markerRef.current.getLatLng()
            );
        }
    };


    return (
        <>
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={[location.lat, location.lng]}
                ref={markerRef}>
                <Popup minWidth={100}>
                    <Typography>You can save your location after clicking on submit button.</Typography>
                    <Button onClick={saveLocation} type='button' variant='contained' sx={{ position: 'center'}}>Submit</Button>
                </Popup>
            </Marker>
            <Tooltip title='click here to make the marker draggable' arrow placement='top'>
                <Button  onClick={toggleDraggable} variant='contained' className='edit-location-button' type='button'>Edit Your Location</Button>
            </Tooltip>

        </>
    );
}

const EditHome = () => {
    // User_address_lat, User_address_long
    const navigate = useNavigate();
    const [location, setLocation] = useState({});
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
    const [sleepArg, setSleepArg] = useState('');
    const [descArg, setDescArg] = useState('');
    const [roomateSituation, setRoomateSituation] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [havePet, setHavePet] = useState(false);
    const [haveKid, setHaveKid] = useState(false);
    const [doesSmoke, setDoesSmoke] = useState(false);
    const [wheelchair, setWheelchair] = useState(false);

    console.log("THE SAT VALUE: ", sat);
    console.log("THE MON VALUE: ", mon);
    console.log("$$$$$$$$$$$$$$$$$$$$$ THE LOCATION OBJECT IS $$$$$$$$$$$$$$$$$$$$$$$$$$ ", location);

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
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit5/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            if (result.data.data.User_address_lat && result.data.data.User_address_long) {
                console.log("++++++++++++++++");
                setLocation({lat: result.data.data.User_address_lat, lng: result.data.data.User_address_long});
            }

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
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();


        axios({
            method: "patch",
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit5/${username}`,
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
                sleeping_arrangments: sleepArg,
                description_of_sleeping_arrangement: descArg,
                roommate_situation: roomateSituation,
                additional_information: additionalInfo,
                i_have_pet: havePet,
                kids_at_home: haveKid,
                smoking_at_home: doesSmoke,
                wheelchair_accessible: wheelchair,
                User_address_lat: location.lat, 
                User_address_long: location.lng
            }
        }).then((res) => {
            console.log(res);
            navigate(`/home/Profile/${username}/`);
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
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={sun} onChange={handleChangeSun}/>} label="Sun" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={mon} onChange={handleChangeMon}/>} label="Mon" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={tue} onChange={handleChangeTue}/>} label="Tue" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={wed} onChange={handleChangeWed}/>} label="Wed" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={thu} onChange={handleChangeThu}/>} label="Thu" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={fri} onChange={handleChangeFri}/>} label="Fri" labelPlacement='top'/>
                                        <FormControlLabel control={<Checkbox  variant="solid" checked={sat} onChange={handleChangeSat}/>} label="Sat" labelPlacement='top'/>
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4rem" }}>
                                            Preferred Gender to Host
                                        </h6>
                                        <FormControl sx={{ width: "15rem" }}>
                                            <Select
                                                labelId="max-guests-number-label"
                                                id="max-guests-number"
                                                sx={{ height: "2rem" }}
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.69rem" }}>
                                            Children, Pets, Smoking
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={isKidFriendly} onChange={handleChangeKF}/>} label="Kid Friendly" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={isPetFriendly} onChange={handleChangePF}/>} label="Pet Friendly" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={isSmokingAllowed} onChange={handleChangSA}/>} label="Smoking is Allowed" labelPlacement='right'/>
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
                                                    value={descArg}
                                                    onChange={handleChangeSleepArgDesc}
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
                                        <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginTop: "0.69rem" }}>
                                            Miscellaneous
                                        </h6>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={havePet} onChange={handleChangeHP}/>} label=" I Have a Pet" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={haveKid} onChange={handleChangeHK}/>} label="Kids at Home" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={doesSmoke} onChange={handleChangeDS}/>} label="Smoking at Home" labelPlacement='right'/>
                                            <FormControlLabel control={<Checkbox  variant="solid" checked={wheelchair} onChange={handleWheel}/>} label="Wheelchair Accessible" labelPlacement='right'/>
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
                                                    value={additionalInfo}
                                                    onChange={handleChangeAdditionalInfo}
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
                                <div className='map-container'>
                                    <MapContainer center={[0, 0]} zoom={16} scrollWheelZoom={true}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <GeoSearchField />
                                        {/* TODO => اگر فقط یک کاربر موقعیتش رو قبلا وارد نکرده بود بریم از مرورگر موقعیتش رو دربیاریم */}
                                        <SetViewToCurrentLocation location={location} setLocation={setLocation}/> 
                                        {location.lat && location.lng && (<CustomizeMarker location={location} setLocation={setLocation} />)}
                                    </MapContainer>
                                </div>
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
                                            onClick={onSubmit}
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
                                            onClick={onCancel}
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
