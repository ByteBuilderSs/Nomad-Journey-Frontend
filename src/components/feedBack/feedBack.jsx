import * as React from 'react';

import {


    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating,
    Stack,
    Grid,
    Button,
    Dialog,
    Typography, IconButton
} from '@mui/material';

import FeedbackIcon from '@mui/icons-material/Feedback';
import { useFeedback } from "../../hooks/useFeedback";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { BiCheckboxChecked } from "react-icons/bi";
import {useCounter, useCounterActions} from "../../Context/CounterProvider";
import {AiOutlineClose} from "react-icons/ai";
import {Item} from "semantic-ui-react";
import {makeStyles} from "@mui/styles";

const data=
    [
      {"name":"host's treatment","rate":0},
      {"name":"level of your well-being on this trip","rate":0},
      {"name":"access to public transportation","rate":0},
      {"name":"cleanness","rate":0},
      {"name":"extra facilities (Guest parking lot)","rate":0},
    ]
const styles = makeStyles(theme => ({
    button:{
        width:"15em",
        backgroundColor:"#EFEFD0",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#004E89",
        border:"solid 2px #004E89",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#004E89",
            color:"#EFEFD0"
        }
    }
}))


export default function FeedbackModal(props)
{
    const classes = styles();
    const counter = useCounter();
    const setCounter = useCounterActions();
  console.log(props)
  const [myFeedback,setFeedbacks]=React.useState(data)
  const updateState=(index)=>(event)=>
  { 
    const array=myFeedback.map((item,i)=>
    {
      if(index == i)
      {
        return { ...item, rate: event.target.value };
      }
      else
      {
        return item;
      }
    })
    setFeedbacks(array)
    console.log(myFeedback)
  } 

  const handelCancel=()=>{
    setFeedbacks(data);
    props.setOpen(false);
    props.setClose(true);
  }
  
  const {feedBack} = useFeedback()
  const handleSubmit = async (event) => {
      event.preventDefault();
      await feedBack(myFeedback[0].rate,myFeedback[1].rate,myFeedback[2].rate,myFeedback[3].rate,myFeedback[4].rate,props.anc_id)
      props.setOpen(false);
      props.setClose(true);
      setCounter(counter + 1);
  };

  return (
    
      <>
      <Dialog
      open={props.open}
      onClose={handelCancel}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: {
              borderRadius: "15px",
              color:"#004E89",
              boxShadow:"inset 0px 0px 0px 8px #004E89",
          } }}
      >
          <IconButton
              edge="end"
              onClick={handelCancel}
              size={"medium"}
              sx={{ position: "absolute", top: "1rem", right: "2rem", color:"#004E89" }}
          >
              <AiOutlineClose />
          </IconButton>
      <DialogTitle >
      <Stack direction={'column'}>
        <Grid item>
        
          
          <Typography variant='h5' sx={{fontWeight: 'bold'}} >
          <h1 style={{paddingTop:"1rem" ,marginBottom: "1rem"}}>Rate Your Trip</h1>
          </Typography>
        
        </Grid>
      </Stack>
      </DialogTitle>
      <DialogContent sx={{width:'25vw'}}>
        <DialogContentText>
          <Grid item>

              <Stack spacing={2} sx={{display:'flex'}}>
            {myFeedback.map((item,index)=>
            <>
            <Item>
                <Stack sx={{marginLeft:'1vw', marginRight:'1vw', width:"100%"}}>
                    <Item>
                        <Typography variant='h6' sx={{color:"#004E89"}}>
                            <BiCheckboxChecked/>{item.name}</Typography>
                    </Item>
                    <Item>
                        <Typography sx={{float:"right", marginRight:"2vw"}} component={`legend`}>
                        <Rating
                            sx={{float:"right", color:"#FF6B35"}}
                            defaultValue={0}
                            precision={0.5}
                            value={item.rate}
                            onChange={updateState(index)}
                        /></Typography>
                    </Item>
                </Stack>
            </Item>
            </>
            )}
              </Stack>
          </Grid>
        </DialogContentText>
        <DialogActions >
            <div style={{width:"100%", justifyContent:"center",
                alignItems:"center", display:"flex",
                paddingBottom:"0.75rem",paddingTop:"1.5rem"}}>
                <Button variant="text"
                type='submit'
                sx={{
                    width:"15em",
                    backgroundColor:"#EFEFD0",
                    backgroundPosition:"right bottom",
                    fontWeight:"bold",
                    color:"#004E89",
                    border:"solid 2px #004E89",
                    borderRadius:"15px",
                    transition:"all 0.15s ease-out",
                    display:"block",
                    backgroundSize:"200% 100%",
                    "&:hover":{
                        backgroundPosition:"left bottom",
                        backgroundColor:"#004E89",
                        color:"#EFEFD0"
                    }
                }}
                onClick={handleSubmit}>
                  Post
                </Button>
            </div>
        </DialogActions>
        
    </DialogContent>
  </Dialog>
  </> )
}

