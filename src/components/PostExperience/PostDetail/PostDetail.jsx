import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { toast } from "react-toastify";
import './PostDetail.css';
import {
    Grid,
    FormControl,
    Button,
    Stack,
    Card,
    Typography,
    Container,
    Chip,
    Box,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DatePicker, { DateObject } from "react-multi-date-picker";

const PostDetail = (props) => {
    let allData;
    let access_token;
    if (localStorage.getItem('tokens'))
    {
        allData = JSON.parse(localStorage.getItem('tokens'));
        access_token = allData.access;
    }
    let {slug } = useParams();
    console.log("************** The slug is **************** ", slug);
    const [postData, setPostData] = useState("");

    const loadPost = async () => {
        console.log("In load post request");
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/v1/blog/post/${slug}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            if (result.data.created_at) {
                let time = new Date(result.data.created_at);
                result.data.created_at = new DateObject({
                    date: time,
                    format: "YYYY/MM/DD,   HH:MM:SS"
                }).format("YYYY/MM/DD, HH:MM:SS");
            }
            if (result.data.updated_at) {
                let time = new Date(result.data.updated_at);
                result.data.updated_at = new DateObject({
                    date: time,
                    format: "YYYY/MM/DD,   HH:MM:SS"
                }).format("YYYY/MM/DD, HH:MM:SS");
            }
            setPostData(result.data);
            console.log("********** The result is ******** ", result.data);
        }).catch((error) => {
            toast.error("Something went wrong while fetching post.");
        })
    }
    
    useEffect(() => {
        loadPost();
    }, []);

    
    return (
        <div className='post-detail'>
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card dir='ltr'>
                        <form>
                        
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <div style={{ paddingLeft: "5rem" }}>
                                    {/* Title */}
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                            <Item>
                                                <Typography sx={{ fontSize: "2rem" }} gutterBottom>
                                                    {postData.blog_title}
                                                </Typography>
                                            </Item>
                                        </Stack>
                                    </Grid>
                                    <Divider sx={{ borderBottomWidth: 3, width: "150rem"}} />                                    {/* Body */}
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                            <Item>
                                                <FormControl>
                                                    <ReactQuill theme="bubble" 
                                                                value={postData.json_data} 
                                                                readOnly={true}
                                                    />
                                                </FormControl>
                                            </Item>
                                        </Stack>
                                    </Grid>
                                    {/* Tags */}
                                    <Grid item xs={12}>
                                        <Box sx={{ mt: "0.75rem" }}>
                                            <Typography
                                            sx={{ marginTop: "1rem", fontSize: 14, display: "flex", alignItems: "center", fontWeight: "bold" }}
                                            variant="h1"
                                            component="div"
                                            >
                                            Tags:
                                                <Stack direction="row" 
                                                    useFlexGap 
                                                    flexWrap="wrap"
                                                    spacing={1} 
                                                    sx={{ ml: "1rem", '& > *': { flexGrow: 1 } }}>
                                                {
                                                    postData.tags_name && 
                                                    postData.tags_name.map((tag_name) => (
                                                        <Chip label={tag_name} color="primary" variant="outlined"/>
                                                    ))
                                                }
                                                </Stack>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    {/* Buttons */}
                                    <Grid item xl={6} lg={6} md={4} sm={12} xs={12}>
                                        <Stack 
                                            direction="row" 
                                            spacing={1}
                                            sx={{ ml: "1rem", mt: "3rem", mb: "1rem", display: "flex", alignItems: "center" }}
                                            >
                                            <Item>
                                                <Button
                                                    sx={{ width: "12rem" }}
                                                    variant="contained"
                                                    component="label"
                                                    startIcon={<EditIcon />}
                                                    >
                                                    Edit Your Post
                                                </Button>
                                            </Item>
                                            <Item>
                                                <Button
                                                    sx={{ width: "15rem" }}
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    >
                                                    Delete Your Post
                                                </Button>
                                            </Item>
                                            <Item>
                                                <Typography sx={{ display: "flex", alignItems: "center", ml: "16rem" }} color="text.secondary">Created at {postData.created_at}</Typography>
                                            </Item>
                                            <Item>
                                                <Typography sx={{ display: "flex", alignItems: "center" }} color="text.secondary">Edited at {postData.updated_at}</Typography>
                                            </Item>
                                        </Stack>
                                    </Grid>
                                </div>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Container>
        </div>
    )
}

export default PostDetail
