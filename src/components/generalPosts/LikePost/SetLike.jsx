import React, { useEffect, useState } from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";
import {IconButton, Typography,Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import { useLikePost } from '../../../hooks/useLikePost';
import '../generalPostsTab.css'
import PostLikers from '../likerOfPost';

const useStyles = makeStyles(theme => (
    {
        likeButton:{
            "&:hover":{
                color:"rgba(0,78,137,1)",
                backgroundColor:"rgba(228,85,5,0.1)"
            }
        },
        likeButtonActive:{
            color:"rgba(0,78,137,1)",
            "&:hover":{
                backgroundColor:"rgba(228,85,5,0.1)"

            }
        }

    }
));


export default function SetLikeOfBlog(props)
{
    const [open_liker, setOpen_liker] = useState(false);
    const [close_liker, setClose_liker] = useState(true);
    const [blog_id, setBlog_id] = useState(null);

    const setCounter = useCounterActions();
    const counter = useCounter();

    const classes = useStyles();
    
    const[like,setLike]=useState(props.Isfill)
    const [count,setCount]=useState(props.num)
    const {likepost,unlikepost}=useLikePost()
    const onSubmit =  () => {
        if(!like)
        {
            likepost(props.blog_id);
            // setCounter(counter+1)
            setCount(count+1)
        }
        else
        {
            unlikepost(props.blog_id)
            setCount(count-1)
            // setCounter(counter-1)

        }
        
    }
    const showModal=()=>
    {
        if(blog_id != null)
                return(
                    <>
                        <PostLikers
                            blog_id={props.blog_id}
                            setBlog_id={setBlog_id}
                            close={close_liker}
                            setClose={setClose_liker}
                            open={open_liker}
                            setOpen={setOpen_liker}
                        />
                    </>)
    }
    

    return(
        
        <>
            
            
            <IconButton  onClick={()=>{onSubmit();setLike(!like)}}>
                {like?<AiFillHeart className={classes.likeButtonActive}/>:<AiOutlineHeart className={classes.likeButton}/>}
                
            </IconButton>
            <Grid className="likes"
                sx={{marginTop:'0.6rem'}}
                onClick={()=>{
                    setOpen_liker(true);
                    setClose_liker(false);
                    setBlog_id(props.blog_id)
                }}
                >
                    {count > 0 ? count : null}
            </Grid>
         {showModal()}
         {()=>setBlog_id(null)}
        </>
    )
}
