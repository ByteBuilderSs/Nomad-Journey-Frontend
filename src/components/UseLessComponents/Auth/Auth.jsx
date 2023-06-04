import React, { useState } from "react";
import "./Auth.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";
import { Link, useParams } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default function Authentication() {
    const { tabIndex } = useParams();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };


    React.useEffect( () => {
        if (0 == tabIndex || 1 == tabIndex) {
            setValue( parseInt(tabIndex) );    
        }
    }, [ tabIndex ] );

    return (
        <div className="auth">
        <Box
            className="Mui-login-box"
            sx={{ bgcolor: "background.paper", width: 500 }}
        >
            <AppBar sx={{ backgroundColor: "rgba(0,78,137,1)" }} position="static">
            <Tabs
                value={value}
                onChange={handleChange}
                // indicatorColor="secondary"
                
                variant="fullWidth"
                TabIndicatorProps={{
                style: {
                    backgroundColor: "#1A237D",
                },
                }}
            >
                <Tab
                    component={Link}
                    tabIndex={0}
                    style={{ color: "white", fontSize: 18 }}
                    label="Register"
                    {...a11yProps(0)}
                />
                <Tab
                    component={Link}
                    tabIndex={1}
                    style={{ color: "white", fontSize: 18 }}
                    label="Login"
                    {...a11yProps(1)}
                />
            </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <Signup />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Login />
            </TabPanel>
        </Box>
        </div>
);
}
