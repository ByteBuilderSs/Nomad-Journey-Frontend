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
    DialogTitle, Divider, IconButton,
} from "@mui/material";
import {Item} from "semantic-ui-react";
import "../UserPanel/RightBar/MyAnnouncement.css";
import UserProfile from "../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement";
import {useCounter} from "../../Context/CounterProvider";
import {Col, Row} from "react-bootstrap";
import {AiOutlineClose} from "react-icons/ai";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "15%",
    height: "50%",
    bgcolor: '#EDE7E6FF',
    boxShadow: 24,
    overflow: "hidden"
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

    return(
        <>
            <Modal open={props.open} onClose={handleClose} >
                <Box sx={{...style}}>
                    <Row style={{marginTop:"1rem", marginBottom:"0.5rem"}}>
                            <Col md={9}>
                                <h1> Likes </h1>
                            </Col>
                            <Col md={3}>
                                <IconButton onClick={handleClose}>
                                    <AiOutlineClose />
                                </IconButton>
                            </Col>
                    </Row>
                    <Divider sx={{ borderBottomWidth: 2, width: "100%"}} />
                    <Stack>
                        {likers.map((item, key) => (
                            <>
                                <div className="announcement-hovering">
                                    <div style={{
                                        marginLeft:"1rem", paddingTop:"1rem", paddingBottom:"1rem"}}>
                                <Item>
                                    <Stack direction={`row`} sx={{
                                        display:"flex",
                                        alignItems:"center"
                                    }} spacing={1}>
                                        <Item>
                                            <UserProfile user_id={item.id} first_name={item.first_name} imageSize={37.5} profileSize={`3rem`}/>
                                        </Item>
                                        <Item>
                                            {item.first_name} {item.last_name}
                                        </Item>
                                    </Stack>
                                </Item>
                                </div>
                                </div>
                                <Divider sx={{ borderBottomWidth: 1, width: "100%"}} />
                            </>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
