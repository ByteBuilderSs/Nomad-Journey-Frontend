import * as React from 'react';
import { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  Tooltip,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import 'react-quill/dist/quill.bubble.css';
import './MyPosts.css'
import {useMyBlogs} from '../../../../hooks/useMyBlogs';
import {useNavigate} from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { blue, yellow, red, deepOrange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange
  }
});


const AllPosts=({blogs})=> 
{
  const navigate = useNavigate();
  
  const handleDetailsClick = (slug) =>
  {
    navigate(`/home/PostExperience/${slug}`);
  };
  const handleNewPostRoute = () =>
  {
    navigate("/home/PostExperience/");
  };
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
        <Button
          sx={{ marginLeft: "48.25rem" }}
          variant="contained"
          size="medium"
          style={{ minWidth: 150 }}
          color="secondary" 
          onClick={handleNewPostRoute}
          >
          Add new post
        </Button>
        <Box sx={{ marginTop: 1 }}>
          <Grid sx={{ marginTop: 1 }} container spacing={2}>
            {
              blogs.length > 0 ? (
                blogs.map((blog)=>( 
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
                  <Card className="users-card">
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box >
                          <Typography
                            sx={{ fontSize: 14 }}
                            variant="h1"
                            component="div"
                          >
                            Title: {blog.blog_title}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: "0.75rem" }}>
                          <Typography
                            sx={{ marginTop: "1rem", fontSize: 14, display: "flex", alignItems: "center" }}
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
                                  blog.tags_name.map((tag_name) => (
                                    <Chip label={tag_name} color="primary" variant="outlined" sx={{ mb: "0.25rem"}}/>
                                  ))
                                }
                              </Stack>
                          </Typography>
                      </Box>
      
                      <Typography
                        sx={{ marginTop: "1rem", fontSize: 14 }}
                        variant="p"
                        component="div"
                      >
                        created date: { blog.created_at }
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Details" arrow>
                        <div>
                          <CgDetailsMore
                            onClick={() =>
                              handleDetailsClick(blog.slug)
                            }
                            color="#b9b8b8"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
                ))
              ) :
              (
                <span style={{ marginLeft: "25rem" , fontWeight: "bold", fontSize: 20}}>
                  No Posts Found!
                </span>
              )
            }
          </Grid>
        </Box>
      </div>

    </Box>
  </ThemeProvider>
  );
}
export default function MyPosts()
{
  const {myblogs,blogs}=useMyBlogs()
  useEffect(()=>{myblogs()},[])
  return(
    <Grid container>
      {blogs && <AllPosts blogs={blogs}/>}
    </Grid>
  );
}