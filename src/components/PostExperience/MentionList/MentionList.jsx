import { useState } from "react";
import {List,
      ListItem,
      ListItemButton,
      ListItemText,
      ListItemAvatar,
      Checkbox,
      Grid,
      Divider,
      Collapse,
      ListItemIcon
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LetteredAvatar from 'react-lettered-avatar';


const CheckboxListSecondary=({mentions})=>{
  return(
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
      <>
      <ListItemButton>
          <ListItem
          hideChevron={true}
          disablePadding>
          
            <ListItemAvatar>
              <LetteredAvatar size={36} radius={20} color='#fff' backgroundColor="#AD8E70" name={mentions.host_username}/>
            </ListItemAvatar>
            <ListItemText primary={mentions.host_username} secondary={" was your host in "+mentions.city_name} />
          </ListItem>
        </ListItemButton>
        <Divider />
        </>
    
  
  </List>
  );
  
}

export default function Mentions({props}) {
  console.log(props)
  return (
    <>
      <Grid container>
      {props && <CheckboxListSecondary mentions={props}/>}
      </Grid>
    </>
  );
}