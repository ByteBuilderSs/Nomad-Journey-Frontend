import React from "react"
import {makeStyles,useTheme} from "@material-ui/styles";
import {

  Typography,
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
import styled from "@emotion/styled/macro";
const Hover = styled.div({
  opacity: 0,
  transition: "opacity 350ms ease",
});

const DisplayOver = styled.div({
  height: "100%",
  left: "0",
  position: "absolute",
  top: "0",
  width: "100%",
  zIndex: 2,
  transition: "background-color 350ms ease",
  backgroundColor: "transparent",
  padding: "20px 20px 0 20px",
  boxSizing: "border-box",
});

const BigTitle = styled.h2({
  textTransform: "uppercase",
  fontFamily: "Helvetica",
});

const SubTitle = styled.h4({
  fontFamily: "Helvetica",
  transform: "translate3d(0,50px,0)",
  transition: "transform 350ms ease",
});

const Paragraph = styled.p({
  transform: "translate3d(0,50px,0)",
  transition: "transform 350ms ease",
});

const Background = styled.div({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "#FFF",
  position: "relative",
  width: "500px",
  height: "350px",
  cursor: "pointer",
  backgroundImage: "url(/bg.jpg)",
  [`:hover ${DisplayOver}`]: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
    transform: "translate3d(0,0,0)",
  },
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
});

const CTA = styled.a({
  position: "absolute",
  bottom: "20px",
  left: "20px",
});

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
      'https://media-cdn.tripadvisor.com/media/photo-s/19/8c/47/0e/tehran-the-capital-of.jpg',
    desc:"this is a TV of 32 inch not for you",
    rate:1,
    username:"ali",
  },
  {
    label: 'Post title',
    imgPath:
      'https://media.tehrantimes.com/d/t/2021/11/22/4/3965214.jpg',
    desc:"this is a TV of 32 inch not for you",
    rate:2,
    username:"kami"
  },
  {
    label: 'Post title',
    imgPath:
      'https://irandoostan.com/dostcont/uploads/2020/04/rsz_iran_mosque.jpg',
    desc:"this is a TV of 32 inch not for you",
    rate:3,
    username:"homan"

  },
  {
    label: 'Post title',
    imgPath:
      'https://ui.ac.ir/Dorsapax/userfiles/Sub0/Aui7.jpg',
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



