import * as React from 'react';
import { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
  Tooltip,
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import 'react-quill/dist/quill.bubble.css';
import './MyPosts.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { CgDetailsMore } from "react-icons/cg";
import { blue, deepOrange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AiFillDelete, AiFillLike, AiFillEdit } from "react-icons/ai";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { FcList, FcHighPriority } from "react-icons/fc";
import {BsCalendarDateFill, BsFillEyeFill} from "react-icons/bs";
import { toast } from 'react-toastify';
import { DateObject } from "react-multi-date-picker";
import {Item} from "semantic-ui-react";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useCounterActions, useCounter } from '../../../../Context/CounterProvider';
import PostDetailDialog from '../../../PostExperience/PostDetail/PostDetailDialog';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange
  }
});

const emptyPost = {
  uid: "",
  created_at: null,
  updated_at: null,
  author: null,
  blog_title: "",
  blog_text: "",
  json_data: null,
  main_image_64: null,
  slug: "",
  tags: null,
  tags_name: null
}

const AllPosts = (props) => 
{
  let allData;
  let access_token;
  let username;
  if (localStorage.getItem('tokens'))
  {
      allData = JSON.parse(localStorage.getItem('tokens'));
      access_token = allData.access;
      username = allData.username;
  }

  const [deletePostDialog, setDeletePostDialog] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(emptyPost);
  /* For Opening the Dialog */
  const [postSlug, setPostSlug] = useState("");
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [postDisabled, setPostDisabled] = useState(false);
  console.log(" $$$$$$$$$$$$$$$$$$$$ ", postSlug);

  const Counter = useCounter();
  console.log("************* THE POST COUNTER BEFORE DELETE IS ************* ", Counter);
  const setCounter = useCounterActions();

  const getPosts = () => {
    axios({
      method: "get",
      url: `https://api.nomadjourney.ir/api/v1/blog/others-profile-post/${props.url_username}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      }
    }).then((res) => {
      let result = res.data.data; 
      for (let i = 0; i < result.length; i++) {
        if (result[i].created_at) {
            let time = new Date(result[i].created_at);
            result[i].created_at = new DateObject({
                date: time,
                format: "YYYY/MM/DD,   HH:MM:SS"
            }).format("YYYY/MM/DD, HH:MM:SS");
        }
      }
      setPosts(result);
      console.log("*************** POSTS TOTAL COUNT ***************** ", result.length);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, [Counter]);

  console.log("########### THE POSTS ARE ############ ", posts);

  const hideDeletePostDialog = () => {
    setDeletePostDialog(false);
  };

  const openDeleteDialog = (post) => {
    console.log("++++++++ THE POST IS ++++++++++ ", post);
    setPost(post);
    setDeletePostDialog(true);
  };
  console.log("----------- THE DIALOG VALUE IS ----------", deletePostDialog);
  const confirmDeletePost = (post) => {
    axios({
      method: "delete",
      url: `https://api.nomadjourney.ir/api/v1/blog/others-profile-post/${username}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      data: {
        uid: post.uid
      }
    }).then((res) => {
      console.log("********* THE RESULT IN POST DELETE REQUEST **********", res);
      setCounter(Counter - 1); //where I reduce the post counter by one
    });
  };

  const deletePost = () => {
    let _posts = posts.filter((val) => val.uid !== post.uid);
    setPosts(_posts);
    setDeletePostDialog(false);
    setPost(emptyPost);
    confirmDeletePost(post);
    toast.success("Your post deleted successfully.");
  };

  console.log("************* THE POST COUNTER AFTER DELETE IS ************* ", Counter);


  

  const navigate = useNavigate();
  
  const handleDetailsClick = (slug) =>
  {
    navigate(`/home/PostExperience/PostDetail/${slug}`);
  };

  const handleEditClick = (uid, slug) => 
  {
    navigate(`/home/PostExperience/Edit/${uid}/${slug}`);
  }
  const handleNewPostRoute = () =>
  {
    navigate("/home/PostExperience/");
  };

  const checkSummary = (summary) => {
    if (summary === null || summary === "") {
      return;
    }
    if (summary. length >= 50) {
      let counter = 0, uppercase = 0;
      for (; counter < 50; counter++) {
        if (summary[counter] === summary[counter].toUpperCase()) {
          uppercase++;
        }
      }
      return (
        <>
          <Typography>{summary.substring(0, 50 - (uppercase/3))}...</Typography>
        </>
      );
    }

    return (
      <>
          <Typography>{summary}</Typography>
      </>
    )
  }

  const checkNotNull = () => {
    console.log("^^^^^^^^^^^^^ THE POST SLUG IN CHECK NOT NULL IS ^^^^^^^^^^^ ", postSlug);
    if (postSlug && postSlug !== "")
    {
      return (
        <>
          <PostDetailDialog
            post_slug={postSlug}
            set_post_slug={setPostSlug}
            open={openPostDialog}
            setOpen={setOpenPostDialog}
            disabled={postDisabled}
            setDisabled={setPostDisabled}
            access_token={access_token}
            url_username={props.url_username}
            local_storage_username={props.local_storage_username}
            />
        </>
      )
    }
  }

  return (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        p: 2,
      }}
    >
      <div>
        <Box sx={{ marginTop: 1 }}>
          <Grid sx={{ marginTop: 1 }} container spacing={1}>
            {
              posts.length > 0 ? (
                posts.map((blog)=>( 
                  <Grid
                    key={blog.slug}
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // sx={{ m: 1 }}
                  >
                  <Card className="posts-card">
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Blog Title */}
                        <Box >
                          <Typography
                            sx={{ fontSize: 25, fontWeight: "bold", display: "flex", alignItems: "center" }}
                            variant="h1"
                            component="div"
                          >
                            <FcList size='2rem' style={{ marginRight: "0.5rem" }}/>
                            {blog.blog_title}
                          </Typography>
                        </Box>
                      </Box>
                      {/* Blog Tags */}
                      <Box sx={{ mt: "0.75rem" }}>
                          <Typography
                            sx={{ marginTop: "1rem", fontSize: 20, display: "flex", alignItems: "center" }}
                            variant="p"
                            component="div"
                          >
                            Tags:
                              <Stack direction="row" 
                                    useFlexGap 
                                    flexWrap="wrap"
                                    spacing={1} 
                                    sx={{ ml: "1rem", '& > *': { flexGrow: 2 } }}>
                                {
                                  blog.tags_name.length > 0  ? (blog.tags_name.map((tag_name) => (
                                    <Chip label={tag_name} color="primary" variant="outlined" />
                                  ))) : (
                                    <span> No related tag found </span>
                                  )
                                }
                              </Stack>
                          </Typography>
                      </Box>
                      <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                        {/* Likes */}
                        <Typography
                          sx={{ marginTop: "1rem", fontSize: 16, display: "flex", alignItems: "center"  }}
                          variant="p"
                          component="div"
                          color="text.secondary"
                        >
                          <AiFillLike style={{ marginRight: "0.5rem" }} /> # Likes
                        </Typography> 
                        {/* Views */}
                        <Typography
                          sx={{ marginTop: "1rem", fontSize: 16, display: "flex", alignItems: "center" , marginLeft: "2rem" }}
                          variant="p"
                          component="div"
                          color="text.secondary"
                        >
                          <BsFillEyeFill style={{ marginRight: "0.5rem" }} /> # Views
                        </Typography>
                        {/* Created date */}
                        <Typography
                          sx={{ marginTop: "1rem", fontSize: 16, display: "flex", alignItems: "center", ml: "2rem" }}
                          variant="p"
                          component="div"
                          color="text.secondary"
                        >
                          <BsCalendarDateFill style={{ marginRight: "0.5rem" }}/>
                          Created at: { blog.created_at }
                        </Typography>
                      </div>
                      {/* Blog Description */}
                      <Typography
                        sx={{ mt: "1rem", display: "flex", alignItems: "center" }}  color="text.secondary">
                        <SummarizeIcon sx={{ marginRight: "0.5rem" }}/> { checkSummary(blog.description) }
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Details" arrow>
                        <div>
                          <CgDetailsMore
                            onClick={() => {
                              // handleDetailsClick(blog.slug)
                              setPostSlug(blog.slug);
                              setOpenPostDialog(true);
                              setPostDisabled(false);
                              }
                            }
                            color="#b9b8b8"
                            style={{ cursor: "pointer" }}
                            size='2rem'
                          />
                        </div>
                      </Tooltip>
                      {/* Edit + Delete Post on Card */}
                      {
                        props.url_username === props.local_storage_username ?
                        <>
                          <Tooltip title="Edit this post" arrow style={{ marginLeft: "46rem" }}>
                              <div>
                                <AiFillEdit
                                  onClick={() =>
                                    handleEditClick(blog.uid, blog.slug)
                                  }
                                  color="#b9b8b8"
                                  style={{ cursor: "pointer" }}
                                  size='2rem'
                                />
                              </div>
                          </Tooltip>
                          <Tooltip title="Delete this post" arrow style={{ marginRight: "0.5rem"}}>
                            <div>
                              <AiFillDelete
                                onClick={() =>
                                  openDeleteDialog(blog)
                                }
                                color="#b9b8b8"
                                style={{ cursor: "pointer" }}
                                size='2rem'
                                />
                            </div>
                          </Tooltip>
                        </>
                          : null
                        }
                    </CardActions>
                  </Card>
                </Grid>
                ))
              ) :
              (
                <div>
                  <span style={{ marginLeft: "25rem" , fontWeight: "bold", fontSize: 20}}>
                    No Post Found!
                  </span>
                  <p style={{ marginLeft: "9rem" , fontSize: 15, marginTop: "0.3rem", color: "#0F3E86" }}>
                    You would be able to create a post for your corresponding announcement, only when it is done.
                  </p>
                </div>
              )
            }
          </Grid>
        </Box>

        <Dialog
            visible={deletePostDialog}
            onHide={hideDeletePostDialog}
            open={deletePostDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: "#FDECE6"}}>
              <Stack direction={'column'}>
                <Item>
                  <FcHighPriority size='4rem' />
                </Item>
                <Item>
                  {`Delete`} <b style={{ color: "#e66969" }}>«{post.blog_title}» </b>{`Post`}
                </Item>
              </Stack>
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {post && (
                    <div style={{ fontWeight: 'bold' }}>
                      Are you sure?
                    </div>
                  )}
                </DialogContentText>
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    className="p-button-text"
                    onClick={deletePost}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="p-button-text"
                    onClick={hideDeletePostDialog}
                  >
                    Cancel
                  </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
      </div>
    </Box>
    {checkNotNull()}
    {() => setPostSlug(null)}
  </ThemeProvider>
  );
}
export default function MyPosts(props)
{
  return(
    <Grid container>
      <AllPosts url_username={props.url_username} local_storage_username={props.local_storage_username}/>
    </Grid>
  );
}