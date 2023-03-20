import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import {useFormik} from "formik";
import { useState} from 'react';
import { useSignup } from '../../hooks/useSignup';
import { LoginSharp } from '@mui/icons-material';
import Image from '../../Assets/images/image.jpg'
//-------------------------------------------------------------
const theme = createTheme();
export default function SignInSide(props)
{

  const [FirstName, setName] = useState("");
  const [FamilyName, setFamilyName] = useState("");
  const [UserName,setUserName]=useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validations=Yup.object({
    FirstName:Yup.string().required().trim().min(3),
    FamliyName:Yup.string().required().trim().min(3),
    email :Yup.string().email("Please enter a valid email").required("Email is required"),
    password:Yup.string().min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol').required("Password is required"),
    ConfirmPassword:Yup.string("Confirm Password is required").oneOf([Yup.ref('password')],'Paasword does not match')});


  const formik=useFormik({
    initialValues:{
      FirstName:"",
      FamliyName:"",
      email:"",
      password:"",
      ConfirmPassword:"",
      errors:""
    },
    validationSchema:validations
  });

  const {signup,isLoading,error} =useSignup()
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(FirstName,FamilyName,Email,password,UserName)
  };

  return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>

          <Grid container component="main" sx={{
            justifyContent:'center',
            paddingTop:'3vh',
            paddingRight:'5vh',
            //backgroundImage:`url(${Image})`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',


          }} >
            <CssBaseline />

            <Grid item xs={10} sm={8} md={4}  component={Paper} elevation={6} square
                  sx={{ alignContent:"center",
                    justifyContent:'center',
                    borderRadius:'5vh',
                    height:'97vh',
                    backgroundColor:'rgb(0,0,0)',
                    backgroundColor: 'rgba(0,0,0, 0.4)',
                    color:'white',
                    fontWeight:'bold',
                    border:'3px solid #f1f1f1',

                    boxShadow :'-3px -3px 9px #aaa9a9a2,3px 3px 7px rgba(147, 149, 151, 0.671)'

                  }} >
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
                  Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                      sx={{backgroundColor :'white',}}
                      margin="normal"
                      required
                      fullWidth
                      id="FirstName"
                      label="FirstName"
                      name="FirstName"
                      autoComplete="First Name"
                      autoFocus
                      onChange={e=>{setName(e.target.value)}}
                      error={formik.errors.fisrtName}
                      helperText={formik.errors.fisrtName}
                  />
                  <TextField
                      sx={{backgroundColor :'white',}}
                      margin="normal"
                      required
                      fullWidth
                      label="FamliyName"
                      id="FamliyName"
                      name="FamliyName"
                      autoComplete="Famliy Name"
                      autoFocus
                      onChange={e=>{setFamilyName(e.target.value)}}
                      error={formik.errors.familyName}
                      helperText={formik.errors.familyName}
                  />
                  <TextField
                      sx={{backgroundColor :'white',}}
                      margin="normal"
                      required
                      fullWidth
                      id="UserName"
                      label="UserName"
                      name="UserName"
                      autoComplete="User Name"
                      autoFocus
                      onChange={e=>{setUserName(e.target.value)}}
                      error={formik.errors.familyName}
                      helperText={formik.errors.familyName}
                  />
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
                  <TextField
                      sx={{backgroundColor :'white',}}
                      margin="normal"
                      required
                      fullWidth
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="Confirm password"
                      autoComplete="current-password"
                      error={formik.errors.ConfirmPassword}
                      helperText={formik.errors.ConfirmPassword}
                      //onChange={formik.handleChange}
                  />
                  {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 ,backgroundColor:'rgba(0,0,0, 0.4)'}}
                      disabled ={isLoading}
                  >
                    Sign Up
                  </Button>
                  {error && <div className='error'>{error}</div>}
                  <Grid container>
                    <Grid item xs>
                      <Link to="#" style={{ color: '#FFF' }}>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/login/" style={{ color: '#FFF' }}>
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