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
    Switch, Grid
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
const styles = makeStyles(theme => ({
    button:{
        background:"linear-gradient(to right, #1A659E 50%, #F7C59F 50%)",
        backgroundPosition:"right bottom",
        color:"#1A659E",
        border:"solid 2px #1A659E",
        borderRadius:"15px",
        transition:"all 0.3s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            color:"#F7C59F"
        }
    },
    button2:{
        background:"linear-gradient(to right, #af0000 50%, #F7C59F 50%)",
        backgroundPosition:"right bottom",
        color:"#af0000",
        border:"solid 2px #af0000",
        borderRadius:"15px",
        transition:"all 0.3s ease-out",
        display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            color:"#F7C59F"
        }
    }

}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    height: "35%",
    borderRadius:"15px",
    bgcolor: '#F7C59F',
    boxShadow: 24,
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
    const coinArray = [2,5,10];
    const onSubmit = async (event) => {
        event.preventDefault();


        axios({
            method: "put",
            url: `http://188.121.102.52:8000/api/v1/accounts/add-coin/${username}`,
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
        }).catch((error) => {
            toast.error("Something went wrong while updating information.");
            console.log(error);
        })
    }
    const handleClose = () => {
        props.setOpen(false);
        setSelected(null);
    }
    return(
        <Modal open={props.open} onClose={handleClose} >
            <Box sx={{...style}}>
                <div style={{justifyContent:"center",
                alignItems:"center", display:"flex",
                paddingTop:"3rem",paddingBottom:"3rem"}}>
                    <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                            <Typography
                                component="h4"
                                style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold",
                                    color:"#1A659E"}}>
                                <h2>
                                    You have {props.current_coin} coin right now!
                                </h2>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                        <Stack direction={`row`} spacing={5}>
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
                                                    color:"#1A659E"
                                                }} />
                                            </div>
                                        </Item>
                                        <Item>
                                            <Typography
                                                component="h4"
                                                style={{ display: "flex", alignItems: "center",fontWeight: "bold",
                                                    color:"#1A659E"}}>
                                                {item}
                                            </Typography>

                                        </Item>
                                    </Stack>
                                </div>
                                    <Typography
                                        component="h4"
                                        style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontWeight: "bold",
                                            color:"#1A659E"}}>
                                        ${item*20}
                                    </Typography>
                                </Item>
                            ))}
                        </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent:"center",
                            alignItems:"center", display:"flex"}}>
                            <Stack direction={`row`} spacing={4}>
                                <Item>
                                    <Button
                                        className={classes.button2}
                                        onClick={handleClose}>
                                        Close
                                    </Button>
                                </Item>
                                <Item>
                                    <Button
                                    className={classes.button}
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