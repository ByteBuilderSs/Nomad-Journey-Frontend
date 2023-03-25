import React, { useState } from "react";
import "./Signup.css";
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    FormControl,
    Button,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";

const Signup = () => {
    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [cofirmPasswordError, setCofirmPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const handleChange = (prop) => (event) => {
        if (prop === "confirmPassword" && event.target.value !== values.password)
            setCofirmPasswordError(true);
        else if (
        prop === "confirmPassword" &&
        event.target.value === values.password
        )
        setCofirmPasswordError(false);
        if (prop === "firstname") setFirstnameError(false);
        if (prop === "lastname") setLastnameError(false);
        if (prop === "password") setPasswordError(false);
        if (prop === "username") setUsernameError(false);
        if (prop === "email") setEmailnameError(false);

        setValues({ ...values, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
            setValues({
            ...values,
            showPassword: !values.showPassword,
            });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSignup = (e) => {
        e.preventDefault();
        let isDataValid = true;
        if (!values.password) {setPasswordError(true); isDataValid=false;}
        if (!values.username) {setUsernameError(true); isDataValid=false;}
        if (!values.confirmPassword) {setCofirmPasswordError(true); isDataValid=false;}
        if (!values.firstName) {setFirstnameError(true); isDataValid=false;}
        if (!values.lastName) {setLastnameError(true); isDataValid=false;}
        if (!values.email) {setLastnameError(true); isDataValid=false;}


        if (values.password && 
            values.username && 
            values.confirmPassword &&
            values.firstName &&
            values.lastName &&
            values.email) {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    console.log("***************** in email verification *************************");
                    isDataValid = false;
                    toast.error("Email address is not valid", {
                        position: toast.POSITION.TOP_LEFT,
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                setFirstnameError(false);
                setLastnameError(false);
                setEmailnameError(false);
                setPasswordError(false);
                setCofirmPasswordError(false);
                setUsernameError(false);
                if (isDataValid) {
                    axios({
                        method: "post",
                        url: "http://127.0.0.1:8000/api/v1/accounts/register/",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: {
                            first_name: values.firstName,
                            last_name: values.lastName,
                            email: values.email,
                            password: values.password,
                            password_again: values.confirmPassword,
                            username: values.username
                        }
                    })
                    .then((res) => {
                        localStorage.setItem("username", values.username);
                        let tabIndex = 1;
                        window.location=`/authentication/${tabIndex}`;
                        toast.success("Your account created successfully", {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch((error) => {
                        toast.error("Unexpected error has occurred", {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                }
            }

    }
    return (
        <div>
        <div className="authLogo">
            <img src={logo} alt="logo" />
        </div>
        <div className="authLogoLabel" style={{ marginBottom: "1rem"}}>
            <h1>
                Welcome to <b className="NJText">Nomad Journey</b> !
            </h1>
        </div>
        <Box
            component="form"
            sx={{
            "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
            }}
            noValidate
            autoComplete="off"
        >
            <form
            id={"Signup-Form"}
            onSubmit={(e) => {
                e.preventDefault();
                onSignup();
            }}
            >
            <FormControl fullWidth variant="outlined">
                <TextField
                    error={firstnameError}
                    helperText={firstnameError ? "Enter your firstname!" : ""}
                    id="outlined-adornment-firstname"
                    type={"text"}
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    label="Firstname"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                error={lastnameError}
                helperText={
                    lastnameError ? "Enter your lastname!" : ""
                }
                id="outlined-adornment-lastname"
                type={"text"}
                value={values.lastName}
                onChange={handleChange("lastName")}
                label="Lastname"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                error={usernameError}
                helperText={
                    usernameError ? "Enter a username!" : ""
                }
                id="signup-outlined-adornment-username"
                type={"text"}
                value={values.username}
                onChange={handleChange("username")}
                label="Username"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                error={emailError}
                helperText={
                    emailError ? "Enter a valid email!" : ""
                }
                id="signup-outlined-adornment-email"
                type={"text"}
                value={values.email}
                onChange={handleChange("email")}
                label="Email"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                error={passwordError}
                helperText={
                    passwordError ? "Peek a valid password!" : ""
                }
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                InputProps={{
                    endAdornment: (
                    <InputAdornment>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                label="Password"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                error={cofirmPasswordError}
                helperText={
                    cofirmPasswordError ? "Confirm password is not valid!" : ""
                }
                id="outlined-adornment-confirmPassword"
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                InputProps={{
                    endAdornment: (
                    <InputAdornment>
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showConfirmPassword ? (
                            <VisibilityOff />
                        ) : (
                            <Visibility />
                        )}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                label="Password confirmation "
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <Button
                    sx={{ m: 1 }}
                    onClick={onSignup}
                    variant="outlined"
                    size="large"
                    type="submit"
                >
                Submit
                </Button>
            </FormControl>
            </form>
        </Box>
        </div>
    )
}

export default Signup
