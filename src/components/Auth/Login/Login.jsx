import React from 'react';
import "./Login.css";
import logo from "../../../Assets/images/nomad-journey-logo-3-fotor-bg-remover-20230323195457.png";
import {
  Box,
  TextField,
  IconButton,
  FormControl,
  InputAdornment,
  Button,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
    passwordError: false,
    emailError: false,
  });

  const handleChange = (prop) => (event) => {
    if (prop === "password") {
      setValues({
        ...values,
        [prop]: event.target.value,
        passwordError: false,
      });
    }
    else if (prop === "email") {
      setValues({
        ...values,
        [prop]: event.target.value,
        emailError: false,
      });
    }
    else {
      setValues({
        ...values,
        [prop]: event.target.value,
      });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onLogin = async (e) => {
    let isDataValid = true;
    e.preventDefault();
    if (!values.email && !values.password) {
      setValues({
        ...values,
        emailError: true,
        passwordError: true,
      });
      isDataValid = false;
    }
    else if (!values.email) {
      setValues({
        ...values,
        emailError: true,
      });
      isDataValid = false;
    }
    else if (!values.password) {
      setValues({
        ...values,
        passwordError: true,
      })
      isDataValid = false;
    }
    else if (values.email && values.password) {
      setValues({
        ...values,
        emailError: false,
        passwordError: false,
      })
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        isDataValid = false;
        toast.error("Email address is not valid", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (isDataValid) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/v1/accounts/token/",
          headers: {},
          data: {
            email: values.email,
            password: values.password
          }
        })
        .then((res) => {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          window.location = "/home/Dashboard/"
        })
        .catch((error) => {
          toast.error("Unexpected error has occurred", {
            position: toast.POSITION.BOTTOM_LEFT,
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
            id={"login-Form"}
            onSubmit={(e) => {
                e.preventDefault();
                onLogin();
            }}
            >
            <FormControl fullWidth variant="outlined">
                <TextField
                  error={values.emailError}
                  helperText={
                      values.emailError ? "Enter a valid email!" : ""
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
                  error={values.passwordError}
                  helperText={
                      values.passwordError ? "Peek a valid password!" : ""
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
                <Button
                    sx={{ m: 1 }}
                    onClick={onLogin}
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

export default Login
