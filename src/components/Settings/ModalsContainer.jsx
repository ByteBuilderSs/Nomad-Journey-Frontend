import React, { useState } from 'react'
import {
    Card,
    Box,
    Paper,
    MenuList,
    ListItemIcon,
    Typography,
    MenuItem,
    Divider,
    ListItemText,
    Button,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import ChangeEmailDialog from './Modals/ChangeEmail';
import ChangePasswordDialog from './Modals/ChangePassword';
import ChangeAddressDialog from './Modals/ChangeAddress';

export default function ModalsContainer(props) {
    const [disabled_p, setDisabledP] = useState(false);
    const [open_p, setOpenP] = useState(false);
    const [requestData_p, setRequestDataP] = useState({});

    const [disabled_e, setDisabledE] = useState(false);
    const [open_e, setOpenE] = useState(false);
    const [requestData_e, setRequestDataE] = useState({});

    const [disabled_a, setDisabledA] = useState(false);
    const [open_a, setOpenA] = useState(false);
    const [requestData_a, setRequestDataA] = useState({});

    const openChangePassword = (event) => {
        setOpenP(true);
        setDisabledP(false);
    }

    const openChangeEmail = (event) => {
        setOpenE(true);
        setDisabledE(false);
    }

    const openChangeAddress = (event) => {
        setOpenA(true);
        setDisabledA(false);
    }

    return (
        <React.Fragment>
            <Paper  sx={{ bgcolor: "white" }}>
                <MenuList>
                    <MenuItem disableRipple>
                        <ListItemText>Account</ListItemText>
                    </MenuItem>
                    <Divider sx={{ borderBottomWidth: 2, }}/>
                    <MenuItem onClick={(event) => openChangeEmail(event)}>
                        <ListItemIcon>
                            <EditIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>Change My Email</ListItemText>
                    </MenuItem>
                    <Divider sx={{ borderBottomWidth: 2, }}/>
                    <MenuItem onClick={(event) => openChangePassword(event)}>
                        <ListItemIcon>
                            <EditIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>Change My Password</ListItemText>
                    </MenuItem>
                    <Divider sx={{ borderBottomWidth: 2, }}/>
                    <MenuItem onClick={(event) => openChangeAddress(event)}>
                        <ListItemIcon>
                            <HomeIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>Change My Address</ListItemText>
                    </MenuItem>
                </MenuList>

                <ChangePasswordDialog 
                    open={open_p}
                    setOpen={setOpenP}
                    disabled={disabled_p}
                    setDisabled={setDisabledP}
                    setRequestData={setRequestDataP}
                    requestData={requestData_p}
                    
                />
                <ChangeEmailDialog 
                    open={open_e}
                    setOpen={setOpenE}
                    disabled={disabled_e}
                    setDisabled={setDisabledE}
                    setRequestData={setRequestDataE}
                    requestData={requestData_e}
                />
                <ChangeAddressDialog 
                    open={open_a}
                    setOpen={setOpenA}
                    disabled={disabled_a}
                    setDisabled={setDisabledA}
                    setRequestData={setRequestDataA}
                    requestData={requestData_a}
                    user={props.user}
                    setUser={props.setUser}
                    />
            </Paper >
        </React.Fragment>
    )
}
