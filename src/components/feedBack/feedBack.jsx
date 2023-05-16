import * as React from 'react';

import {
    
    
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating ,
    Stack,
    Grid,
    Button,
    Dialog,
    Typography
} from '@mui/material';

import FeedbackIcon from '@mui/icons-material/Feedback';
import { useFeedback } from "../../hooks/useFeedback";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { BiCheckboxChecked } from "react-icons/bi";

const data=
    [
      {"name":"host's treatment","rate":0},
      {"name":"level of your well-being on this trip","rate":0},
      {"name":"access to public transportation","rate":0},
      {"name":"cleanness","rate":0},
      {"name":"extra facilities (Guest parking lot)","rate":0},
    ]



export default function FeedbackModal(props)
{
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
  };

  return (
    
      <>
      <Dialog
      open={props.open}
      onHide={handelCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle >
      <Stack direction={'column'}>
        <Grid item>
        
          
          <Typography variant='h5' sx={{fontWeight: 'bold'}} >
            <ReviewsIcon />
            Rate Your Trip</Typography>
        
        </Grid>
      </Stack>
      </DialogTitle>
      <DialogContent sx={{width:'25vw'}}>
        <DialogContentText>
          <Grid item>
            {myFeedback.map((item,index)=>
            <>
            <Stack spacing={1} sx={{display:'flex',flexDirection:'row'}}>
              <Typography variant='h6' sx={{margin:'11px'}}><BiCheckboxChecked/>{item.name}</Typography>
              <Rating 
               
               defaultValue={0} 
               precision={0.5}
               value={item.rate}
               onChange={updateState(index)}
              />
            </Stack>
            </>
            )}
          </Grid>
        </DialogContentText>
        <DialogActions >
        
          
            <Button variant="text"
            type='submit'
            onClick={handleSubmit}>
              Post
            </Button>
          

            <Button variant="text"
              type='submit'
              onClick={handelCancel}>
              Cancel
            </Button>
          
        
        </DialogActions>
        
    </DialogContent>
  </Dialog>
  </> )
}

