import React, { useEffect, useState } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";
import {IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => (
    {
        likeButton:{
            "&:hover":{
                color:"#e45505",
                backgroundColor:"rgba(228,85,5,0.1)"
            }
        }

    }
));
export default function SetLikeOfBlog({blog_id})
{
    const classes = useStyles();
    const counter = useCounter();
    const setCounter = useCounterActions();
    let access_token = "";

    if (localStorage.getItem('tokens'))
    {
        const allData = JSON.parse(localStorage.getItem('tokens'));
        access_token = allData.access;
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: `http://188.121.102.52:8000/api/v1/like_post/create-like/${blog_id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        }).then((res) => {
            console.log(res);
            setCounter(counter + 1);
        }).catch((error) => {
            console.log(error);
        })
    }
    return(
        <>
            <IconButton className={classes.likeButton} onClick={onSubmit}>
                <AiOutlineHeart />
            </IconButton>
        </>
    )
}
