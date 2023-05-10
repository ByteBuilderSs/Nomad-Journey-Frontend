import React from "react"
import {makeStyles,useTheme} from "@material-ui/styles";
import {MobileStepper,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia ,
  Rating,
  IconButton
} from '@mui/material';
import LetteredAvatar from 'react-lettered-avatar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  }
};
const useStyles = makeStyles({
  root:{
   margin:"10px 10px",
   display:"flex",
   flexDirection:"column" 
  },
  header:{
    flexGrow:1,
  },
  media:{
    height:200
  },
  paper:{
    width:300
  },
  image:{
    width:"100%"
  },
  typo:{
    textAlign:"center"
  },
  mx:{
    margin:"6px 0px"
  },
  card:{
    width:300,
    
  }
})

const tutorialSteps = [
  {
    label: 'Post title',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    desc:"this is a TV of 32 inch not for you",
    rate:1,
    username:"ali"
  },
  {
    label: 'Post title',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    desc:"this is a TV of 32 inch not for you",
    rate:2,
    username:"kami"
  },
  {
    label: 'Post title',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    desc:"this is a TV of 32 inch not for you",
    rate:3,
    username:"homan"

  },
  {
    label: 'Post title',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    desc:"this is a TV of 32 inch not for you",
    rate:4.4,
    username:"mir"

  },
];





function CardSwipeable(props)
{
   const classes = useStyles()
    return (
      
      <Grid container justifyContent='center' spacing={1} sx={{marginTop:'10vh',marginBottom:'10vh',display:'flex',flexDirection:'row'}}>
        <Grid item>
          <Card className={`${classes.root} ${classes.card}`} sx={{':hover': {
            boxShadow: 20,
          }}}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={props.item.imgPath}
                  title="Contemplative Reptile"
                />
                  <CardContent>
                    <Typography className={`${classes.typo} ${classes.mx}`} variant="h5" color="inherit" component="h3">
                      {props.item.label}
                    </Typography>
                    <Typography  className={classes.typo} color="textSecondary" component="p">
                      {props.item.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      <LetteredAvatar name={props.item.username} size={34}/> 
                    </IconButton>
                    <Rating  name="read-only" value={props.item.rate} readOnly precision={0.1} />
                  </CardActions>
                </CardActionArea>
          </Card>
        </Grid>

     </Grid>
    )
}

const GeneralPosts = ()=>{
  return(
        <Carousel sx={{margin:'10vh',display:'flex',flexDirection:'column'}}
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
          {
            tutorialSteps.map( (item, i) => <CardSwipeable key={i} item={item}/> )
          }
          
       </Carousel>
  )
}
export default GeneralPosts



