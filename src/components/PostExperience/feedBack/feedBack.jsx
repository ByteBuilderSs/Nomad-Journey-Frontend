import * as React from 'react';
import {List,
    ListSubheader,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    InboxIcon,
    DraftsIcon,
    SendIcon,
    
    Rating ,
    Stack
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeedbackIcon from '@mui/icons-material/Feedback';
const data=
    {"questions":[
      {"name":"host's treatment","rate":3.5},
      {"name":"level of your well-being on this trip","rate":5},
      {"name":"access to public transportation","rate":1},
      {"name":"cleanness","rate":2},
      {"name":"extra facilities (Guest parking lot)","rate":0},

    ]}
export default function FeedbackQs() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        
        <ListSubheader component="div" id="nested-list-subheader">
          Rate and Feedback
        </ListSubheader>
      }
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
          {data.map((item)=>
          
            <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={item.questions.name}/>
            <Stack spacing={1}>
                <Rating name="half-rating" defaultValue={0} precision={0.5} value={item.questions.rate}/>
            </Stack>
          </ListItemButton>
          )}
          
          
        </List>
      </Collapse>
    </List>
  );
}