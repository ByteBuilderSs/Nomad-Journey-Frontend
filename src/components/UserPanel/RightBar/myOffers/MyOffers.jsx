import * as React from 'react';
import { Typography, List,ListItem,ListItemText,ListItemAvatar,ListItemButton,Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { useState,useEffect } from 'react';
import {useHostOffers} from '../../../../hooks/useAllHostOffers'
import { Link } from 'react-router-dom';
import '../../UserPanel-v2.css'
import ReqAnnonces from '../../../ReqAnnonce/ReqAnnonce';


const OfferLists=({Annoc})=>{
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {setIsOpen(!isOpen)};
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {Annoc.map((item)=>(
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
      
        ))}
            
        </List>
      );
}
export default function MyOffers() {
   
    const {hostOffers,Annoc} =useHostOffers() 
    useEffect(()=>{hostOffers()},[])

  return(<Grid container>
    {Annoc && <OfferLists Annoc={Annoc}/>}
  </Grid>);
}