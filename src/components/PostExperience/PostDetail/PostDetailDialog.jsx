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
    Skeleton,
} from '@mui/material';
import SamplePostMainImage from '../../../Assets/images/post-default-main-image.jpg'
import DatePicker, { DateObject } from "react-multi-date-picker";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeletePostDialog from '../DeletePostDialog';
import EditPostDialog from '../EditPost/EditPostDialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {makeStyles} from "@mui/styles";
import {AiOutlineClose} from "react-icons/ai";

const styles = makeStyles(theme => ({
    button:{
        width:"13vw",
        backgroundColor:"#EFEFD0",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#004E89",
        border:"solid 2px #004E89",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        // display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#004E89",
            color:"#EFEFD0"
        }
    },
    deleteButton:{
        width:"13vw",
        backgroundColor:"#EFEFD0",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#DE3733",
        border:"solid 2px #DE3733",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        // display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#DE3733",
            color:"#EFEFD0"
        }
    }
}))

const PostDetailDialog = (props) => {
    let slug = props.post_slug;
    let navigate = useNavigate();
    const classes = styles();
    const [openDelete, setOpenDelete] = useState(false);
    const [closeDelete, setCloseDelete] = useState(true);
    console.log("++++++++++++ THE POST SLUG IN PROPS IS +++++++++++ ", slug);
    const [scroll, setScroll] = React.useState('paper');
    const [postData, setPostData] = useState("");

    const [openEdit, setOpenEdit] = useState(false);
    const [closeEdit, setCloseEdit] = useState(true);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
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

    if(loading) {
        return (
            <>
                <Dialog
                    open={props.open}
                    onClose={handleClose}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth={'md'}
                >
                    <IconButton
                        edge="end"
                        onClick={handleClose}
                        size={"medium"}
                        sx={{ position: "absolute", top: "1rem", right: "2rem", color:"#004E89" }}
                    >
                    <AiOutlineClose />
                </IconButton>
                <DialogTitle id="scroll-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction={'column'} sx={{ flexGrow: 1 }}>
                        {/* Main Image */}
                        <Item>
                            <Skeleton variant="rounded" width={500} height={100} />
                        </Item>
                        {/* Title */}
                        <Item>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </Item>
                    </Stack>
                </DialogTitle>
                    
                <DialogContent dividers={scroll === 'paper'} dir='ltr'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <form dir='ltr'>
                            <Grid container rowSpacing={0.25} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <div style={{ paddingLeft: "2rem" }}>
                                    {/* Summary */}
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                            Summary
                                        </Typography>
                                        <Skeleton variant="rectangular" width={500} height={60} />
                                    </Grid>
                                    {/* Body */}
                                    <Grid item xs={12} sx={{ mt: "1rem" }}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                            Content
                                        </Typography>
                                        <Skeleton variant="rounded" width={500} height={60} />
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
                                            <Skeleton variant="rectangular" width={500} height={60} />
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </div>
                            </Grid>
                        </form>
                    </Grid>
                </DialogContent>

                
                </Dialog>
            </>
        )
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
                PaperProps={{ sx: {
                    borderRadius: "15px",
                    color:"#004E89",
                    boxShadow:"inset 0px 0px 0px 8px #004E89",
                    } }}
            >
                <IconButton
                    edge="end"
                    onClick={handleClose}
                    size={"medium"}
                    sx={{ position: "absolute", top: "1rem", right: "2rem", color:"#004E89" }}
                >
                <AiOutlineClose />
            </IconButton>
            <DialogTitle id="scroll-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction={'column'} sx={{ flexGrow: 1 }}>
                    {/* Main Image */}
                    <Item>
                        <img
                            variant="square"
                            src={postData.main_image_64 && postData.main_image_64 !== '' ? postData.main_image_64 : SamplePostMainImage} 
                            style={{
                                width: "60rem",
                                height: "16rem",
                                borderRadius: '0.25rem',
                                objectFit: 'fill',
                                marginTop: "2.5rem"
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
            </DialogTitle>
                
            <DialogContent dividers={scroll === 'paper'} dir='ltr'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form dir='ltr'>
                        <Grid container rowSpacing={0.25} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <div style={{ paddingLeft: "2rem" }}>
                                {/* Summary */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                        Summary
                                    </Typography>
                                    <Typography sx={{ paddingLeft: "0.8rem" }}>
                                        <div style={{wordBreak:"break-word"}}>
                                            <div style={{ color: '#004E89',
                                                paddingTop:"0.5rem",
                                                paddingBottom:"0.5rem",
                                                marginTop:"0.5rem",
                                                backgroundColor:"rgba(0,78,137,0.1)",
                                                fontWeight:"bold",
                                                border:"none",
                                                borderRadius:"15px", width:"58rem"}}>
                                                    <div style={{marginLeft:"0.5vw", marginRight:"0.5vw"}}>
                                                        {postData.description && postData.description !== "" ? postData.description : (<span> No summary was written </span>)}
                                                    </div>
                                            </div>
                                        </div>
                                    </Typography>
                                </Grid>
                                {/* Body */}
                                <Grid item xs={12} sx={{ mt: "1rem" }}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                                        Content
                                    </Typography>
                                    <div style={{wordBreak:"break-word"}}>
                                        <Box sx={{ display: "flex", alignItems: "center", alignContent: "center", color: '#004E89',
                                                    paddingTop:"0.5rem",
                                                    paddingBottom:"0.5rem",
                                                    marginTop:"0.5rem",
                                                    backgroundColor:"rgba(0,78,137,0.1)",
                                                    fontWeight:"bold",
                                                    border:"none",
                                                    borderRadius:"15px", width: "59rem"}}>
                                            <FormControl>
                                                <div style={{marginLeft:"0.5vw", marginRight:"0.5vw"}}>
                                                    <ReactQuill theme="bubble" 
                                                                value={postData.json_data} 
                                                                readOnly={true}
                                                                // style={{ width: "65rem" }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </Box>
                                    </div>
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
                    <Button sx={{
                            width:"13vw",
                            backgroundColor:"#EFEFD0",
                            backgroundPosition:"right bottom",
                            fontWeight:"bold",
                            color:"#DE3733",
                            border:"solid 2px #DE3733",
                            borderRadius:"15px",
                            transition:"all 0.15s ease-out",
                            // display:"block",
                            backgroundSize:"200% 100%",
                            "&:hover":{
                                backgroundPosition:"left bottom",
                                backgroundColor:"#DE3733",
                                color:"#EFEFD0"
                            }
                        }}
                        startIcon={<DeleteIcon />} sx={{mr: "1rem", mb: "1rem"}}
                        onClick={() => {
                                    console.log("---------- CLICK ON DELETE POST ---------");
                                    setOpenDelete(true);
                                    setCloseDelete(false);
                                }}>
                                Delete
                    </Button>
                </Item>
                <Item>
                    <Button
                        sx={{ mr: "3rem", mb: "1rem" }}
                        sx={{
                            width:"13vw",
                            backgroundColor:"#EFEFD0",
                            backgroundPosition:"right bottom",
                            fontWeight:"bold",
                            color:"#004E89",
                            border:"solid 2px #004E89",
                            borderRadius:"15px",
                            transition:"all 0.15s ease-out",
                            // display:"block",
                            backgroundSize:"200% 100%",
                            "&:hover":{
                                backgroundPosition:"left bottom",
                                backgroundColor:"#004E89",
                                color:"#EFEFD0"
                            }
                        }}
                        startIcon={<EditIcon />}
                        // onClick={() => handleEditClick(postData.uid, postData.slug)}
                        onClick={() => {
                            setOpenEdit(true);
                            setCloseEdit(false);
                        }}
                        >
                        Edit
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
        <EditPostDialog
            post_slug={postData.slug}
            post_id={postData.uid}
            post={postData}
            open={openEdit}
            setOpen={setOpenEdit}
            closePost={handleClose}
            close={closeEdit}
            setClose={setCloseEdit}
        />
        </div>
    )
}

export default PostDetailDialog
