import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Stack,
    Typography,
    ImageList, ImageListItem, Skeleton
} from "@mui/material";
import {Item} from "semantic-ui-react";
import "../UserPanel/RightBar/MyAnnouncement.css";
import "./generalPostsTab.css";
import {AiFillHeart} from "react-icons/ai";
import axios from "axios";
import {useCounter, useCounterActions} from "../../Context/CounterProvider";
import './generalPost.css'
import './mostLikedPost.css'
import {useNavigate} from "react-router-dom";

export default function MostLikedPost()
{



    const [mostLikedBlogs, setMostLikedBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const counter = useCounter();
    const setCounter = useCounterActions();
    let mostPostLiked = [];
    const dropNull = () => {
        {mostLikedBlogs.data.map((item, key) => {
            if (item.main_image_64 !== null && item.main_image_64[0] === "d")
                mostPostLiked.push(item);
        })}
    }
    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/api/v1/blog/most-liked-blog/`)
            .then((data) => {
                setMostLikedBlogs(data.data)
                        })
            .catch(error =>
            {
            })
            .finally( () => {
                setLoading(false);
                dropNull(mostPostLiked);
                console.log(mostPostLiked)
                console.log(mostLikedBlogs);
            })
    }, [counter]);
    const navigate = useNavigate();
    const handelViewProf=(username)=>
    {
        navigate(`/home/Profile/${username}/`)
    }
    const hoverDiv = (number_of_likes, tag) => (<>
            <div className="overlay">
                <Stack alignItems={`center`} justifyContent={`center`} display={`flex`}>
                    <Item>
                        <AiFillHeart color={`#D5D8DD`} size={25}/>
                        <span style={{marginLeft:"0.15vw", fontSize:"100%", fontWeight:"bold" }}>
                            {number_of_likes}
                        </span>
                    </Item>
                </Stack>
                <div className="tag" onClick={() => handelViewProf(tag)}>
                    <Typography component="h5" variant={`caption`}
                                style={{fontSize:"100%", bottom:0, left:0 }}>
                        <span>
                            @{tag}
                        </span>
                    </Typography>
                </div>
            </div>
        </>
    )
    const layoutImages = () =>{
        let count = mostLikedBlogs.data.length;
        if(count === 1 || count === 2 || count === 3)
            return(<>
                <ImageList sx={{ width: "100%",
                    borderRadius:"15px",
                    height: 200 }} cols={count} rowHeight={200}>
                    {mostLikedBlogs.data.map((item, key) =>
                        (
                            <>
                                <ImageListItem>
                                    <div className="image-container">
                                        <img
                                            style={{borderRadius:"5px",width:"100%", height:200}}
                                            src={item.main_image_64}
                                            loading="lazy"
                                        />
                                        {hoverDiv(item.num_likes, item.host_username)}
                                    </div>
                                </ImageListItem>
                            </>
                        ))}
                </ImageList>
            </>);
        if(count === 4)
            return(<>
                <ImageList sx={{ width: "100%", height: 350,
                    borderRadius:"15px"
                }} cols={2} rowHeight={170}>
                    {mostLikedBlogs.data.map((item, key) => (
                                <>
                                    <ImageListItem>
                                        <div className="image-container">
                                        <img
                                            style={{borderRadius:"5px",width:"100%", height:170}}
                                            src={item.main_image_64}
                                            loading="lazy"
                                        />
                                            {hoverDiv(item.num_likes, item.host_username)}
                                        </div>
                                    </ImageListItem>
                                </>
                            ))}
                </ImageList>
            </>);
        if(count === 5)
            return(<>
                <Stack spacing={0}>
                <Item>
                <ImageList sx={{ width: "100%", height: 175,
                    borderRadius:"15px 15px 0px 0px"
                }} cols={2} rowHeight={170}>
                    {mostLikedBlogs.data.map((item, key) => {
                        if (key === 0 || key === 1)
                            return(
                                <>
                                    <ImageListItem>
                                        <div className="image-container">
                                            <img
                                                style={{borderRadius:"5px",width:"100%", height:170}}
                                                src={item.main_image_64}
                                                loading="lazy"
                                            />
                                            {hoverDiv(item.num_likes, item.host_username)}
                                        </div>
                                    </ImageListItem>
                                </>
                            )
                    })}
                </ImageList>
                </Item>
                <Item>
                <ImageList sx={{ width: "100%", height: 175,
                    borderRadius:"0px 0px 15px 15px"
                    ,marginTop:"-1rem" }} cols={3} rowHeight={170}>
                    {mostLikedBlogs.data.map((item, key) => {
                        if (key === 2 || key === 3 || key === 4)
                            return(
                                <>
                                    <ImageListItem>
                                        <div className="image-container">
                                            <img
                                                style={{borderRadius:"5px",width:"100%", height:170}}
                                                src={item.main_image_64}
                                                loading="lazy"
                                            />
                                            {hoverDiv(item.num_likes, item.host_username)}
                                        </div>
                                    </ImageListItem>
                                </>
                            )
                    })}
                </ImageList>
                </Item>
                </Stack>
            </>);
    }
    const loadArray = [1,2,3,4,5];
    if(loading)
        return (
            <>
                <div style={{
                    justifyContent:"center",
                    alignItems:"center",
                    display:"flex",
                    // marginTop:"15vh",
                    // marginLeft:"3vw",
                    width:'100%'
                }}>

                    <div style={{
                        backgroundColor:"rgba(0,78,137,0.1)",
                        paddingLeft:"1vw",
                        paddingRight:"1vw",
                        paddingBottom:"1vh",
                        borderRadius:"15px",
                        color:"#004E89",
                        // marginTop:"33vh",
                        // marginLeft:"3vw",
                        
                        width:"100%",
                        height:442

                    }}>
                        <h2
                            style={{
                                paddingTop:"2vh",
                                paddingBottom:"1vh",
                            }}>Most Liked Post</h2>
                        <div>
                            <Stack spacing={0}>
                                <Item>
                                    <ImageList sx={{ width: "100%", height: 175,
                                        borderRadius:"15px 15px 0px 0px"
                                    }} cols={2} rowHeight={170}>
                                        {loadArray.map((item, key) => {
                                            if (item === 1 || item === 2)
                                                return(
                                                    <>
                                                        <ImageListItem>
                                                            <Skeleton sx={{borderRadius:"5px"}}
                                                                variant="rectangular" width="100%" height={170} />
                                                        </ImageListItem>
                                                    </>
                                                )
                                        })}
                                    </ImageList>
                                </Item>
                                <Item>
                                    <ImageList sx={{ width: "100%", height: 175,
                                        borderRadius:"0px 0px 15px 15px"
                                        ,marginTop:"-1rem" }} cols={3} rowHeight={170}>
                                        {loadArray.map((item, key) => {
                                            if (item === 3 || item === 4 || item === 5)
                                                return(
                                                    <>
                                                        <ImageListItem>
                                                            <Skeleton sx={{borderRadius:"5px"}}
                                                                      variant="rectangular" width="100%" height={170} />
                                                        </ImageListItem>
                                                    </>
                                                )
                                        })}
                                    </ImageList>
                                </Item>
                            </Stack>
                        </div>
                    </div>
                </div>
            </>
        )
    return(
            <>
                <div style={{
                    justifyContent:"center",
                    alignItems:"center",
                    display:"flex",
                    width:'100%'
                    // marginTop:"15vh",
                    // marginLeft:"3vw",
                    // position:"relative",
                }}>

                    <div style={{
                        backgroundColor:"rgba(0,78,137,0.1)",
                        paddingLeft:"1vw",
                        paddingRight:"1vw",
                        paddingBottom:"1vh",
                        borderRadius:"15px",
                        color:"#004E89",
                        // marginTop:"33vh",
                        // marginLeft:"3vw",
                        // position:"fixed",
                        width:'100%'

                    }}>
                        <h2
                        style={{
                            paddingTop:"2vh",
                            paddingBottom:"1vh",
                        }}>Most Liked Post</h2>
                        <div>
                            {layoutImages()}
                        </div>
                    </div>
                </div>
            </>
        )

}