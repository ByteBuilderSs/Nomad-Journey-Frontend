
import * as React from 'react';
import {FaCoins} from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from '@mui/material';



const CoinBadegt = ({coins}) => {
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
            <Tooltip title="coins">
                <IconButton aria-label="notif-bell" sx={{marginRight : "30px"}} >
                    <StyledBadge badgeContent={coins} color="primary">
                        <FaCoins style={{fontSize : "25px", color : "#fff"}}/>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
        </div>

    )
}

export default CoinBadegt