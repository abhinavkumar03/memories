import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="435406527920-e6hcotuj5fj19sskellb3jpenmf91hif.apps.googleusercontent.com">
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Navigate to="/posts"/>}/>
        <Route exact path='/posts' element={<Home/>}/>
        <Route exact path='/posts/search' element={<Home/>}/>
        <Route exact path='/posts/:id' element={<PostDetails/>}/>
        <Route exact path='/auth' element={!user? <Auth/> :<Navigate to={"/posts"} />}/>
      </Routes>
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;