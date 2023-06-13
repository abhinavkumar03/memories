import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
      const token = user?.token;

      if(token){
        const decodedToken = jwtDecode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogout();
        } 
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    
    }, [location]);

    const handleLogout = () => {
      dispatch({ type: 'LOGOUT' });
      setUser(null);
      navigate("/");
    }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="" height="45px"/>
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
            <Button variant="container" className={classes.logout} onClick={handleLogout} color="secondary">Logout</Button>
          </div>
        ):(
          <Button component={Link} to="/auth" className={classes.login} variant="container" color="primary" background="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
