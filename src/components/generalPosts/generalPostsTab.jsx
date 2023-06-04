import React, { useEffect, useState } from 'react';
import {Box, Divider, IconButton, Rating, Stack, Typography,Grid,Button} from "@mui/material";
import {Item} from "semantic-ui-react";
import LetteredAvatar from "react-lettered-avatar";
import "../UserPanel/RightBar/MyAnnouncement.css";
import "./generalPostsTab.css";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import axios from "axios";
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import notfound from '../../lottieAssets/9341-not-found.json';
import Lottie from 'react-lottie';
import {toast} from "react-toastify";
import {useCounter, useCounterActions} from "../../Context/CounterProvider";
import SetLikeOfBlog from "./LikePost/SetLike";
import RemoveLikeOfBlog from "./LikePost/RemoveLike";
import PostLikers from "./likerOfPost";
import SearchBar from './SearchBar'
import { FcSearch } from "react-icons/fc";

export default function UsersPosts()
{
    const [open_liker, setOpen_liker] = useState(false);
    const [close_liker, setClose_liker] = useState(true);
    const [blog_id, setBlog_id] = useState(null);

    const NotFound = () => {

        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: notfound,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
        };
      
        return(
          <div class="col-lg-12">
            <Lottie 
              options={defaultOptions}
              height={300}
              width={420}
            />
          </div>
        )
    }
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const counter = useCounter();
    const setCounter = useCounterActions();

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
    }, [counter]);
    let user_id;

    if (localStorage.getItem('tokens'))
    {
        const allData = JSON.parse(localStorage.getItem('tokens'));
        user_id = allData.user_id;
    }
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
    const checkNotNull = () => {
        if(blog_id != null)
            return(
                <>
                    <PostLikers
                        blog_id={blog_id}
                        setBlog_id={setBlog_id}
                        close={close_liker}
                        setClose={setClose_liker}
                        open={open_liker}
                        setOpen={setOpen_liker}
                    />
                </>
            )
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
                        width: 1/2,
                        backgroundColor:"#ffffff",
                        position:'relative'
                    }}>

                <SearchBar />
                <Stack sx={{marginTop:'3rem'}}>
                
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
                                                <Grid item sx={{marginRight:'50px'}}>
                                                    {blog.main_image_64!=null ?
                                                    <>
                                                    <img src={blog.main_image_64}
                                                        style={{borderRadius:"5%",
                                                        border:"solid",
                                                            borderWidth:"thin",
                                                            borderColor:"#b2b2b2"
                                                        }}
                                                        width="92%" />
                                                    </>
                                                    :
                                                    <Grid  container alignItems='center' direction='column' justifyContent="center">
                                                        <Item>
                                                            <NotFound/> 
                                                        </Item>
                                                    </Grid>
                                                    }
                                                    
                                                </Grid>
                                            </Stack>
                                        </Item>
                                        <Item>
                                            <Box display="flex"
                                                 justifyContent="center"
                                                 alignItems="center"
                                                 sx={{ width: 1,
                                                    marginTop:"1rem"}}>
                                                {!blog.is_liked.includes(user_id)
                                                    && <SetLikeOfBlog blog_id={blog.uid} />}
                                                {blog.is_liked.includes(user_id)
                                                    && <RemoveLikeOfBlog blog_id={blog.uid} user={user_id} />}

                                                <div className="likes"
                                                    onClick={()=>{
                                                        setOpen_liker(true);
                                                        setClose_liker(false);
                                                        setBlog_id(blog.uid);
                                                    }
                                                    }>
                                                    {blog.num_likes > 0 ? blog.num_likes : null}
                                                </div>

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

            {checkNotNull()}
            {() => setBlog_id(null)}

        </>
    )

}