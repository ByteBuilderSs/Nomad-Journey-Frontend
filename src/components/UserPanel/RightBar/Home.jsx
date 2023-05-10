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
import './Home.css';

const Home = (props) => {
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={12}>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem" }}>
                        MY HOME
                    </h3>
                    {/* Location on map */}
                    {
                        props.url_username === props.local_storage_username ? 
                        <Grid item xs={12} sx={{ ml: "2.2rem" }}>
                            <div className='map-container'>
                                <MapContainer center={[51.505, -0.09]} zoom={16} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[51.505, -0.09]}>
                                        <Popup>
                                            Your Home Location on The Map.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </Grid>
                        : null
                    }
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem", mt: "1rem"}}/>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase', color: "#E55405" }}>
                        {props.first_name}'S PREFERENCES
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* WHICH DAYS IN THE WEEK */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Preferred Days to Host: <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sunday, Monday</span>
                    </h3>
                </Grid>
                {/* Maximum Number of Guests */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Max Number of Guests: <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1</span>
                    </h3>
                </Grid>
                {/* Preferred Gender to Host */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Preferred Gender to Host: <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female</span>
                    </h3>
                </Grid>
                {/* Kid Friendly? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Kid Friendly? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* Pet Friendly? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Pet Friendly? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* Smoking Allowed? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Smoking Allowed? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* --------------------------- Home Info -----------------------------*/}
                <Grid item xs={12}>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem", mt: "1rem" }}/>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase', color: "#E55405" }}>
                        {props.first_name}'s HOME
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* Has Kid? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Has Children? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* Has Pet? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Has Pets? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* Smoking Allowed? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Smoking at Home? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* Wheelchair Accessible? */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        Wheelchair Accessible? <span style={{ fontSize: 15, color: "#0F3E86"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</span>
                    </h3>
                </Grid>
                {/* --------------------------- Sleeping Arrangements -----------------------------*/}
                <Grid item xs={12}>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem", mt: "1rem" }}/>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase', color: "#E55405" }}>
                        Sleeping Arrangements
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* Description of Sleeping Arrangement */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
                    <h3 style={{ display: "flex" }}>
                        <span style={{ fontSize: 15, color: "#0F3E86"}}>Private Room</span>
                    </h3>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ut molestias earum magnam accusantium iure tenetur sed dicta ex voluptate, porro cum officia corporis dignissimos voluptatum aspernatur eveniet voluptates dolorem tempora, veniam perspiciatis et. Quia deserunt consequuntur facilis doloribus est, consectetur dicta quod quidem voluptatum mollitia assumenda sint nemo ratione velit culpa, voluptate amet eligendi reprehenderit. Similique, recusandae sint? Sapiente similique asperiores itaque qui, quis nostrum illum voluptatem debitis cumque sed error enim maxime nisi modi aspernatur molestias praesentium velit voluptatibus fugiat maiores odio ipsam odit! Labore mollitia consectetur voluptatum quisquam eum sit minima repellat accusamus perferendis. Inventore nemo doloribus, distinctio voluptate autem eum atque vel ab culpa error reiciendis deleniti harum recusandae eos quisquam rem hic sit nam doloremque consectetur odit est. Aliquid laboriosam beatae aspernatur consequatur error nobis vitae quisquam, vel in fugiat minima numquam, et ipsam porro.
                    </Typography>
                </Grid>
                {/* --------------------------- More Details -----------------------------*/}
                <Grid item xs={12}>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem", mt: "1rem" }}/>
                    <h3 style={{ display: "flex", alignItems: "center", marginTop: "1.5rem", marginLeft: "1rem", marginBottom: "1rem", textTransform: 'uppercase', color: "#E55405" }}>
                        More Details
                    </h3>
                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}}/>
                </Grid>
                {/* Description of more details */}
                <Grid item xs={12} sx={{ marginLeft: "2rem", marginTop: "1rem", mb: "1rem" }}>
                    <Typography component="p" sx={{ width: "95%", color: "#0F3E86" }} >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ut molestias earum magnam accusantium iure tenetur sed dicta ex voluptate, porro cum officia corporis dignissimos voluptatum aspernatur eveniet voluptates dolorem tempora, veniam perspiciatis et. Quia deserunt consequuntur facilis doloribus est, consectetur dicta quod quidem voluptatum mollitia assumenda sint nemo ratione velit culpa, voluptate amet eligendi reprehenderit. Similique, recusandae sint? Sapiente similique asperiores itaque qui, quis nostrum illum voluptatem debitis cumque sed error enim maxime nisi modi aspernatur molestias praesentium velit voluptatibus fugiat maiores odio ipsam odit! Labore mollitia consectetur voluptatum quisquam eum sit minima repellat accusamus perferendis. Inventore nemo doloribus, distinctio voluptate autem eum atque vel ab culpa error reiciendis deleniti harum recusandae eos quisquam rem hic sit nam doloremque consectetur odit est. Aliquid laboriosam beatae aspernatur consequatur error nobis vitae quisquam, vel in fugiat minima numquam, et ipsam porro.
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
