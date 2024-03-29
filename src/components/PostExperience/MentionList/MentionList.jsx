import { useState, useEffect } from "react";
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
import axios from 'axios';
import { toast } from "react-toastify";

let username = "";
let user_id = "";
if (localStorage.getItem('tokens'))
{
    const allData = JSON.parse(localStorage.getItem('tokens'));
    username = allData.username;
    user_id = allData.user_id;
}

const CheckboxListSecondary=({mentions})=>{
  /* TODO => FOR HOST AVATAR */
  const [profileImageURL, setProfileImageURL] = useState("");
  // const [hostID, setHostID] = useState("");
  // console.log("DATA PASSED BY MENTIONS: ", mentions);
  // console.log("HOST ID", mentions.host_id);
  

  useEffect(() => {
    if (mentions.host_id) {
      console.log("THE OUTPUT PASSED BY MENTIONS IN USEEFFECT: ", mentions.host_id);
      axios({
                method: "get",
                url: `http://188.121.102.52:8000/api/v1/accounts/get-profile-photo/${mentions.host_id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                console.log("+++++++++ THE RESULT IS ++++++++ ", result);
                if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                    setProfileImageURL("http://188.121.102.52:8000" + result.data.profile_photo_URL);
                } 
      
            }).catch((error) => {
                toast.error("Something went wrong while fetching user profile photo.")
            })
    }
      
  }, [mentions.host_id]);
  

  return(
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <>
      <ListItemButton>
          <ListItem
          hideChevron={true}
          disablePadding>
            <ListItemAvatar>
              {
                profileImageURL && profileImageURL !== "" ? 
                (
                    <div style={{borderRadius: '10rem', overflow: 'hidden'}}>
                        <img style={{ width:'15rem', height:'15rem', objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/> 
                    </div>
                ) :
                <LetteredAvatar size={40} radius={20} color='#fff' backgroundColor="#AD8E70" name={mentions.host_username}/>
              }
            </ListItemAvatar>
            <ListItemText primary={mentions.host_firstName + " " + mentions.host_lastName} secondary={" was your host in "+mentions.city_name} />
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