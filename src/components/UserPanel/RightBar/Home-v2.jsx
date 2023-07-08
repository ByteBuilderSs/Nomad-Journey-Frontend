import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Divider,
    Card,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { toast } from "react-toastify";
import {Item} from "semantic-ui-react";
import './Home.css';

import {Link, Route, Routes, useParams,useNavigate,useLocation} from "react-router-dom";


let username = "";
let access_token = "";

if (localStorage.getItem('tokens'))
{
    const allData = JSON.parse(localStorage.getItem('tokens'));
    username = allData.username;
    access_token = allData.access;
}

const RecenterAutomatically = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}


const HomeV2 = (props) => {
    const [lat, setLat] = useState(51.505);
    const [lng, setLng] = useState(-0.09);
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
    const [days, setDays] = useState([]);
    


    // for unuthenticated : 
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const loadUserHomeInfo = async () => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit5/${props.url_username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            if (result.data.data.User_address_lat) {
                console.log("++++++++++++++++");
                setLat(result.data.data.User_address_lat);
            }
            if (result.data.data.User_address_long) {
                console.log("----------------------");
                setLng(result.data.data.User_address_long);
            }
            
            let is_sat = result.data.data.is_sat;
            setSat(is_sat);
            if (is_sat === true) {
                console.log("ddddddddddddd");
                setDays(oldArray => [...oldArray, "Saturday"]);
            }

            let is_sun = result.data.data.is_sun;
            setSun(is_sun);
            if (is_sun === true) {
                setDays(oldArray => [...oldArray, "Sunday"]);
            }

            let is_mon = result.data.data.is_mon;
            setMon(is_mon);
            if (is_mon === true) {
                setDays(oldArray => [...oldArray, "Monday"]);
            }

            let is_tue = result.data.data.is_tue;
            setTue(is_tue);
            if (is_tue === true) {
                setDays(oldArray => [...oldArray, "Tuesday"]);
            }

            let is_wed = result.data.data.is_wed;
            setWed(is_wed);
            if (is_wed === true) {
                setDays(oldArray => [...oldArray, "Wednesday"]);
            }
            
            let is_thu = result.data.data.is_thu;
            setThu(is_thu);
            if (is_thu === true) {
                setDays(oldArray => [...oldArray, "Thursday"]);
            }

            let is_fri = result.data.data.is_fri;
            setFri(is_fri);
            if (is_fri === true) {
                setDays(oldArray => [...oldArray, "Friday"]);
            }

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

    useEffect(() => {


        if(props.local_storage_username == props.url_username){
            setIsAuthenticate(true);
        }


    }, []);
    

    const DaysCheck = (days) => {
        console.log("THE DAYS ARE: ", days);
        if (days.length === 0) {
            return (
                <>
                    <span>No preferred day is declared yet.</span>
                </>
            );
        }
        return (
            <>
                <span>{(days.map((d, index) => (<span key={index}>{(index ? ', ' : ' ') + d }</span>)))}</span>
            </>
        );
    };

    const GenderCheck = (gender) => {
        console.log("THE GENDER IS: ", gender);
        if (gender == 1) {
            return (
                <>
                    <span>Any</span>
                </>
            );
        }
        else if (gender == 2) {
            return (
                <>
                    <span>Male</span>
                </>
            )
        }
        else if (gender == 3) {
            return (
                <>
                    <span>Female</span>
                </>
            )
        }
        else {
            return(
                <>
                    <span>No preferred gender is declared yet.</span>
                </>
            )
        }
    }
    /*
        SHARED_BED= 1
        SHARED_ROOM = 2
        PRIVATE_ROOM = 3
        PUBLIC_ROOM = 4
     */
    const SleepCheck = (sleep) => {
        console.log("THE SLEEP IS: ", sleep);
        if (sleep === 1) {
            return (
                <>
                    <span>Shared Bed</span>
                </>
            )
        }
        else if (sleep === 2) {
            return (
                <>
                    <span>Shared Room</span>
                </>
            )
        }
        else if (sleep === 3) {
            return (
                <>
                    <span>Privet Room</span>
                </>
            )
        }
        else if (sleep === 4) {
            return (
                <>
                    <span>Public Room</span>
                </>
            )
        }
        else {
            return (
                <>
                    <span>No sleeping arrangement is declared yet.</span>
                </>
            )
        }
    }
    return (
        <>
            <div style={{alignItems:"center", justifyContent:"center", display:"flex",
                paddingTop:"5rem"
            }}>
                <Stack
                    spacing={5}
                    sx={{width:"75%",
                }}>
                    <Item>
                        <div style={{
                            backgroundColor:"#1A659E",
                            borderRadius:"15px",
                            color:"#EFEFD0",

                        }}>
                            {isAuthenticate && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                                <Grid item xs={12}>
                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                                        MY HOME
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>
                                    {/* Location on map */}
                                    {
                                        props.url_username === props.local_storage_username ? 
                                        <Grid item xs={12} sx={{ ml: "24rem", mb: "1.4rem", display: "flex" }}>
                                            <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={true} >
                                                <TileLayer
                                                attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[lat,lng]}>
                                                <Popup>
                                                    Your Home Location on The Map.
                                                </Popup>
                                                </Marker>
                                                <RecenterAutomatically lat={lat} lng={lng} />
                                            </MapContainer>
                                        </Grid>
                                        : null
                                    }
                                </Grid>
                            </Grid>}
                        </div>
                    </Item>
                    <Item>
                        <div style={{
                            backgroundColor:"#1A659E",
                            borderRadius:"15px",
                            color:"#EFEFD0",
                        }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                                <Grid item xs={12}>
                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem",  textTransform: 'uppercase' }}>
                                        {props.first_name}'S PREFERENCES
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>
                                </Grid>
                                {/* WHICH DAYS IN THE WEEK */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Preferred Days to Host: <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{DaysCheck(days)}</span>
                                    </h3>
                                </Grid>
                                {/* Maximum Number of Guests */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Max Number of Guests: <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{guestsCount ? guestsCount 
                                                                                                                                                        : <span>Preferred maximum guest count is not declared yet.</span>}</span>
                                    </h3>
                                </Grid>
                                {/* Preferred Gender to Host */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Preferred Gender to Host: <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{GenderCheck(prefGender)}</span>
                                    </h3>
                                </Grid>
                                {/* Kid Friendly? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Kid Friendly? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isKidFriendly === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}
                                                    </span>
                                    </h3>
                                </Grid>
                                {/* Pet Friendly? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Pet Friendly? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isPetFriendly === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                                {/* Smoking Allowed? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", mb: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Smoking Allowed? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isSmokingAllowed === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                            </Grid>
                        </div>
                    </Item>
                    <Item>
                        <div style={{
                            backgroundColor:"#1A659E",
                            borderRadius:"15px",
                            color:"#EFEFD0",
                            marginBottom: "2rem"
                        }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                                <Grid item xs={12}>
                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem",  textTransform: 'uppercase' }}>
                                        {props.first_name}'s HOME
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>
                                </Grid>
                                {/* Has Kid? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Has Children? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{haveKid === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                                {/* Has Pet? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Has Pets? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{havePet === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                                {/* Smoking Allowed? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Smoking at Home? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{doesSmoke === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                                {/* Wheelchair Accessible? */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        Wheelchair Accessible? <span style={{ fontSize: 15, color: "#F7C59F"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{wheelchair === true 
                                                                                                                                        ? (<span>Yes</span> ) 
                                                                                                                                        : (<span>No</span>)}</span>
                                    </h3>
                                </Grid>
                                {/* --------------------------- Sleeping Arrangements -----------------------------*/}
                                <Grid item xs={12}>
                                <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase' }}>
                                        Sleeping Arrangements
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                </Grid>
                                {/* Description of Sleeping Arrangement */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <h3 style={{ display: "flex" }}>
                                        <span style={{ fontSize: 15, color: "#F7C59F"}}>{SleepCheck(sleepArg)}</span>
                                    </h3>
                                    <Typography component="p" sx={{ width: "92%", color: "#0F3E86", overflowWrap: 'break-word' }} >
                                        {descArg && descArg.length > 0 ? <p style={{ marginLeft: "0.04rem", color: "#F7C59F" }}>{descArg}</p> : <p style={{ marginLeft: "0.04rem",  color: "#F7C59F" }}>No more description is declared yet...</p>}
                                    </Typography>
                                </Grid>
                                {/* ---------------------------------------------- Roomate Situation ---------------------------------*/}
                                <Grid item xs={12}>
                                <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase' }}>
                                        Roomate Situation
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                </Grid>
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                                    <Typography component="p" sx={{ width: "92%", color: "#F7C59F", overflowWrap: 'break-word' }} >
                                        {roomateSituation && roomateSituation.length > 0 ? <p style={{ marginLeft: "0.04rem" }}>{roomateSituation}</p> : <p style={{ marginLeft: "0.04rem" }}>No description is declared yet...</p>}
                                    </Typography>
                                </Grid>
                                {/* --------------------------- More Details -----------------------------*/}
                                <Grid item xs={12}>
                                <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase' }}>
                                        More Details
                                    </h3>
                                    <Divider sx={{ borderBottomWidth: 3, width: "100%", backgroundColor:"rgb(239,239,208)", mb: "1rem" }}/>

                                </Grid>
                                {/* Description of more details */}
                                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", mb: "1rem" }}>
                                    <Typography component="p" sx={{ width: "92%", color: "#F7C59F", overflowWrap: 'break-word' }} >
                                        {additionalInfo && additionalInfo.length > 0 ? <p style={{ marginLeft: "0.04rem" }}>{additionalInfo}</p> : <p style={{ marginLeft: "0.04rem" }}>No more information is declared yet...</p>}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Item>
                </Stack>

            </div>
        </>
    )
}

export default HomeV2
