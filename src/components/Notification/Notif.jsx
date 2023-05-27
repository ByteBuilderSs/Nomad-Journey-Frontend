import * as React from 'react';
import "./Notif.css"
import baktashImg from "../../Assets/images/baktash.jpg"
import sinaImg from "../../Assets/images/sina.jpg"

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';




const Notif = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const notifs = [{
            "id" : 1,
            "username" : "Baktash81",
            "timestamp" : "6 min ago",
            "message" : "give an offer to you.",
            "img" : baktashImg
        },{
            "id" : 2,
            "username" : "Sina",
            "timestamp" : "6 min ago",
            "message" : "give an offer to you.",
            "img" : sinaImg
        },
    ]

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

    const itemStyle = {
        display : "flex",
        alignItems : "center",
        marginRight : "10px",
        marginLeft : "10px",
        padding : "5px",
        gap : "1px"
    }


    return(

        <div>

            <IconButton aria-label="notif-bell" sx={{marginRight : "30px"}} onClick={handleClick}>
                <StyledBadge badgeContent={2} color="primary">
                    <NotificationsIcon sx={{fontSize : "30px", color : "#fff"}}/>
                </StyledBadge>
            </IconButton>
            
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
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
                
                {notifs.map((object) => (
                    <div>
                        <div className='menu-item' onClick={handleClose} style = {itemStyle}>
                            <Avatar src={object.img} />
                            <strong style={{marginRight : "5px"}}>{object.username}</strong> 
                            <div className="message">{object.message}</div> 
                            <div className="timestamp">{object.timestamp}</div>
                        </div>
                        <Divider/>
                    </div>
                ))}
                {/* {notifs.map((item) => (
                    <MenuItem onClick={handleClose} sx={{display : "flex"}}>
                        
                    </MenuItem>
                ))} */}
                

                    
            </Menu>
        </div>

    )
}

export default Notif