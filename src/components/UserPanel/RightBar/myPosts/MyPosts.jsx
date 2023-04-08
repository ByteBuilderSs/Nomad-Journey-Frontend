import * as React from 'react';
import { useEffect } from 'react';
import {Card ,CardActions,CardContent,CardMedia,Button,Typography,Grid} from '@mui/material';


import './MyPosts.css'
import {useMyBlogs} from '../../../../hooks/useMyBlogs'


const AllPosts=({blogs})=> {


  return (
  <Grid>
    {blogs.map((blog)=>( 
    <Card sx={{ maxWidth: 345,height:170 }} className='card'>
      <CardMedia
        sx={{ height: 100 }}
        image={require("../../../../Assets/images/banner-04.jpg")}
        title="mypost"
      />
      <CardContent sx={{justifyContent:'center',alignContent:'center',display:'flex',flexWrap:'wrap'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{alignItems:'center'}}>
          {blog.blog_title}
        </Typography>
      </CardContent>
    </Card>
    ))}
  
  </Grid>
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