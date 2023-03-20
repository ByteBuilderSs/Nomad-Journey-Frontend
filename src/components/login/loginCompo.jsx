
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import {useFormik} from "formik";
import * as Yup from "yup";

const theme = createTheme();

export default function LogInSide() {

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  
  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))
    return false
  }
  };

  return (
    
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      <Grid container component="main" sx={{ height: '60vh',justifyContent:'center',paddingTop:'5vh',width:'170vh'}} >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}  component={Paper} elevation={6} square sx={{ alignContent:"center",
        justifyContent:"center"}} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LogIn
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
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
                onChange={formik.handleChange}
              />
              <TextField
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
                onChange={formik.handleChange}

              />
             
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid> */}
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
      </StyledEngineProvider>
     
    </ThemeProvider>
  );
}