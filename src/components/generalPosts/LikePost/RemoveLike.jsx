import React, { useEffect, useState } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
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
export default function RemoveLikeOfBlog(props)
{
    const classes = useStyles();
    
    const[like,setLike]=useState(false)
    const{unlikepost}=useLikePost()

    const onSubmit =() => {
       
        unlikepost(props.blog_id)
    }
  
    return(
        <>
            <IconButton className={like?classes.likeButtonActive:classes.likeButton} onClick={()=>{onSubmit();setLike(!like)}}>
                <AiFillHeart />
            </IconButton>
        </>
    )
}