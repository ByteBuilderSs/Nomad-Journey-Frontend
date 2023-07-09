import React, {useCallback, useMemo, useRef} from 'react'
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
    Autocomplete,
    CircularProgress, Tooltip, Select, MenuItem, Stack,
} from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import GeoSearchField from "../../UserPanel/EditProfile/GeoSearch";
import {makeStyles} from "@mui/styles";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Item} from "semantic-ui-react";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";
import {Col, Row} from "react-bootstrap";
import Control from "react-leaflet-custom-control";
import {renderToStaticMarkup} from "react-dom/server";
import {FaMapMarkerAlt} from "react-icons/fa";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
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
    },
    editButton:{
        width:"4em",
        background:"#EFEFD0",
        backgroundPosition:"right bottom",
        color:"#1A659E",
        fontWeight:"bold",
        border:"solid 2px #1A659E",
        borderRadius:"15px",
        transition:"all 0.2s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            border:"solid 2px #F7C59F",
            backgroundColor : "#F7C59F",
            backgroundPosition:"left bottom",
            color:"#1A659E"
        }
    }

}))
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
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
                    // setLocation({lat: 51.505, lng: -0.09});

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
                    // setDraggable(false);
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

    const iconMarkup = renderToStaticMarkup(
        <div style={{
            bottom: "0.7vh",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(3.5)",
            color: "rgba(0,78,137,1)"} }>
            <FaMapMarkerAlt />
        </div>
    );
    const customMarkerIcon = divIcon({
        html: iconMarkup
    });

    return (
        <>
            <Marker icon={customMarkerIcon}
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={[location.lat, location.lng]}
                ref={markerRef}>
                {/*<Popup minWidth={100}>*/}
                {/*    <Typography>You can save your location after clicking on submit button.</Typography>*/}
                {/*    <Button onClick={saveLocation} type='button' variant='contained' sx={{ position: 'center'}}>Submit</Button>*/}
                {/*</Popup>*/}
            </Marker>
            <Control position={`topright`}>
                {!draggable && <Button sx={{
                    width:"4em",
                    background:"rgba(239,239,208,0.65)",
                    backgroundPosition:"right bottom",
                    color:"#1A659E",
                    fontWeight:"bold",
                    border:"solid 2px #1A659E",
                    borderRadius:"12px",
                    transition:"all 0.2s ease-out",
                    display:"block",
                    backgroundSize:"200% 100%",
                    "&:hover":{
                        border:"solid 2px #1A659E",
                        backgroundColor : "#1A659E",
                        backgroundPosition:"left bottom",
                        color:"#EFEFD0"
                    }
                }} size={`small`}
                    onClick={() => setDraggable(true)}>
                    Edit
                </Button>}
                {draggable &&
                    <Button
                        sx={{
                            width:"4em",
                            background:"rgba(247,197,159,0.7)",
                            backgroundPosition:"right bottom",
                            color:"#1A659E",
                            fontWeight:"bold",
                            border:"solid 2px #1A659E",
                            borderRadius:"12px",
                            transition:"all 0.2s ease-out",
                            display:"block",
                            backgroundSize:"200% 100%",
                            "&:hover":{
                                border:"solid 2px #1A659E",
                                backgroundColor : "#1A659E",
                                backgroundPosition:"left bottom",
                                color:"#EFEFD0"
                            }
                        }} size={`small`}
                        onClick={() => {
                            setDraggable(false);
                            toast.warning("Use \"Update Address\" button to change your location")
                        }}>
                        Save
                    </Button>
                }
            </Control>

        </>
    );
}



const MyAddress = (props) => {
    const classes = styles();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const { username } = useParams();

    const first_location = {};
    const [location, setLocation] = useState({});
    const [defaultLocation, setDefaultLocation] = useState({});
    const [street, setStreet] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [postalCode, setPostalCode] = useState("");

    /* ADDED */
    const [countries, setCountries] = React.useState([]);
    const [countryInput, setCountryInput] = useState('');
    const [open, setOpen] = React.useState(false);
    const loading = open && countries.length === 0;

    const [cities, setCities] = React.useState([]);
    const [cityInput, setCityInput] = useState('');
    const [openC, setOpenC] = React.useState(false);

    const loadingC = openC && cities.length === 0;
    console.log("$$$$$$$$$$$$$$$$$$$$$ THE LOCATION OBJECT IS $$$$$$$$$$$$$$$$$$$$$$$$$$ ", location);

    const loadCountries = async () => {
        console.log("----------------------- IN LOAD COUNTRIES ------------------- ")
        axios({
            method: "get",
            url: "https://api.nomadjourney.ir/api/v1/utils/get-countries/",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            setCountries(result.data);
            console.log("The result.data is: ", result.data);
        }).catch((error) => {
            toast.error("Something went wrong while fetching countries.")
        })
    }
    console.log("********** THE COUNTRIES ARE ******** ", countries);

    const loadCities = async () => {
        if (country) {
            axios({
                method: "get",
                url: `https://api.nomadjourney.ir/api/v1/utils/get-cities-of-country/${country.id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                setCities(result.data);
            }).catch((error) => {
                toast.error("Something went wrong while fetching cities.")
            })
        }
    }

    console.log("+++++++++++++ THE CORRESPONDING CITIES ARE +++++++++++++ ", cities);

    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        const asyncFn = async () => {
            await sleep(1e3); // For demo purposes.
            if (active)
            {
                loadCountries();
            }
        };
        asyncFn()
        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setCountries([]);
        }
    }, [open]);

    React.useEffect(() => {
        let active = true;
        if (!loadingC) {
            return undefined;
        }
        const asyncFn = async () => {
            await sleep(1e3); // For demo purposes.
            if (active)
            {
                loadCities();
            }
        };
        asyncFn();

        return () => {
            active = false;
        };
    }, [loadingC, country]);

    React.useEffect(() => {
        if (!openC) {
            setCities([]);
        }
    }, [openC]);

    const handleCountrySelection = (value) => {
        setCountry(value);
    }

    console.log("!!!!!!!!!!!!!!!!! THE SELECTED COUNTRY IS !!!!!!!!!!!!!!!!", country);

    const handleCitySelection = (value) => {
        setCity(value);
        // setDefaultLocation({lat: value.c_lat, lng: value.c_long});
    }

    console.log("------------------- THE SELECTED CITY IS ------------------", city);
    // setLocation({lat: city.c_lat, lng: city.c_long})

    const handleChangeStreet = (event) => {
        setStreet(event.target.value);
    }
    const handleChangeApt = (event) => {
        setApt(event.target.value);
    }

    const handleChangePostalCode = (event) => {
        setPostalCode(event.target.value);
    }

    useEffect(() => {
        loadUserInfo();
    }, []);
    const [checkLatLongRender, setCheck] = useState(false);

    const loadUserInfo = async () => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/api/v1/accounts/user/${username}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            if (result.data.User_address_lat && result.data.User_address_long) {
                console.log("++++++++++++++++");
                setLocation({lat: result.data.User_address_lat, lng: result.data.User_address_long});
            }
            else {
                setLocation({lat: 1, lng: 1});
            }
            setStreet(result.data.User_address);
            setApt(result.data.User_apt);
            setCity({id: result.data.User_city, city_name: result.data.city_name});
            setCountry({id: result.data.User_city, country: result.data.city_country});
            setPostalCode(result.data.User_postal_code);
        }).catch((error) => {
            toast.error("Something went wrong while fetching data.")
            {/* TODO => err.response.data.message*/}
        })
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let validData = 1;
        if (!city) {
            toast.error("The City field can not be empty.");
            validData = 0;
        }
        if (!country) {
            toast.error("The Country field can not be empty.");
            validData = 0;
        }
        if (!postalCode) {
            toast.error("The Postal code field can not be empty.");
            validData = 0;
        }
        if (validData === 1)
        {
            axios({
                method: "patch",
                url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit6/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data : {
                    User_address: street,
                    User_apt: apt,
                    User_city: city.id,
                    User_postal_code: postalCode,
                    city_name: city.city_name,
                    city_country: city.country,
                    User_address_lat: location.lat,
                    User_address_long: location.lng
                }
            }).then((res) => {
                toast.success("Changes updated successfully.");
            }).catch((error) => {
                toast.error("Something went wrong while updating information.");
            })
        }
    }
    const SetViewCenter = () => {
        const map = useMap();
        map.setView([location.lat, location.lng], 13);
    }
    const onCancel = async (event) => {
        event.preventDefault();
        loadUserInfo();
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
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{
                            paddingLeft: "1.2rem",
                            paddingTop:"2.5rem",
                            paddingBottom:"3rem",
                            paddingRight:"5rem",
                            borderRadius:"15px",
                            color:"#EFEFD0"
                        }}>
                            <form
                        id={"Change-Address-Form"}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Row>
                            <Col>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                        {/* TODO => City */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                mt: "1.25rem"
                                            }}
                                            >
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "5rem" }}>
                                                    City
                                                </h6>
                                                <FormControl sx={{width:"15em"}} variant='outlined'>
                                                    <Autocomplete
                                                        id="asynchronous-demo-city"
                                                        open={openC}
                                                        onOpen={() => {
                                                            setOpenC(true);
                                                        }}
                                                        onClose={() => {
                                                            setOpenC(false);
                                                        }}
                                                        isOptionEqualToValue={(option, value) => option.city_name === value.city_name}
                                                        getOptionLabel={(option) => option.city_name}
                                                        getOptionSelected={(option, value) => {
                                                            return option.city_name === value.city_name;
                                                        }}
                                                        options={cities}
                                                        value={city}
                                                        onChange={(e, newValue) => {
                                                            handleCitySelection(newValue)
                                                        }}
                                                        inputValue={cityInput}
                                                        onInputChange={(e, newInputValue) => {
                                                            setCityInput(newInputValue);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required
                                                                size={`small`}
                                                                className={classes.text_field}
                                                                InputLabelProps={{
                                                                    style: { color: '#EFEFD0',fontWeight: "bold" }
                                                                }}
                                                                InputProps={{
                                                                    style: { color: '#EFEFD0',
                                                                        backgroundColor:"rgba(239,239,208,0.11)",
                                                                        fontWeight:"bold",
                                                                        border:"none"},
                                                                    disableUnderline: true,
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {loadingC ? <CircularProgress color="inherit" size={20} /> : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        {/* TODO => Country */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                mt: "1.25rem"
                                            }}
                                            >
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "3.2rem" }}>
                                                    Country
                                                </h6>
                                                <FormControl sx={{width:"15em"}} variant='outlined'>
                                                    <Autocomplete
                                                        id="asynchronous-demo-country"
                                                        open={open}
                                                        onOpen={() => {
                                                            setOpen(true);
                                                        }}
                                                        onClose={() => {
                                                            setOpen(false);
                                                        }}
                                                        options={countries ?? []}
                                                        value={country}
                                                        onChange={(e, newValue) => {
                                                            handleCountrySelection(newValue);
                                                        }}
                                                        inputValue={countryInput}
                                                        onInputChange={(e, newInputValue) => {
                                                            setCountryInput(newInputValue);
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            console.log("isOptionEqualToValue => The value is: ", value);
                                                            console.log("isOptionEqualToValue => The option is: ", option);
                                                            if (option && value) {
                                                                return option.country === value.country;
                                                            } else {
                                                                return false;
                                                            }
                                                        }}
                                                        getOptionLabel={(option) => {
                                                            console.log("getOptionLabel => The option is: ", option);
                                                            return (option ? option.country : "");
                                                        }}
                                                        getOptionSelected={(option, value) => {
                                                            console.log("getOptionSelected => The value is: ", value);
                                                            console.log("getOptionSelected => The option is: ", option);
                                                            return option.country === value.country;
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required
                                                                size={`small`}
                                                                className={classes.text_field}
                                                                InputLabelProps={{
                                                                    style: { color: '#EFEFD0',fontWeight: "bold" }
                                                                }}
                                                                InputProps={{
                                                                    style: { color: '#EFEFD0',
                                                                        backgroundColor:"rgba(239,239,208,0.11)",
                                                                        fontWeight:"bold",
                                                                        border:"none"},
                                                                    disableUnderline: true,
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    ),
                                                                }} />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        {/* Street address */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                mt: "1.25rem"
                                            }}
                                            >
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "0.1rem" }}>
                                                    Street Address
                                                </h6>
                                                <FormControl variant='outlined'>
                                                    <TextField
                                                        type={"text"}
                                                        size={`small`}
                                                        className={classes.text_field}
                                                        placeholder={`Street Address`}
                                                        InputLabelProps={{
                                                            style: { color: '#EFEFD0',fontWeight: "bold" }
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                color: '#EFEFD0',
                                                                backgroundColor: "rgba(239,239,208,0.11)",
                                                                border: "none"
                                                            },
                                                            disableUnderline: true,
                                                        }}
                                                        value={street}
                                                        onChange={handleChangeStreet}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        {/* Apt/Suit/Bldg */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                mt: "1.25rem"
                                            }}
                                            >
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "0.5rem" }}>
                                                    Apt/Suit/Bldg
                                                </h6>
                                                <FormControl variant='outlined'>
                                                    <TextField
                                                        type={"text"}
                                                        size={`small`}
                                                        placeholder={`Apt/Suit/Bldg`}
                                                        className={classes.text_field}
                                                        InputLabelProps={{
                                                            style: { color: '#EFEFD0',fontWeight: "bold" }
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                color: '#EFEFD0',
                                                                backgroundColor: "rgba(239,239,208,0.11)",
                                                                border: "none"
                                                            },
                                                            disableUnderline: true,
                                                        }}
                                                        value={apt}
                                                        onChange={handleChangeApt}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>


                                        {/* Postal Code */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                mt: "1.25rem"
                                            }}
                                            >
                                                <h6 style={{ fontWeight: "bold", marginLeft: "3rem", paddingRight: "1.4rem" }}>
                                                    Postal Code
                                                </h6>
                                                <FormControl variant='outlined'>
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
                                                        }}
                                                        type={"text"}
                                                        placeholder={`Postal Code`}
                                                        value={postalCode}
                                                        onChange={handleChangePostalCode}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                </Grid>
                        </Col>
                        <Col>
                                <h6 style={{ fontWeight: "bold", paddingRight: "4.9rem", marginLeft: "3rem"
                                }}>
                                    Specify The Location of Your Home on The Map
                                </h6>
                                <div className='map-container'>
                                    <MapContainer  center={[0, 0]} zoom={16} scrollWheelZoom={true}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <GeoSearchField />
                                        {checkLatLongRender && <SetViewCenter/>}
                                        {/* TODO => اگر فقط یک کاربر موقعیتش رو قبلا وارد نکرده بود بریم از مرورگر موقعیتش رو دربیاریم */}
                                        {!checkLatLongRender && <SetViewToCurrentLocation location={location} setLocation={setLocation}/>}
                                        {location.lat && location.lng && (<CustomizeMarker location={location} setLocation={setLocation} />)}
                                    </MapContainer>
                                </div>
                        </Col>
                    </Row>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                                      sx={{
                                          paddingTop:"3rem", paddingBottom:"3rem",
                                          marginLeft: "3rem"
                                      }}>
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
                                            onClick={onSubmit}>
                                        Update Address
                                    </Button>
                                </Grid>
                </form>

                                </div>
                            </Grid>
</Grid>
</Box>
</React.Fragment>
    )
}

export default MyAddress;