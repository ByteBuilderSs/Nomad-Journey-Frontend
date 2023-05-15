import * as React from 'react';

import {List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Rating ,
    Stack,
    Grid,
    Button,
    Modal,
    Box
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeedbackIcon from '@mui/icons-material/Feedback';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const data=
    [
      {"name":"host's treatment","rate":0},
      {"name":"level of your well-being on this trip","rate":0},
      {"name":"access to public transportation","rate":0},
      {"name":"cleanness","rate":0},
      {"name":"extra facilities (Guest parking lot)","rate":0},
    ]


export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
const [myFeedback,setFeedbacks]=React.useState(data)
  const updateState=(index)=>(event)=>
  { 
    const array=myFeedback.map((item,i)=>
    {
      if(index == i)
      {
        return { ...item, [event.target.name]: event.target.value };
      }
      else 
      {
        return item;
      }
    })
    setFeedbacks(array)
    console.log(myFeedback)
  } 

  const handleClick = () => {
    setOpen(!open);
  };
  const handelCancel=()=>{
    myFeedback=data
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >

        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <FeedbackIcon/>
            </ListItemIcon>
        <ListItemText primary="Rate your trip..." />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          {myFeedback.map((item,index)=>
           <ListItemButton sx={{ pl: 4 }}>
           <ListItemText primary={item.name}/>
           <Stack spacing={1}>
               <Rating 
               name="half-rating" 
               defaultValue={0} 
               precision={0.5}
               value={item.rate}
               onChange={updateState(index)}
              />
           </Stack>
         </ListItemButton>
         
          )}
          
        </List>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Button
          type='submit'>
            Post
          </Button>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{justifyContent:'flex-end',display:'flex'}}>
          <Button
            type='submit'
            onClick={handelCancel}>
            Cancel
          </Button>
        </Grid>
      </Collapse>
    </List>
	
        </Box>
      </Modal>
    </div>
  );
}