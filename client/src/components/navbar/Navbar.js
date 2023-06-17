import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { deepPurple } from '@mui/material/colors';

import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles;
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
    <AppBar className={classes.appBar} style={{borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px'}} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer} style={{display: 'flex', alignItems: 'center'}}>
        <img src={memoriesText} alt="" height="45px"/>
        <img className={classes.image} style={{marginLeft: '15px'}} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar} style={{display: 'flex', justifyContent: 'flex-end', width: '400px'}}>
        {user ? (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
            <Avatar className={classes.purple} style={{backgroundColor: deepPurple[500]}} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} style={{display: 'flex', alignItems: 'center'}} varient="h6">{user.result.name}</Typography>
            <Button variant="container" className={classes.logout} style={{backgroundColor: 'tomato'}} onClick={handleLogout} color="secondary">Logout</Button>
          </div>
        ):(
          <Button component={Link} to="/auth" className={classes.login} style={{backgroundColor: 'DodgerBlue'}} variant="container" color="primary" background="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
