import React, { useEffect, useState } from 'react';
import {Box, Divider, IconButton, Rating, Stack, Typography} from "@mui/material";
import {Item} from "semantic-ui-react";
import LetteredAvatar from "react-lettered-avatar";
import "../UserPanel/RightBar/MyAnnouncement.css";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";

const useStyles = makeStyles(theme => (
    {
        likeButton:{
            "&:hover":{
                color:"#e45505",
                backgroundColor:"rgba(228,85,5,0.1)"
            }
        },
        likeButtonActive:{
                color:"#e45505",
            "&:hover":{
                    backgroundColor:"rgba(228,85,5,0.1)"

            }

        }

    }
));

export default function UsersPosts()
{
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect( () =>
    {
        axios(`http://188.121.102.52:8000/api/v1/blog/posts/`)
            .then((data) => {
                setBlogs(data.data)})
            .catch(error =>
            {
            })
            .finally( () => {
                setLoading(false);
                console.log(blogs);
            })
    }, []);
    const classes = useStyles();
    const post_createdAt = (time) => {
        const created_at = new Date(time);
        const diffDate = new Date() - created_at;
        let diffDays = Math.floor(diffDate / 86400000); // days
        let diffHrs = Math.floor((diffDate % 86400000) / 3600000); // hours
        let diffMins = Math.round(((diffDate % 86400000) % 3600000) / 60000);
        if(diffMins < 60)
            return(
                <>
                    {diffMins}m
                    </>)
        if(diffHrs < 24)
            return(
                <>
                    {diffHrs}h
                </>)
        return(
                <>
                    {diffDays}d
                </>)

    }
    if(!loading)
        return(
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                 sx={{
                width: 1,
                     marginBottom:"1rem"
            }}>
                <Box
                    sx={{
                        width: 1/3,
                        backgroundColor:"#ffffff"
                    }}>
                <Stack>
                {
                    blogs.data.map((blog, key) => (
                        <Item>
                                <div className="announcement-hovering">
                                    <div style={{
                                        paddingTop:"2rem", paddingBottom:"1rem"}}>
                                    <Stack sx={{
                                        marginLeft:"1rem",
                                    }} spacing={1}>
                                        <Item>
                                            <Stack direction={`row`} spacing={1}
                                                   sx={{
                                                       display:"flex",
                                                       alignItems:"center"
                                                   }}>
                                                <Item>
                                                    <UserProfile user_id={blog.host_id} first_name={blog.host_name} imageSize={50} profileSize={`4rem`}/>
                                                </Item>
                                                <Item>
                                                    <Typography component="h5"
                                                                style={{fontSize:"1.25vw" }}>
                                                            <span>
                                                                {blog.host_name}
                                                            </span>
                                                    </Typography>
                                                </Item>
                                                <Item>
                                                    <Typography component="h5"
                                                                style={{fontSize:"0.8vw" }}>
                                                            <span style={{color:"#6b6767"}}>
                                                                {post_createdAt(blog.created_at)}
                                                            </span>
                                                    </Typography>
                                                </Item>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <Stack sx={{
                                                marginLeft:"3rem"
                                            }}>
                                                <Item>
                                                    <Typography component="h5"
                                                                style={{fontSize:"1.25vw" }}>
                                                            <span>
                                                                {blog.blog_title}
                                                            </span>
                                                        <span style={{
                                                            float:"right",
                                                            marginRight:"5rem"
                                                        }}>
                                                                <Rating sx={{
                                                                    color:"#e45505"
                                                                }} name="read-only" value={3} readOnly precision={0.1} />
                                                            </span>
                                                    </Typography>
                                                </Item>
                                                <Item>
                                                    <Box sx={{
                                                        wordBreak:"break-word",
                                                        width:"92%",
                                                        marginBottom:"1rem"
                                                    }}>
                                                        <Typography component="h5"
                                                                    style={{fontSize:"0.75vw" }}>
                                                            <span>
                                                            {blog.description}
                                                            </span>
                                                        </Typography>
                                                    </Box>
                                                </Item>
                                                <Item>
                                                    <img src={`https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/54/cd/c1/caption.jpg?w=500&h=300&s=1`}
                                                        style={{borderRadius:"5%",
                                                        border:"solid",
                                                            borderWidth:"thin",
                                                            borderColor:"#b2b2b2"
                                                        }}
                                                        width="92%" />
                                                </Item>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <Box display="flex"
                                                 justifyContent="center"
                                                 alignItems="center"
                                                 sx={{ width: 1,
                                                    marginTop:"1rem"}}>
                                                86 Likes
                                                <IconButton className={classes.likeButtonActive}>
                                                    <AiFillHeart />
                                                </IconButton>
                                            </Box>
                                        </Item>
                                    </Stack>
                                    </div>
                                </div>
                            <Divider sx={{ borderBottomWidth: 1, width: "100%"}} />
                        </Item>
                    ))
                }
                </Stack>
                </Box>

            </Box>

        </>
    )

}