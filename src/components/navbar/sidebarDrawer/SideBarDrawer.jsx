import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Link } from "@mui/material";
import {
    MdSettings,
    MdLogout,
    MdManageAccounts,
    MdInbox,
    MdDashboard,
    MdSettingsSuggest,
    MdAccountCircle,
    MdKeyboardArrowDown,
    MdNoteAdd,
} from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";


const SideBarDrawer = (props) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Box>
            <Drawer
                anchor={"left"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                >
                <Box
                    sx={{ width: "20rem"}}
                >
                    <List>
                        <ListItem>
                            <ListItemButton component={Link} to="/">
                                <ListItemIcon>
                                    <MdDashboard style={{  fontSize: "1.2rem" }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} sx={{ color: "black"}}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton component={Link} to="/home/Profile/">
                                <ListItemIcon>
                                <MdAccountCircle style={{  fontSize: "1.2rem" }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} sx={{ color: "black"}}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton  component={Link} to="/home/Inbox/">
                                <ListItemIcon>
                                    <MdInbox style={{  fontSize: "1.2rem" }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Inbox"} sx={{ color: "black"}}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton component={Link} to="/home/PostExperience/">
                                <ListItemIcon>
                                    <MdNoteAdd style={{  fontSize: "1.2rem" }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Post Experience"} sx={{ color: "black"}}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Box>

            </Drawer>
            <IconButton
                size="large"
                onClick={() => setOpenDrawer(!openDrawer)}
                >
                <MenuIcon />
            </IconButton>
        </Box>

    )
}

export default SideBarDrawer
