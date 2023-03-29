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
import ChangeEmailDialog from './Modals/ChangeEmail';
import ChangePasswordDialog from './Modals/ChangePassword';

export default function ModalsContainer() {
    const [disabled_p, setDisabledP] = useState(false);
    const [open_p, setOpenP] = useState(false);
    const [requestData_p, setRequestDataP] = useState({});

    const [disabled_e, setDisabledE] = useState(false);
    const [open_e, setOpenE] = useState(false);
    const [requestData_e, setRequestDataE] = useState({});

    const openChangePassword = (event) => {
        setOpenP(true);
        setDisabledP(false);
    }

    const openChangeEmail = (event) => {
        setOpenE(true);
        setDisabledE(false);
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
            </Paper >
        </React.Fragment>
    )
}
