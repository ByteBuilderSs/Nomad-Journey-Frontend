import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Stack,
    Typography,
    ImageList, ImageListItem, Skeleton
} from "@mui/material";
import {Divider, Item} from "semantic-ui-react";
import "../UserPanel/RightBar/MyAnnouncement.css";
import "./generalPostsTab.css";
import {AiFillHeart} from "react-icons/ai";
import axios from "axios";
import {useCounter, useCounterActions} from "../../Context/CounterProvider";
import './generalPost.css'
import './mostLikedPost.css'
import {useNavigate} from "react-router-dom";
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import "./youMightLike.css";

export default function YouMightLike()
{
    const users = [
        {
            username: 'Aming',
            userprofile: <UserProfile user_id={19} first_name={`Amin Gh`} imageSize={40} profileSize={`3.2rem`}/>,
            name_lastname: 'Amin Gh'
        },
        {
            username: 'khanomi',
            userprofile: <UserProfile user_id={7} first_name={`khanom khanoma`} imageSize={40} profileSize={`3.2rem`}/>,
            name_lastname: 'khanom khanoma'
        },
        {
            username: 'alii',
            userprofile: <UserProfile user_id={6} first_name={`ali agh`} imageSize={40} profileSize={`3.2rem`}/>,
            name_lastname: 'ali agh'
        },
        {
            username: 'khanomi',
            userprofile: <UserProfile user_id={7} first_name={`khanom khanoma`} imageSize={40} profileSize={`3.2rem`}/>,
            name_lastname: 'khanom khanoma'
        },
        {
            username: 'alii',
            userprofile: <UserProfile user_id={6} first_name={`ali agh`} imageSize={40} profileSize={`3.2rem`}/>,
            name_lastname: 'ali agh'
        }
    ]


    const [mightLikeUser, setMightLikeUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const counter = useCounter();
    const setCounter = useCounterActions();
    // useEffect( () =>
    // {
    //     axios(`https://api.nomadjourney.ir/api/v1/blog/most-liked-blog/`)
    //         .then((data) => {
    //             setMostLikedBlogs(data.data)
    //         })
    //         .catch(error =>
    //         {
    //         })
    //         .finally( () => {
    //             setLoading(false);
    //             dropNull(mostPostLiked);
    //             console.log(mostPostLiked)
    //             console.log(mostLikedBlogs);
    //         })
    // }, [counter]);
    const navigate = useNavigate();
    const handelViewProf=(username)=>
    {
        navigate(`/home/Profile/${username}/`)
    }
    const loadArray = [1,2,3];
    return(
        <>
            <div style={{
                justifyContent:"center",
                alignItems:"center",
                display:"flex",
                minWidth:'100%'
                // marginTop:"15vh",
                // marginLeft:"3vw",
                // position:"relative",
            }}>

                <div style={{
                    backgroundColor:"rgba(0,78,137,0.1)",
                    // paddingBottom:"1vh",
                    borderRadius:"15px",
                    color:"#004E89",
                    // marginTop:"33vh",
                    // marginLeft:"3vw",
                    // position:"fixed",
                    // width:"20%",
                    minWidth:'100%'

                }}>
                    <h4
                        style={{
                            paddingTop:"2vh",
                            paddingBottom:"1vh",
                            paddingLeft:"1vw",
                        }}>You Might Like</h4>
                    <div>
                        {users.map((item, key) => (
                            <div key={key} className={key === 4 ? `user last`: `user`}
                            onClick={() => {handelViewProf(item.username)}}>
                                <Stack direction={`row`} sx={{
                                    display:"flex",
                                    alignItems:"center",
                                    paddingLeft:"1vw",
                                    paddingRight:"1vw",
                                }}
                                spacing={1}>
                                    <Item>
                                        {item.userprofile}
                                    </Item>
                                    <Item>
                                        <Typography style={{fontSize:"130%"}}>
                                            {item.name_lastname}
                                            <p style={{marginTop:"-0.5rem" ,fontSize:"70%",
                                                color:"rgba(52, 52, 52, 0.5)"}}>
                                                @{item.username}
                                            </p>
                                        </Typography>
                                    </Item>
                                </Stack>
                            </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}