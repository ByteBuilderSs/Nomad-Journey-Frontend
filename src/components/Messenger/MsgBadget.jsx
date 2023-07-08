
import * as React from 'react';

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const ChatBadegt = () => {

  
    const navigate=useNavigate()
    const handleClick = (event) => {
       
        navigate('/chatbar')
    };
   
    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
          right: -3,
          top: 13,
          border: `0px solid ${theme.palette.background.paper}`,
          padding: "0 2px",

        }
    }));



    return(

        <div>
            <Tooltip title="inbox">
                <IconButton aria-label="notif-bell" sx={{marginRight : "30px"}} onClick={handleClick}>
                    <StyledBadge badgeContent={2} color="primary">
                        <EmailIcon sx={{fontSize : "25px", color : "#fff"}}/>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            
            
        </div>

    )
}

export default ChatBadegt