import * as React from 'react';
import { Typography, List,ListItem,ListItemText,ListItemAvatar,ListItemButton} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { useState,useEffect } from 'react';
import {useHostOffers} from '../../../hooks/useAllHostOffers'
import { Link } from 'react-router-dom';
import '../UserPanel-v2.css'
import ReqAnnonces from '../../ReqAnnonce/ReqAnnonce';

export default function MyOffers() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {setIsOpen(!isOpen)};
    const {hostOffers,Annoc} =useHostOffers() 
    useEffect(()=>{hostOffers()},[])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    
        <ListItem alignItems="flex-start" sx={{width:'100%'}}>
            <ListItemAvatar>
            <Avatar />
            </ListItemAvatar>
            <ReqAnnonces isDialogOpened={isOpen} 
                        handleCloseDialog={() => setIsOpen(false)}/>
            <ListItemButton >
            <Link  onClick={() => {handleOpen()}}>
                <ListItemText sx={{color:'ButtonText'}}
                primary="Host Name"
                secondary={
                <React.Fragment>
                <Typography 
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.secondary">
                    Ali Connors
                </Typography>
                </React.Fragment>
                }/>
                </Link>
            </ListItemButton>
        </ListItem>
      
    </List>
  );
}