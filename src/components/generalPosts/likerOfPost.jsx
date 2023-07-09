import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Modal,
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    Skeleton,
    DialogTitle, Divider, IconButton,
    ListItemIcon,
    Tooltip,
} from "@mui/material";
import {Item} from "semantic-ui-react";
import './generalPost.css'
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import {useCounter} from "../../Context/CounterProvider";
import {Col, Row} from "react-bootstrap";
import {AiOutlineClose} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./likerOfPost.css";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "20%",
    maxHeight: "45%",
    bgcolor: '#FFFFFF',
    color:"#004E89",
    borderRadius:"15px",
    overflow: "scroll"
};
export default function PostLikers(props)
{
    const [likers, setLikers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const counter = useCounter();
    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
        props.setBlog_id(null);
    }
    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/api/v1/like_post/get-likers/${props.blog_id}`)
            .then((data) => {
                setLikers(data.data)})
            .catch(error =>
            {
                console.error("error fetching data:", error);
                setError(error);
            })
            .finally( () => {
                console.log(likers);
                setLoading(false);
            })
    }, [counter]);

    const navigate=useNavigate()
    const handelViewProf=(username)=>
    {
        navigate(`/home/Profile/${username}/`)
    }
    const loadArray = [1,2,3,4,5]
    if(loading)
        return (<>

            <Modal open={true} >
                <Box sx={{...style}}>

                    {/*<div style={{position:"relative"}}>*/}
                    <h3
                        style={{
                            paddingTop:"2vh",
                            paddingBottom:"1vh",
                            paddingLeft:"1vw",
                            fontSize:"135%",
                            // position:"fixed",
                            fontWeight:"bold",
                            backgroundColor:"#FFFFFF",
                            width:"100%"
                        }}>
                            <span style={{paddingTop:"1vh"}}>
                            Who likes this
                        </span>
                    </h3>
                    {/*</div>*/}
                    <div>
                        {loadArray.map((item, key) => (
                                <div key={key} style={{
                                    paddingTop: "1vh",
                                    paddingBottom: "1vh",
                                }}
                                     onClick={() => {handelViewProf(item.username)}}>
                                    <Stack direction={`row`} sx={{
                                        display:"flex",
                                        alignItems:"center",
                                        paddingLeft:"1vw",
                                        paddingRight:"1vw",
                                    }}
                                           spacing={1}>
                                        <Item>
                                            <Skeleton variant="circular" width={40} height={40} />
                                        </Item>
                                        <Item>
                                            <Typography style={{fontSize:"120%"}}>
                                                <Stack spacing={1}>
                                                    <Item>
                                                        <Skeleton variant="rounded" width={120} height={9} />
                                                    </Item>
                                                    <Item>
                                                        <Skeleton variant="rounded" width={70} height={5} />
                                                    </Item>
                                                </Stack>
                                            </Typography>
                                        </Item>
                                    </Stack>
                                </div>
                            )
                        )}
                    </div>
                </Box>
            </Modal>

            </>)
    return(
        <>
            <Modal open={props.open} onClose={handleClose} >
                <Box sx={{...style}}>

                    {/*<div style={{position:"relative"}}>*/}
                        <h3
                            style={{
                                paddingTop:"2vh",
                                paddingBottom:"1vh",
                                paddingLeft:"1vw",
                                fontSize:"135%",
                                // position:"fixed",
                                fontWeight:"bold",
                                backgroundColor:"#FFFFFF",
                                width:"100%"
                            }}>
                            <span style={{paddingTop:"1vh"}}>
                            Who likes this
                        </span>
                            <IconButton
                                edge="end"
                                onClick={handleClose}
                                size={"medium"}
                                sx={{ position: "absolute", right: "1.5vw", top : "0.25vh", color:"#004E89" }}
                            >
                                <AiOutlineClose />
                            </IconButton>
                        </h3>
                    {/*</div>*/}
                    <div>
                        {likers.map((item, key) => (
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
                                             <UserProfile user_id={item.id} first_name={item.first_name} imageSize={37.5} profileSize={`3rem`}/>
                                        </Item>
                                        <Item>
                                            <Typography style={{fontSize:"120%"}}>
                                                {item.first_name} {item.last_name}
                                                <p style={{marginTop:"-0.25rem" ,fontSize:"70%",
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
                </Box>
            </Modal>
        </>
    )
}
