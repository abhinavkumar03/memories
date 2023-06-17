import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import Icon from "./icon";
import { LockOutlined } from '@mui/icons-material';
import Input from './Input';
import useStyles from './styles';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { createTheme } from '@mui/material';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    let navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFromData] = useState(initialState);
    const dispatch = useDispatch();


    const theme = createTheme((theme) => ({ }));



    const handleShowPassword = () => {
      setShowPassword((prevShowpassword)=> !prevShowpassword);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(isSignup){
        dispatch(signup(formData, navigate))
      }else{
        dispatch(signin(formData, navigate))
      }
    }

    const handleChange = (e) => {
      setFromData({...formData, [e.target.name] : e.target.value})
    }
    const googleSuccess = async (res) => {
      const result = jwt_decode(res.credential); // undefined
      const client = res?.clientId;
      
      console.log(result);

      try {
        dispatch({ data: { result, client }, type: 'AUTH' });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    
    const googleError = (error) => {
      console.log(error);
      // Handle Google login error here
    };

    const switchMode = () => {
      setIsSignup((prevIsSignup)=> !prevIsSignup);
      setShowPassword(false);
    }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column',  alignItems: 'center',
    padding: theme.spacing(2)}}>
        <Avatar  style={{margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main}}>
          <LockOutlined/>
        </Avatar>
        <Typography variant="h5">{isSignup? 'Sign Up' : 'Sign In'}</Typography>
        <form action="" style={{width: '100%', marginTop: theme.spacing(3)}} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus="true" half/>
                <Input name="lastame" label="Last Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}



            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: theme.spacing(2, 0, 2, 2)}}>{isSignup? 'Sign Up': 'Sign In'}</Button>
            <div style={{margin: theme.spacing(0, 0, 0, 2)}} >
            <GoogleLogin fullWidth 
              clientId="435406527920-e6hcotuj5fj19sskellb3jpenmf91hif.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Sign in with Google
                </button>
              )}
            />
            </div>
            <Grid container justifyContent="flex-end"><Grid item><Button onClick={switchMode}>{isSignup? 'Already have account? Sign In': 'Dont have account? Sign In'}</Button></Grid></Grid>
          </Grid>
        </form>

      </Paper>

    </Container>
  )
}

export default Auth;