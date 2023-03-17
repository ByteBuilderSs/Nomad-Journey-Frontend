import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const formSchema = Yup.object().shape({
      password: Yup.string()
        .required('Password is mendatory')
        .min(8, 'Password must be at 3 char long'),
        ConfirmPassword: Yup.string()
        .required('Password is mendatory')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });
  const formOptions = { resolver: yupResolver(formSchema) }
  // const { register, handleSubmit, reset, formState } = useForm(formOptions)
  // const { errors } = formState
  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))
    return false
  }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      <Grid container component="main" sx={{ height: '100vh',justifyContent:'center'}} >
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
              Sign UP
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="FirstName"
                label="FirstName"
                name="FirstName"
                autoComplete="FirstName"
                autoFocus
              />
              <TextField
              margin="normal"
              required
              fullWidth
              id="Famliy Name"
              label="Famliy Name"
              name="Famliy Name"
              autoComplete="Famliy Name"
              autoFocus
            />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="ConfirmPassword"
                label="Confirm Password"
                type="Confirm password"
                id="Confirm password"
                autoComplete="current-password"
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
                Sign UP
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
      </StyledEngineProvider>
     
    </ThemeProvider>
  );
}