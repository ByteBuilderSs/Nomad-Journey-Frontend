import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,
    Divider,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    Grid,
    ListItemIcon,
    Avatar,
    Fab,
    Button,
    Box,
    Tooltip, 
    Stack} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Lottie from 'react-lottie';
import UserProfile from '../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement'

import {useAllMsgs} from '../../hooks/useHistoryMsg'
import {useSendMsg} from '../../hooks/useSendMsg'
import {useVoluntier} from '../../hooks/useVoluntier'
import {useAncUsers} from '../../hooks/useAncReqUsers'
import {useImage} from '../../hooks/useFetchimage'
import { useNavigate } from 'react-router-dom';
import messagingL from '../../lottieAssets/messaging.json'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Messaging = () => {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: messagingL,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
    return(
      <div class="col-lg-12">
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    )
  }
const MessageRoom=()=>
{
    

    return(
        <Grid container xs={9} sx={{alignItems:'center',justifyContent:'center',height:'60vh'}} >
            <Stack direction='column' >
                <Avatar sx={{width:130,height:90}} src={require('../../Assets/images/messageIcon.jpg')}/>
                <Typography primary="Start Messaging ..." variant='h1'/>
                <Typography secondary="Message To Your Prefered Host!" variant='h1'/>
            
            </Stack>            
        </Grid>
        

    );
}
const ChatBox=(props)=>
{
    const classes = useStyles();

    const [list,setList]=React.useState([])

    const {allMsgs,allmsg} =useAllMsgs() 
    useEffect(()=>{allMsgs(props.senderU,props.reciverU)},[])
    useEffect(()=>{setList(allmsg)},[allmsg])

    
    const [message,setTextMsg]=React.useState("")
     
    const {sendMsg}=useSendMsg()
    const handelSendM=async(event)=>

    {

        await sendMsg(message,props.sender,props.reciver,props.anc_id)
        
        const newList=list.concat({message:message,type:"sent",created_at:null})
       
        setList(newList)
        
    } 
    const handelChangeTxt=(event)=>
    {
        setTextMsg(event.target.value)
    }
    return(

        <Grid item xs={9}>
            
            <List className={classes.messageArea}>
                {list && list.map((item,key)=>
                        <Grid container>
                            {
                                item.type=="sent" ?
                                <>
                                <ListItem key={key} sx={{display:'grid',justifyContent:'right'}}>
                                    <Grid item xs={12} sx={{backgroundColor:'#1A659E',borderRadius:'10px 10px 0px 10px'}} >
                                    <ListItemText align="right" primary={item.message} sx={{color:'#EFEFD0',margin:'0.5rem',paddingRight:'0.4rem',paddingLeft:'0.3rem',padding:'0.1rem'}}></ListItemText>
                                    </Grid>
                                </ListItem>
                                {item.created_at!=null ?<ListItemText 
                                                        align="right" 
                                                        secondary={item.created_at.split("T")[1].split(".")[0]} 
                                                        sx={{paddingLeft:'0.3rem'}}></ListItemText>
                                                        :

                                                        <ListItemText align="right" 
                                                        secondary={new Date().getHours() +":"+new Date().getMinutes()+":"+new Date().getSeconds()} 
                                                        sx={{paddingLeft:'0.3rem'}}></ListItemText>}
                                </> 
                              
                                :
                                <>
                                <ListItem key={key} sx={{display:'grid',justifyContent:'left'}}>
                                    <Grid item xs={12} sx={{borderRadius:'10px 10px 10px 0px',backgroundColor:'#F7C59F'}} >
                                    <ListItemText align="left" primary={item.message} sx={{margin:'0.5rem',paddingRight:'0.4rem',paddingLeft:'0.3rem',padding:'0.1rem'}}></ListItemText>
                                    </Grid>
                                </ListItem>
                                <ListItemText align="left" secondary={item.created_at.split("T")[1].split(".")[0]} sx={{paddingLeft:'0.3rem'}}></ListItemText>

                                </>
                            
                            }

                            
                        </Grid>
                    
                    
                )} 
                
            </List>
                <Divider />
                <Grid container style={{padding: '20px',display:'flex'}} direction='row'>
                    <Grid item xs={11} >
                        <TextField id="outlined-basic-email" 
                        label="Send Massege ..." 
                        fullWidth onChange={(event)=>{setTextMsg(event.target.value)}} 
                        autoComplete='off'
                        InputProps={{endAdornment:(
                        <Button size='medium' color='primary'
                        onClick={()=>{handelSendM();setTextMsg(null)}}
                        onChange={handelChangeTxt}
                        startIcon={<SendIcon />}>
                          Send
                        </Button>
                        )}} />
                    </Grid>
                    
                </Grid>
        </Grid>
    );
}

export default function Messenger(props)
{
    
    const [active,setActive]=React.useState(false);
    const [hover,setHover]=React.useState("");
    const classes = useStyles();
    const handelChatBox=()=>
    {
      setActive(true)
    }

    // const {allvoluntiers,volun} =useVoluntier() 
    // useEffect(()=>{allvoluntiers()},[]) 
    const [reciver,setReciver]=React.useState(null)
    const sender=JSON.parse(localStorage.getItem('tokens')).user_id

    const [reciverU,setReciverU]=React.useState(null)
    const senderU=JSON.parse(localStorage.getItem('tokens')).username

    
    //------------------------------------------
    const {allUsersReq,usersReq} =useAncUsers()
    useEffect(()=>{allUsersReq()},[])
    //-----------------------------------------
    

    const navigate=useNavigate()
    const handelViewProf=(username)=>
    {
        navigate(`/home/Profile/${username}/`)
    }

    return (
        
        <div>
       
          <Grid container component={Paper} sx={{width:'100%',height:'85vh',marginTop:'2rem'}}>
              <Grid item xs={3} className={classes.borderRight500}>
                 
                  <List>
                    <Typography sx={{justifyContent:'center',display:'flex',fontSize:'20px',color:'#1A659E'}}>.. Contacts ..</Typography>
                    <Divider/>
                  {usersReq.map((item)=>
                    <>                    
                    <ListItemButton key={item.first_name+item.last_name} onClick={()=>{handelChatBox();setReciver(item.id);setReciverU(item.username)}}>
                    <Tooltip title='view profile'>
                      <ListItemIcon onClick={()=>{handelViewProf(item.username)}}>
                      <UserProfile user_id={item.id} first_name={item.first_name} imageSize={37.5} profileSize={`3rem`}/>

                      </ListItemIcon>
                    </Tooltip>
                    {/* <ListItemText primary={item.first_name +" "+ item.last_name}></ListItemText> */}
                    </ListItemButton>
                    <Divider/>
                    </>
                  )}
                      
                    
                  </List>
              </Grid>
  
              <Grid container xs={9} sx={{alignItems:'center',justifyContent:'center'}}>
                  {active && <ChatBox reciver={reciver} sender={sender} anc_id={props.anc_id} senderU={senderU} reciverU={reciverU} />}
                  {!active && <MessageRoom/>}

              </Grid>
          </Grid>
        </div>
    )
}