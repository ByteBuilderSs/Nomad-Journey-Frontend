
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link,Navigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react';
import Image from '../../Assets/images/image2.png'
//-----------------------------------------------------------
const theme = createTheme();

export default function LogInSide() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const validations=Yup.object({
    email :Yup.string().email("Please enter a valid email").required("Email is required"),
    password:Yup.string().min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol').required("Password is required")
  })
  const formik=useFormik({
      initialValues:{
        email:"",
        password:"",
        errors:""
      },
      validationSchema:validations
    })

    const {login,isLoading,error} =useLogin()
    const handleSubmit = async (event) => {
      formik.handleChange();
      event.preventDefault();
      await login(Email,Password)
  };

  return (
    
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      <Grid container component="main" sx={{
         justifyContent:'center',
         paddingTop:'3vh',
         paddingRight:'5vh',
         backgroundImage:`url(${Image})`,
         backgroundSize:'cover',
         backgroundRepeat:'no-repeat',
         backgroundPosition:'center',
        
         
         }}  >
        <CssBaseline />
        <Grid item xs={10} sm={8} md={4}  component={Paper} elevation={6} square  sx={{ alignContent:"center",
            justifyContent:'center',
            borderRadius:'5vh',
            height:'97vh',
            backgroundColor:'rgb(0,0,0)',
            backgroundColor: 'rgba(0,0,0, 0.4)',
            color:'white',
            fontWeight:'bold',
            border:'3px solid #f1f1f1',
           
            boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'
             }}>
          <Box
            sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Typography component="h1" variant="h5">
              LogIn
            </Typography>
            <Formik 
            initialValues={{ email:"",
                            password:"",
                            errors:""}}
                            validationSchema={validations}
                            onSubmit={{
                            email:"",
                            password:"",
                            errors:""}}>
            {({ errors, touched }) =>(

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              sx={{backgroundColor :'white',}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={formik.errors.email}
              helperText={formik.errors.email}
              onChange={e=>{setEmail(e.target.value)}}
            />
            {errors.email &&touched.email  ?(<div>{errors.email}</div>) : null}
            <TextField
              sx={{backgroundColor :'white',}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.errors.password}
              helperText={formik.errors.password}
              onChange={e=>{setPassword(e.target.value)}}

            />
            {errors.password &&touched.password  ?(<div>{errors.password}</div>) : null}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled ={isLoading}
              onClick={()=>{
                if(!error){<Navigate to="/home/Profile/"/>}
              }}
            >
              LogIn
            </Button>
            {error && <div className='error'>{error}</div>}
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2" style={{ color: '#FFF' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" style={{ color: '#FFF' }}>
                  {"Don't have an account? Create "}
                </Link>
              </Grid>
            </Grid>

            </Box>
            )}
           
            </Formik>
          </Box>
        </Grid>
      </Grid>
      </StyledEngineProvider>
     
    </ThemeProvider>
  );
}