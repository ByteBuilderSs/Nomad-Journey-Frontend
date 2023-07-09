import React, { useEffect, useState } from 'react';
import {Box, Divider, IconButton, Rating, Stack, Typography,Grid,Button,Container, InputAdornment, TextField, FormControl} from "@mui/material";
import {Item} from "semantic-ui-react";
import Highlighter from "react-highlight-words";
import "../UserPanel/RightBar/MyAnnouncement.css";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import axios from "axios";
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import notfound from '../../lottieAssets/9341-not-found.json';
import Lottie from 'react-lottie';
import {useCounter, useCounterActions} from "../../Context/CounterProvider";
import SetLikeOfBlog from "./LikePost/SetLike";
import PostLikers from "./likerOfPost";
import { FcSearch } from "react-icons/fc";
import SearchIcon from "@mui/icons-material/Search";
import {useSearchBlog} from '../../hooks/useSearchBlog'
import './generalPost.css'
import {Col, Row} from "react-bootstrap";
import MostLikedPost from "./mostLikedPost";
import YouMightLike from './youMightLike';
import { useAllposts } from '../../hooks/useAllposts'; 

export default function UsersPosts()
{
    // const NotFound = () => {

    //     const defaultOptions = {
    //       loop: true,
    //       autoplay: true,
    //       animationData: notfound,
    //       rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //       }
    //     };
      
    //     return(
    //       <div class="col-lg-12">
    //         <Lottie 
    //           options={defaultOptions}
    //           height={300}
    //           width={420}
    //         />
    //       </div>
    //     )
    // }

    const [open_liker, setOpen_liker] = useState(false);
    const [close_liker, setClose_liker] = useState(true);
    const [blog_id, setBlog_id] = useState(null);

    
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const counter = useCounter();
    const setCounter = useCounterActions();

    const [resault,setResault]=useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [active,setActive]=useState(true)
    

    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/api/v1/blog/posts/`)
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
    
    useEffect(()=>{setResault(blogs.data)},[blogs])

    const handleChange = (event) => {
    setSearchTerm(event.target.value)
        if(searchTerm.length>=3)
        {
        setActive(false)
        }else{
        setActive(active)
    }};

    const {searchBlogs,searchRes}=useSearchBlog()
    const handelClick=(event)=>
    {
        event.preventDefault();

        searchBlogs(searchTerm);
        
        setResault(searchRes)
        
      
    }
//-----------------------------------------------------------------
   

    
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
            <Row>
                <Col md={3} >
                <div style={{position:'relative'}}>
                <Grid
                        container
                        id="most-liked"
                        
                        sx={{
                            alignItems:'center',
                            justifyContent:'center',
                            display:'flex',
                            width: '25%',
                            marginLeft:"3vw",
                            marginBottom:"1rem",
                            backgroundColor:'transparent',
                            borderRadius:'15px',
                            flexDirection:'column',
                            marginTop:'2rem',
                            position:'fixed'
                        }}>

                    
                    <Grid item sx={{width:'100%',minWidth:'100%',display:'flex',minHeight:'40vh',maxHeight:'60vh',marginTop:'5rem',flexDirection:'column'}}>
                        <MostLikedPost/>
                    </Grid>
                   
                    
                </Grid>
                </div>
                </Col>
                <Col md={6} id='posts'>
                    <Grid
                        container
                        id="box contariner"
                        
                        sx={{
                            alignItems:'center',
                            justifyContent:'center',
                            display:'flex',
                            width: '100%',
                            marginLeft:"3vw",
                            marginBottom:"1rem",
                            backgroundColor:'transparent',
                            borderRadius:'15px',
                            flexDirection:'column',
                            marginTop:'2rem'
                        }}>

                       

                
                {resault && 
                    resault.map((blog, key) => (
                        <Grid item className="blogs-hovering"
                                sx={{
                                    backgroundColor:'white',
                                    border:'2px solid #D5D8DD',
                                    borderRadius:'15px',
                                    maxWidth:'100%',
                                    width:'100%',
                                    minHeight:'80vh',
                                    maxHeight:'84vh',
                                    margin:'0.3rem',
                                    position:'relative'
                                    }}>
                                   <Grid item sx={{margin:'1rem',display:'flex',flexDirection:'row'}}>
                                        <UserProfile user_id={blog.host_id} first_name={blog.author_name} imageSize={50} profileSize={`4rem`}/> 
                                        <Typography variant='h6' sx={{margin:'1rem'}}>{blog.author_name}
                                        </Typography>
                                   </Grid>  
                                    <Grid item sx={{margin:'1rem',display:'flex',flexDirection:'column'}}>
                                        <Typography variant='body1'>{blog.blog_title}</Typography>
                                        <Typography variant='overline'>{blog.description}</Typography>
                                    </Grid>
                                                           
                                    <Grid item sx={{justifyContent:'center',display:'flex',margin:'auto',
                                            maxHeight:'50vh',maxWidth:'50vh',minWidth:'37vh',minHeight:'37vh',top:'0px',left:"0px"}}>
                                                 {blog.main_image_64!=null ?
                                                    <>
                                                    <img src={blog.main_image_64}
                                                        style={{maxHeight:'50vh',maxWidth:'100%',minWidth:'100%',minHeight:'50vh',
                                                        borderRadius:'15px'
                                                        }}
                                                        />
                                                    </>
                                                    :
                                                    null
                                                    }
                                                   
                                    </Grid>
                                    <Grid sx={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
                                    {blog.is_liked.includes(user_id)?
                                                <><SetLikeOfBlog blog_id={blog.uid} Isfill={true} num={blog.num_likes}/></>
                                                :
                                                <><SetLikeOfBlog blog_id={blog.uid} isFill={false} num={blog.num_likes}/></>
                                        }
                                       
                                    </Grid>
                                    
                                        
                                        
                                        
                                        <Rating sx={{color:"#e45505",position:"absolute",bottom:'0px',left:'0px',margin:'0.5rem'}} name="read-only" value={blog.average_rate} readOnly precision={0.1} />
                                        <Typography variant='caption' sx={{margin:'0.4rem',bottom:'0px',right:'0px',position:'absolute'}}>{post_createdAt(blog.created_at)}</Typography>
                                        
                        </Grid>))}
                    </Grid>
                </Col>
                <Col md={2}>
                <div style={{position:'relative'}}>
                <Grid
                        container
                        id="most-liked"
                        
                        sx={{
                            alignItems:'center',
                            justifyContent:'center',
                            display:'flex',
                            width: '20%',
                            marginLeft:"3vw",
                            marginBottom:"1rem",
                            backgroundColor:'transparent',
                            borderRadius:'15px',
                            flexDirection:'column',
                            marginTop:'2rem',
                            position:'fixed'
                        }}>
                        <Grid item id='search'
                        sx={{width:'100%'
                        
                        ,minWidth:'100%',position:'absolute',display:'flex',top:'0px',
                        minHeight:'5vh',maxHeight:'5vh',
                        borderRadius:'15px',
                        margin:'0.3rem'}}>

                        <FormControl fullWidth>
                        <TextField
                        type="search"
                        placeholder='search here..'
                        value={searchTerm}
                        onChange={handleChange}
                        autoFocus 
                        autoComplete='off'
                        
                        InputProps={{
                        style:{borderRadius:'25px',backgroundColor:'#D5D8DD',border:'1px solid #004E89'},
                          startAdornment: (
                        <InputAdornment position='start' >
                          <IconButton disabled={active} onClick={handelClick} >
                            {active?<SearchIcon style={{fill:'gray'}}/>:<SearchIcon style={{fill:'blue'}}/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                        }}/>
                    
                        </FormControl>

                        </Grid>
                        
                        <Grid item sx={{width:'100%',minWidth:'100%',display:'flex',minHeight:'60vh',marginTop:'5rem',flexDirection:'column'}}>
                            <YouMightLike/>
                        </Grid>
                </Grid>
                
                </div>
                </Col>
            </Row>


            {checkNotNull()}
            {() => setBlog_id(null)}

        </>
    )

}