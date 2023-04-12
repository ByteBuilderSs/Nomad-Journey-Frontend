import * as React from 'react';
import { Typography, List,ListItem,ListItemText,ListItemAvatar,ListItemButton,Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useState,useEffect } from 'react';
import {useHostOffers} from '../../../../hooks/useAllHostOffers'
import { Link } from 'react-router-dom';
import '../../UserPanel-v2.css'
import ReqAnnonces from '../../../ReqAnnonce/ReqAnnonce';
import { toast } from 'react-toastify';
import {useAcceptReq} from '../../../../hooks/useAcceptReq'
import {useRejectReq} from '../../../../hooks/useRejectReq'

const OfferLists=({Annoc})=>{
    const[id,setID]=useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
    setIsOpen(!isOpen)}
    const {AcceptReq}=useAcceptReq()
    const handelClickAccept=async(event)=>{
        // event.preventDefault();
        AcceptReq(id)
    };
    
    const {RejectReq}=useRejectReq()
    const handelClickReject=async(event)=>{
        // event.preventDefault();
        RejectReq(id)
    };
    const Clicker=(annonc_id)=>{
      if(annonc_id !=null)
        {
          return(
            <>
                    <ReqAnnonces dialogOpen={isOpen} 
                      closeDialog={() => setIsOpen(false)}
                      anc_id={id} />
            </>
          )
        }
    }


      
    
    
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
         
        {Annoc.map((item)=>
          item.hosts.map((val)=>
          <ListItem alignItems="flex-start" sx={{width:'100%'}}>
            <ListItemAvatar>
            <Avatar />
            </ListItemAvatar>
            
            {/* <ListItemButton > */}
              
            {/* <Link onClick={() => {handleOpen();setID(item.id)}}> */}
              <ListItemText sx={{color:'ButtonText'}}
              primary="You have offer from :"
              secondary={
              <React.Fragment>
              <Typography 
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.secondary">
              </Typography>
                {val.username}
              </React.Fragment>}/>
              <ListItemButton onClick={()=>{setID(item.id);handelClickAccept()}}>Accept</ListItemButton>
              <ListItemButton onClick={()=>{setID(item.id);handelClickReject()}}>Reject</ListItemButton>

              {/* </Link> */}
              
          {/* </ListItemButton> */}
          </ListItem>
          ))}
          {/* {Clicker(id)} */}
        </List>
      );
}
export default function MyOffers() {
   
    const {hostOffers,Annoc} =useHostOffers() 
    useEffect(()=>{hostOffers()},[])
    console.log(Annoc)
  return(
  <Grid container>
    {Annoc && <OfferLists Annoc={Annoc}/>}
  </Grid>);
}