import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { toast } from "react-toastify";
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import SamplePostMainImage from '../../../Assets/images/post-default-main-image.jpg'
import DatePicker, { DateObject } from "react-multi-date-picker";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeletePostDialog from '../DeletePostDialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PostDetailDialog = (props) => {
    let slug = props.post_slug;
    let navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);
    const [closeDelete, setCloseDelete] = useState(true);
    console.log("++++++++++++ THE POST SLUG IN PROPS IS +++++++++++ ", slug);
    const [scroll, setScroll] = React.useState('paper');
    const [postData, setPostData] = useState("");

    const loadPost = async () => {
        console.log("In load post request");
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/api/v1/blog/post/${slug}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.access_token}`
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

    const handleClickOpen = (scrollType) => () => {
        props.setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        props.setOpen(false);
        props.set_post_slug(null);
    }

    const handleEditClick = (uid, slug) => 
    {
        navigate(`/home/PostExperience/Edit/${uid}/${slug}`);
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth={'md'}
                PaperProps={{ sx: { borderRadius: "15px" } }}
            >
            <DialogTitle id="scroll-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction={'column'} sx={{ flexGrow: 1 }}>
                    {/* Main Image */}
                    <Item>
                        <img
                            variant="square"
                            src={postData.main_image_64 && postData.main_image_64 !== '' ? postData.main_image_64 : SamplePostMainImage} 
                            style={{
                                width: "60rem",
                                height: "20rem",
                                borderRadius: '0.25rem',
                                objectFit: 'fill',
                                marginTop: "2rem"
                            }}
                        />
                    </Item>
                    {/* Title */}
                    <Item>
                        <Typography sx={{ fontSize: "2rem", mt: "0.25rem" }}>
                            {postData.blog_title}
                        </Typography>
                    </Item>
                </Stack>
                <IconButton aria-label="close" sx={{ position: 'absolute', top: -1, right: -1 }} onClick={handleClose}>
                    <HighlightOffIcon fontSize='large' />
                </IconButton>
            </DialogTitle>
                
            <DialogContent dividers={scroll === 'paper'} dir='ltr'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form dir='ltr'>
                        <Grid container rowSpacing={0.25} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <div style={{ paddingLeft: "0.75rem" }}>
                                {/* Summary */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                        Summary
                                    </Typography>
                                    <Typography sx={{ paddingLeft: "0.8rem" }}>
                                        {postData.description}
                                    </Typography>
                                </Grid>
                                {/* Body */}
                                <Grid item xs={12} sx={{ mt: "1rem" }}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                        Content
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", alignContent: "center", width: "62rem"}}>
                                        <FormControl>
                                            <ReactQuill theme="bubble" 
                                                        value={postData.json_data} 
                                                        readOnly={true}
                                                        // style={{ width: "65rem" }}
                                            />
                                        </FormControl>
                                    </Box>
                                </Grid>
                                {/* Tags */}
                                <Grid item xs={12}>
                                    <Box sx={{ mt: "0.75rem", mb: "1rem" }}>
                                        <Typography
                                            sx={{ marginTop: "1rem", fontSize: 20, display: "flex", alignItems: "center", fontWeight: "bold" }}
                                            variant="h1"
                                            component="div"
                                        >
                                        Tags
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
                            </div>
                        </Grid>
                    </form>
                </Grid>
            </DialogContent>
            {
                props.url_username === props.local_storage_username ? 
                <DialogActions>
                <Item>
                    <Button
                        sx={{ width: "100%" }}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        /* TODO */
                        onClick={() => {
                                    console.log("---------- CLICK ON DELETE POST ---------");
                                    setOpenDelete(true);
                                    setCloseDelete(false);
                                }}
                        >
                        Delete Your Post
                        
                    </Button>
                </Item>
                <Item>
                    <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        component="label"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(postData.uid, postData.slug)}
                        >
                        Edit Your Post
                    </Button>
                </Item>
                </DialogActions>
                : null
            }
            
        </Dialog>
        <DeletePostDialog 
            post_id={postData.uid}
            post_title={postData.blog_title}
            post={postData}
            open={openDelete}
            setOpen={setOpenDelete}
            closePost={handleClose}
            close={closeDelete}
            setClose={setCloseDelete}
        />
        </div>
    )
}

export default PostDetailDialog
