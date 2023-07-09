import {
    Avatar,
    Box,
    Button,
    Divider,
    Modal,
    Stack,
    TableBody,
    TableContainer,
    Typography,
    TableRow,
    TableCell,
    IconButton, TablePagination,
    Switch, Grid, TextField
} from "@mui/material";
import {Item} from "semantic-ui-react";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import "./AddCoin.css";
import {FaCoins} from "react-icons/fa";
import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import {toast} from "react-toastify";
import {useCounter, useCounterActions} from "../../../Context/CounterProvider";
import {add} from "react-modal/lib/helpers/classList";
import {AiOutlinePlus, AiOutlineMinus, AiOutlineClose} from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
const styles = makeStyles(theme => ({
    button:{
        background:"linear-gradient(to right, #F7C59F 50%, #004E89 50%)",
        backgroundPosition:"right bottom",
        color:"#F7C59F",
        border:"solid 2px #F7C59F",
        borderRadius:"15px",
        transition:"all 0.1s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            color:"#004E89"
        }
    },
    button2:{
        background:"linear-gradient(to right, #d91d1d 50%, #004E89 50%)",
        backgroundPosition:"right bottom",
        color:"#d91d1d",
        border:"solid 2px #d91d1d",
        borderRadius:"15px",
        transition:"all 0.1s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            color:"#004E89"
        }
    },
    custom:{
        borderRadius:"15px",
        width:"8rem",
        "& fieldset": { border:"none"}
        }


}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    height: "52%",
    borderRadius:"15px",
    bgcolor: '#004E89',
    boxShadow: 'inset 0px 0px 0px 8px #1A659E ',
    overflow: "hidden"
};
let username = "";
let access_token = "";

if (localStorage.getItem('tokens')) {
    const Data = JSON.parse(localStorage.getItem('tokens'));
    username = Data.username;
    access_token = Data.access;
}
export default function AddCoinToUser(props)
{

    const counter = useCounter();
    const setCounter = useCounterActions();
    const classes = styles();
    const [selectedDiv, setSelected] = useState(null);
    const [addCoin, setAddCoin] = useState(0);
    const coinArray = [2,5,8];
    const [customCoin, setCustomCoin] = useState(0);
    const handleCustomCoinChange = (event) => {
        if(event.target.value >= 0) {
            setAddCoin(event.target.value);
            setSelected(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Custom Coin:", addCoin);
    };
    const onSubmit = async (event) => {
        event.preventDefault();


        axios({
            method: "put",
            url: `https://api.nomadjourney.ir/api/v1/accounts/add-coin/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data : {
                coin_to_buy: addCoin
            }
        }).then((res) => {
            console.log(res);
            toast.success(`You bought ${addCoin} coins.`);
            setCounter(counter+1);
            props.setOpen(false);
            setSelected(null);
            setAddCoin(0);

        }).catch((error) => {
            toast.error("Something went wrong while updating information.");
            console.log(error);
        })
    }
    const handleClose = () => {
        props.setOpen(false);
        setSelected(null);
        setAddCoin(0);
    }
    return(
        <Modal open={props.open} onClose={handleClose} >
            <Box sx={{...style}}>
                <div style={{justifyContent:"center",
                alignItems:"center", display:"flex",
                paddingTop:"3rem",paddingBottom:"3rem"}}>
                    <IconButton
                        edge="end"
                        onClick={handleClose}
                        size={"medium"}
                        sx={{ position: "absolute", top: "1rem", right: "2rem", color:"#EFEFD0" }}
                    >
                        <AiOutlineClose />
                    </IconButton>
                    <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                            <Typography
                                component="h4"
                                style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold",
                                    color:"#EFEFD0"}}>
                                <h2>
                                    You have {props.current_coin} coin right now!
                                </h2>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                        <Stack direction={`row`} spacing={6} sx={{paddingTop:"1rem"}}>
                            {coinArray.map((item, key) => (
                                <Item>
                                <div className={selectedDiv !== key ?
                                    `coin-box` : `selected-coin-box`}
                                onClick={() => {
                                    setSelected(key)
                                    setAddCoin(item)
                                }}>
                                    <Stack spacing={3}>
                                        <Item>
                                            <div style={{marginTop:"1rem"}}>
                                                <FaCoins size={20} style={{
                                                    color:"#EFEFD0"
                                                }} />
                                            </div>
                                        </Item>
                                        <Item>
                                            <Typography
                                                component="h4"
                                                style={{ display: "flex", alignItems: "center",
                                                    fontSize:"20px", fontWeight: "bold",marginTop:"-1rem",
                                                    color:"#EFEFD0"}}>
                                                {item}
                                            </Typography>

                                        </Item>
                                    </Stack>
                                </div>
                                    <Typography
                                        component="h4"
                                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem",
                                            fontSize:"18px", fontWeight: "bold",
                                            color:"#EFEFD0"}}>
                                        ${item*20}
                                    </Typography>
                                </Item>
                            ))}
                        </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent: "center", alignItems: "center", display: "flex" }}>
                            <div style={{paddingTop:"1rem", width:"100%", justifyContent: "center",
                                alignItems: "center", display: "flex" }}>
                                <h6 style={{ fontWeight: "bold", paddingRight: "3rem",
                                    color: '#EFEFD0'}}>
                                    Add Coin
                                </h6>
                                <TextField
                                    className={classes.custom}
                                    type="text"
                                    InputProps={{
                                        style: { color: '#EFEFD0',
                                            fontWeight:"bold",
                                            backgroundColor:"rgba(239,239,208,0.11)",
                                            border:"none"},
                                        disableUnderline: true}}
                                    value={addCoin}
                                    onChange={handleCustomCoinChange}
                                    variant="outlined"
                                    size={`small`}
                                />
                                <IconButton sx={{color:"#EFEFD0"}}
                                    size={"medium"}
                                    onClick={() => {
                                    setAddCoin(parseInt(addCoin) + 1);
                                    setSelected(null);
                                }}>
                                    <AiOutlinePlus />
                                </IconButton>
                                <IconButton sx={{color:"#EFEFD0", }}
                                    size={"medium"}
                                        onClick={() => {
                                    setAddCoin(
                                        parseInt(addCoin) > 0 ? parseInt(addCoin) - 1 : 0);
                                    setSelected(null);
                                }}>
                                    <AiOutlineMinus />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent: "center", alignItems: "center", display: "flex" }}>
                            <div style={{width:"100%", justifyContent: "center",
                                alignItems: "center", display: "flex" }}>
                                <h6 style={{ fontWeight: "bold", marginLeft:"-5.5rem",
                                    paddingRight:"0.5rem",
                                    color: '#EFEFD0'}}>
                                    Total (in $USD)
                                </h6>
                                <TextField
                                    className={classes.custom}
                                    type="text"
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "#EFEFD0",
                                        },
                                    }}
                                    InputProps={{
                                        style: { color: '#EFEFD0',
                                            fontWeight:"bold",
                                            backgroundColor:"rgba(239,239,208,0.11)",
                                            border:"none"},
                                        disableUnderline: true}}
                                    InputLabelProps={{
                                        style: { color: '#EFEFD0', fontWeight: "bold" }
                                    }}
                                    value={`$${parseInt(addCoin)*20}`}
                                    onChange={handleCustomCoinChange}
                                    variant="outlined"
                                    size={`small`}
                                    disabled
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                            <Stack direction={`row`} spacing={4} sx={{paddingTop:"1rem", marginLeft:"1.5rem"}}>
                                <Item>
                                    <Button
                                        sx={{
                                            background:"linear-gradient(to right, #F7C59F 50%, #004E89 50%)",
                                            backgroundPosition:"right bottom",
                                            color:"#F7C59F",
                                            border:"solid 2px #F7C59F",
                                            borderRadius:"15px",
                                            transition:"all 0.1s ease-out",
                                            display:"block",
                                            backgroundSize:"200% 100%",
                                            "&:hover":{
                                                backgroundPosition:"left bottom",
                                                color:"#004E89"
                                            }
                                        }}
                                    onClick={onSubmit}>
                                        Buy More Coins
                                    </Button>
                                </Item>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Modal>
    )

}