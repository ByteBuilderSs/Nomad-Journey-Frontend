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
    Button} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import {useAllMsgs} from '../../hooks/useHistoryMsg'
import {useSendMsg} from '../../hooks/useSendMsg'
import {useVoluntier} from '../../hooks/useVoluntier'

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
const data=[
    {'messege':'lcmdklmkvm','type':'sent','is_read':true},
    {'messege':'khodeti','type':'receive','is_read':true},
    {'messege':'nanate','type':'sent','is_read':true},
    {'messege':'kishteh','type':'sent','is_read':true},
    {'messege':'bro baba','type':'receive','is_read':false}
];
const MessageRoom=()=>
{
    

    return(

        <Grid container xs={9} sx={{alignItems:'center',justifyContent:'center'}} direction='column'>
            <Grid item>
            <Avatar sx={{width:130,height:90}} src={require('../../Assets/images/messageIcon.jpg')}/>
            </Grid>
            <Grid item>
            <Typography primary="Start Messaging ..." variant='h3'/>
            <Typography secondary="Message To Your Prefered Host!" variant='h2'/>
            </Grid>
            
        </Grid>
    );
}
const ChatBox=(props)=>
{
    const classes = useStyles();

    const {allMsgs,allmsg} =useAllMsgs() 
    useEffect(()=>{allMsgs()},[])

    const [textMsg,setTextMsg]=React.useState("")
     
    
    const handelSendM=async(event)=>
    {
        event.preventDefault();
        // await sendMsg(textMsg,props.reciver)

    } 
    return(

        <Grid item xs={9}>
            
            <List className={classes.messageArea}>
                {allmsg.map((item)=>
                    <ListItem key="1">
                        <Grid container>
                            {
                                item.type=="send" ?
                                <>
                                <Grid item xs={12} >
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                </> :
                                <>
                                <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                                </>
                            
                            }
                            
                            
                        </Grid>
                    </ListItem>
                )}
                      <ListItem key="1">
                          <Grid container>
                              <Grid item xs={12} >
                                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="09:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="2">
                          <Grid container >
                              <Grid item xs={12} >
                                
                                <Typography align='left'>hey there</Typography>
                                  {/* <ListItemText  align="left" primary="Hey, Iam Good! What about you ?"></ListItemText> */}
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary="09:31"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="3">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: '20px',display:'flex'}} direction='row'>
                      <Grid item xs={11} >
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(event)=>{setTextMsg(event.target.value)}} />
                      </Grid>
                      <Grid item xs={1} align="right" sx={{paddingTop:'0.8rem'}}>
                        <Button size='medium' color='primary'
                        onClick={handelSendM}
                        startIcon={<SendIcon />}>
                            Send
                        </Button>
                      </Grid>
                  </Grid>
        </Grid>
    );
}

export default function Messenger(props)
{
    const [profileImageURL, setProfileImageURL] = React.useState("");
    const [active,setActive]=React.useState(false);
    const classes = useStyles();
    const handelChatBox=()=>
    {
      setActive(true)
    }

    const {allvoluntiers,volun} =useVoluntier() 
    useEffect(()=>{allvoluntiers()},[]) 
    
    const [reciver,setReciver]=React.useState(null)
    const sender=JSON.parse(localStorage.getItem('tokens')).username

    return (
        
        <div>
       
          <Grid container component={Paper} sx={{width:'100%',height:'85vh',marginTop:'2rem'}}>
              <Grid item xs={3} className={classes.borderRight500}>
                 
                  <List>
                  {volun.map((item)=>
                    <>                    
                    <ListItemButton key={item.first_name+item.last_name} onClick={()=>{handelChatBox();setReciver(item.username)}}>
                    <ListItemIcon>
                        <Avatar alt={item.username} src="https://material-ui.com/static/images/avatar/3.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={item.first_name +" "+ item.last_name}></ListItemText>
                    </ListItemButton>
                    </>
                  )}
                      
                    
                  </List>
              </Grid>
  
              <Grid container xs={9} sx={{alignItems:'center',justifyContent:'center'}}>
                  {active && <ChatBox reciver={reciver} sender={sender} anc_id={props.anc_id} />}
                  {/* <List className={classes.messageArea}>
                      <ListItem key="1">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="09:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="2">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary="09:31"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="3">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: '20px'}}>
                      <Grid item xs={11}>
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                          
                      </Grid>
                      <Grid xs={1} align="right">
                          <Fab color="primary" aria-label="add"><SendIcon/></Fab>
                      </Grid>
                  </Grid> */}
                  {!active && <MessageRoom/>}
              </Grid>
          </Grid>
        </div>
    )
}