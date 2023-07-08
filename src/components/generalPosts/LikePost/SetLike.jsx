import React, { useEffect, useState } from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";
import {IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import { useLikePost } from '../../../hooks/useLikePost';


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
    const setCounter = useCounterActions();
    const counter = useCounter();

    const classes = useStyles();
    
    const[like,setLike]=useState(props.Isfill)

    const {likepost,unlikepost}=useLikePost()
    const onSubmit =  () => {
        if(!like)
        {
            likepost(props.blog_id);
            setCounter(counter+1)
        }
        else
        {
            unlikepost(props.blog_id)
            setCounter(counter-1)

        }
        
    }
   
    

    return(
        
        <>
            
            
            <IconButton  onClick={()=>{onSubmit();setLike(!like)}}>
                {like?<AiFillHeart className={classes.likeButtonActive}/>:<AiOutlineHeart className={classes.likeButton}/>}
            </IconButton>
            
         
        </>
    )
}
