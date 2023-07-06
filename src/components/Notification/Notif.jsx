import * as React from 'react';
import { useEffect, useState } from 'react';
import "./Notif.css"
import baktashImg from "../../Assets/images/baktash.jpg"
import sinaImg from "../../Assets/images/sina.jpg"

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import axios from 'axios';
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import Button from '@mui/material/Button';

import Avatar from './avatar';


const Notif = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [userId, setUserId] = useState(null);
    const [notifs, setNotifs] = useState(null);
    const [unseen, setUnSeen] = useState(0);
    const open = Boolean(anchorEl);

    // const notifs = [
    //     {
    //         "id" : 1,
    //         "username" : "Baktash81",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : baktashImg,
    //         "is_seen" : false
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sina",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sina",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sina",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sina",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sinscafewfwedvfwa",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sinscafewfwedvfwa",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     },
    //     {
    //         "id" : 2,
    //         "username" : "Sinscafewfwedvfwa",
    //         "created_at" : "2023-07-04T12:01:40.716916+03:30",
    //         "message" : "give an offer to you.",
    //         "img" : sinaImg,
    //         "is_seen" : true
    //     }
    // ]


    // fetch user profile pic 
    const FetchUserPic = async (userName) => {
        try {
              
            await axios({
              method: "get",
              url: `https://api.nomadjourney.ir/api/v1/accounts/user/${userName}`,
            }).then(response => {
                
                setUserId(response.data.id)
            })
            
            
        } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching User ID.")

        }
    }

    const fetchNotif = async (userId) => {
        try {
          await axios({
            method: "get",
            url: `https://api.nomadjourney.ir/api/v1/notification/user-notifications/${userId}`,
          }).then((response) => {
            if (notifs === null) {
              setNotifs(response.data);
            //   console.log(response.data)
            } else if (JSON.stringify(response.data) !== JSON.stringify(notifs)) {
              setNotifs(response.data);
            //   console.log(response.data)
            }
          });
        } catch (error) {
          console.error(error);
        }
    };

    const formatTimeElapsed = (timestamp) => {
        // Split the date string into its components
        const [datePart, timePart] = timestamp.split("T");
        const [year, month, day] = datePart.split("-");
        const [time, timezone] = timePart.split("+");

        // Extract the individual time components
        const [hour, minute, second] = time.split(":");

        // Create a new Date object using the individual date and time components
        const createdAt = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
        );

        const now = new Date();
        const elapsed = Math.floor((now - createdAt) / 1000); // Elapsed time in seconds
      
        if (elapsed < 60) {
          return `${elapsed} seconds ago`;
        } else if (elapsed < 3600) {
          const minutes = Math.floor(elapsed / 60);
          return `${minutes} minutes ago`;
        } else if (elapsed < 86400) {
          const hours = Math.floor(elapsed / 3600);
          return `${hours} hours ago`;
        } else {
          const days = Math.floor(elapsed / 86400);
          return `${days} days ago`;
        }
    }
      
      
      

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
          right: -3,
          top: 13,
          border: `0px solid ${theme.palette.background.paper}`,
          padding: "0 2px",

        }
    }));

    const makeMessage = (message) => {

      // Split the text by space
      const words = message.split(" ");

      // Remove the first word
      words.shift();

      // Create a new string
      const newString = words.join(" ");

      return newString
    }


    React.useEffect(() => {
        let username = "";
        let user_id = "";
        if (localStorage.getItem('tokens'))
        {
            const allData = JSON.parse(localStorage.getItem('tokens'));
            username = allData.username;
            user_id = allData.user_id;
        }
        setUserId(user_id)
      }, []);

    React.useEffect(() => {
        if (notifs !== null && notifs.length != 0 ){
            const unseenCount = notifs.filter(obj => !obj.is_seen).length;
            setUnSeen(unseenCount);
        }
      }, [notifs]);

    useEffect(() => {
        const interval = setInterval(() => {
          fetchNotif(userId);
        }, 3000);
        return () => clearInterval(interval);
    }, [userId]);

    return(

        <div>

            <IconButton aria-label="notif-bell" sx={{marginRight : "30px"}} onClick={handleClick}>
                <StyledBadge badgeContent={unseen} color="primary">
                    <NotificationsIcon sx={{fontSize : "30px", color : "#fff"}}/>
                </StyledBadge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    maxHeight: 8 * 45,
                    // overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    marginRight : "5px",
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                
                {(notifs !== null) ? (notifs.length !== 0) ? notifs.map((object) => (
                    <MenuItem key={object}  sx={{}}>
                                <div
                                    style={{
                                        background: object.is_seen ? 'transparent' : '#E55807',
                                        borderRadius: '50%',
                                        width: '10px',
                                        height: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        marginRight : "10px"
                                    }}
                                ></div>
                                
                                <div style={{marginRight : "6px"}}>
                                  
                                  {(object.sender_profile_photo_URL) ? <Avatar imageUrl={`https://api.nomadjourney.ir${object.sender_profile_photo_URL}`} alt={object.sender_username[0]} size={35} /> :
                                    <Avatar letter={object.sender_username[0]} size={35}/>
                                  }
                                </div>
                                
                                <strong style={{marginRight : "5px"}}>{object.sender_username}</strong> 
                                <div className="message">{makeMessage(object.message)}</div> 
                                <div className="timestamp" style={{}}>{formatTimeElapsed(object.created_at)}</div>                          
                    </MenuItem>
                )) : <p style={{marginLeft : "20px", marginRight : "20px"}}>You have not any notification</p>: <Skeleton width={"300px"} height={"100px"} />
                }
                
                <div style={{display : "flex", justifyContent : "center", marginTop : "10px", gap : "5px"}}>
                    <Button variant="contained">Mark as read</Button>
                    
                </div>
                
                

                    
            </Menu>
        </div>

    )
}

export default Notif