import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import SiteLogo from "../../Assets/images/nomad-journey-logo-3.jpg";


function Header(){
    const navigate = useNavigate()
    return(
        <AppBar sx={{ backgroundColor: "#E55405"}}  position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box sx={{ 
                        flexGrow: 1, 
                        display: {xs: "flex", lg: "none"},
                        height: "4.5rem",
                        marginTop: "1rem",
                        }}
                    >
                    
                    </Box>
                    <IconButton
                        style={{ marginLeft: "10rem", width: "4.1rem" }}
                        sx={{ display: {xs: "none", lg: "flex"} }}
                    >
                        <Avatar alt="LOGO" src={SiteLogo} style={{ width: "100%"}}/>
                        
                    </IconButton>

                    <Typography
                        variant="h5"
                        component="div"
                        noWrap
                        sx={{  flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}
                        style={{ marginLeft: "1rem"}}
                        className="website-name"
                    >
                        Nomad Journey
                    </Typography>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
                            
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <div class="main-button" style={{cursor : "pointer", marginRight: "5px"}} onClick={() => {navigate("/login")}}>
                                <div className='login-signup' style={{color : "#fff"}}> Login </div>
                            </div>
                            <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                <div className='login-signup' style={{color : "#fff"}}> SignUp </div>
                            </div>
                        </Box>
                        
                    </Box>

                    
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#D97D54",
                                },
                            }}
                            aria-label="secondary tabs example"
                            >
                            {tabs.map((tab) => {
                                return (
                                    <Tab 
                                        component={Link}
                                        to={tab.route}
                                        style={{ color: "white" }}
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                        icon={tab.desktopIcon}
                                    />
                                );
                            })}
                        </Tabs>
                    </Box> */}
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;