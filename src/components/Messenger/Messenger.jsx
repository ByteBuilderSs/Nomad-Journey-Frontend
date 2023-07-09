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
    Stack,
    Collapse} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Lottie from 'react-lottie';
import UserProfile from '../Announcements/AnnouncementDetails/Authenticated/UserProfileAnnouncement'

import {useAllMsgs} from '../../hooks/useHistoryMsg'
import {useSendMsg} from '../../hooks/useSendMsg'
import {useVoluntier} from '../../hooks/useVoluntier'
import {useAncUsers} from '../../hooks/useAncReqUsers'
import { useNavigate } from 'react-router-dom';
import messagingL from '../../lottieAssets/messaging.json'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

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
    overflowY: 'auto',
    
    width:'100%'
  }
});


const MessageRoom=()=>
{
    

    return(
        <Grid container xs={12} sx={{alignItems:'center',justifyContent:'center',height:'50vh'}} direction='column' >
           
                <Avatar sx={{width:130,height:90,margin:'1rem',justifyContent:'center',marginLeft:'1rem'}} src={require('../../Assets/images/messageIcon.jpg')}/> 
                
                <Typography variant='h5' sx={{textAlign:'center'}}>Start Messaging  </Typography>
                <Typography variant='caption' sx={{textAlign:'center'}}>send private messages to your contacts</Typography>
                 
        </Grid>
    );
}

const ChatBox=(props)=>
{
    const classes = useStyles();

    const [list,setList]=React.useState([])
    const [seen,setSeen]=React.useState([])
    const messagesEndRef = React.useRef(null)
    const scrollButton=()=>
    {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const {allMsgs,allmsg} =useAllMsgs() 
    useEffect(()=>{allMsgs(props.senderU,props.reciverU);scrollButton()},[])
    useEffect(()=>{setList(allmsg);scrollButton()},[allmsg])

    
    const [message,setTextMsg]=React.useState("")
     
    const {sendMsg}=useSendMsg()
    const handelSendM=async(event)=>

    {

        await sendMsg(message,props.sender,props.reciver)
        
        const newList=list.concat({message:message,type:"sent",created_at:null})
       
        setList(newList)
        setTextMsg("")
        
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
                                  
                                    <Grid item minWidth='5vh' maxWidth='30vh' maxHeight='1000vh' sx={{backgroundColor:'#1A659E',borderRadius:'10px 10px 0px 10px',wordBreak:'break-word'}} >
                                    <ListItemText align="right" primary={item.message} sx={{color:'#EFEFD0',margin:'0.4rem',textAlign:'left',paddingLeft:'1rem'}}/>
                                    </Grid>
                                    <Grid display='flex' flexDirection='row'>
                                    
                                    
                                    {item.created_at!=null ?<ListItemText 
                                                        
                                                        align="right" 
                                                        secondary={item.created_at.split("T")[1].split(".")[0]} 
                                                        ></ListItemText>
                                                        :

                                                        <ListItemText align="right" 
                                                        secondary={new Date().getHours() +":"+new Date().getMinutes()+":"+new Date().getSeconds()} 
                                                        ></ListItemText>}
                                    
                                    </Grid>
                                </ListItem>
                                
                                </> 
                              
                                :
                                <>
                                <ListItem key={key} sx={{display:'grid',justifyContent:'left'}}>
                                    <Grid item xs={12} sx={{borderRadius:'10px 10px 10px 0px',backgroundColor:'#D5D8DD'}} >
                                    <ListItemText align="left" primary={item.message} sx={{margin:'0.4rem',textAlign:'center'}}/>
                                    </Grid>
                                    <ListItemText align="left" secondary={item.created_at.split("T")[1].split(".")[0]} sx={{paddingLeft:'0.3rem'}}></ListItemText>
                                </ListItem>

                                </>
                           
                            }
                            

                            
                        </Grid>
                    
                    
              )} 
              
              <div ref={messagesEndRef}/>
            </List>
                <Divider />
                <Grid container style={{padding: '20px',display:'flex'}} direction='row'>

                    <Grid item xs={11} >
                        <TextField id="outlined-basic-email" 
                        label="Send Massege ..." 
                        fullWidth 
                        onChange={(event)=>{setTextMsg(event.target.value)}} 
                        autoComplete='off'
                        value={message}
                        InputProps={{
                          
                          style:{borderRadius:'25px',backgroundColor:'#D5D8DD',border:'0.3px solid #004E89'},
                          endAdornment:(
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
    const [selected,setSelected]=React.useState(null)
    const [open1,setOpen1]=React.useState(false)
    const [open2,setOpen2]=React.useState(false)

    const [bgcolor,setBgColor]=React.useState(-1);
    
    const classes = useStyles();
    const handelChatBox=(index)=>
    {
      
      setActive(!active)
      setSelected(index)
    }

   
    const [reciver,setReciver]=React.useState(null)
    const sender=JSON.parse(localStorage.getItem('tokens')).user_id

    const [reciverU,setReciverU]=React.useState(null)
    const senderU=JSON.parse(localStorage.getItem('tokens')).username

    
    //------------------------------------------
    const {allUsersReq,usersReq} =useAncUsers()
    useEffect(()=>{allUsersReq()},[])
    const {allvoluntiers,volun} =useVoluntier() 
    useEffect(()=>{allvoluntiers()},[]) 
    //-----------------------------------------
    

    const navigate=useNavigate()
    const handelViewProf=(username)=>
    {
        navigate(`/home/Profile/${username}/`)
    }
    const handelClick1=()=>
    {
      setOpen1(!open1);
    }
    const handelClick2=()=>
    {
      setOpen2(!open2);
    }
    
    return (
        
        <div>
       
          <Grid container component={Paper} sx={{width:'100%',height:'85vh',marginTop:'2rem'}}>
              <Grid item xs={3} className={classes.borderRight500}>
                 
                  <List>
                    <Typography sx={{justifyContent:'center',display:'flex',fontSize:'20px',color:'#1A659E'}}>All My Contacts</Typography>
                    <Divider/>
                  <ListItemButton onClick={handelClick1}>
                  <ListItemText secondary='contact with your guests' sx={{alignItems:'center'}} />
                  {open1?
                  <ExpandLess/>
                  :<ExpandMore/>}
                   
                  </ListItemButton>
                  <Collapse in={open1}>
                      <List disablePadding>
                      {usersReq.length>0 ?usersReq.map((item,index)=>
                        
                          <>                    
                          <ListItemButton style={{backgroundColor: bgcolor ==index?'#D5D8DD':null}}  key={item.id} onClick={()=>{handelChatBox(item.id);setReciver(item.id);setReciverU(item.username);setBgColor(index)}}>
                          <Tooltip title='view profile'>
                            <ListItemIcon onClick={()=>{handelViewProf(item.username)}}>
                            <UserProfile user_id={item.id} first_name={item.first_name} imageSize={37.5} profileSize={`3rem`}/>
                            
                            </ListItemIcon>
                          </Tooltip>
                          <ListItemText primary={item.first_name +" "+ item.last_name} secondary={"from "+item.city_name}/>
                          
                          </ListItemButton>
                          <Divider/>
                          </>
                        ):<Typography variant='caption' sx={{marginLeft:'2rem'}}>no guests yet</Typography>}
                      </List>
                  </Collapse>
                  <ListItemButton onClick={handelClick2}>
                  <ListItemText secondary='contact with your volunteers' sx={{alignItems:'center'}} />
                  {open2?
                  <ExpandLess/>
                  :<ExpandMore/>}
                  </ListItemButton>
                  <Collapse in={open2}>
                      <List disablePadding>
                      {volun.length>0 ? volun.map((item,index)=>
                          <>                    
                          <ListItemButton style={{backgroundColor: bgcolor ==index?'#D5D8DD':null}}  key={item.id} onClick={()=>{handelChatBox(item.id);setReciver(item.id);setReciverU(item.username);setBgColor(index)}}>
                          <Tooltip title='view profile'>
                            <ListItemIcon onClick={()=>{handelViewProf(item.username)}}>
                            <UserProfile user_id={item.id} first_name={item.first_name} imageSize={37.5} profileSize={`3rem`}/>
                            
                            </ListItemIcon>
                          </Tooltip>
                          <ListItemText primary={item.first_name +" "+ item.last_name} secondary={"from "+item.city_name}/>
                          
                          </ListItemButton>
                          <Divider/>
                          </>
                        ):<Typography variant='caption' sx={{marginLeft:'2rem'}}>no volunteers yet</Typography>}
                      </List>
                  </Collapse>
                    
                  </List>
              </Grid>
  
              <Grid container xs={9} sx={{alignItems:'center',justifyContent:'center'}}>
                  {(active && reciver==selected)? <ChatBox reciver={reciver} sender={sender} senderU={senderU} reciverU={reciverU} /> :null}
                  {!active && <MessageRoom/>}

              </Grid>
          </Grid>
        </div>
    )
}