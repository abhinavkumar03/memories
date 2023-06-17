import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material';

import useStyles from './Style';
import { createPost, updatePost } from '../../actions/Posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles;
  const user = JSON.parse(localStorage.getItem('profile'));
  const location = useLocation();
  const navigate = useNavigate();

  const theme = createTheme((theme) => ({ }));

  useEffect(() => {
    if (post) setPostData(post);
  }, [location, post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name }, navigate));
      clear();
    }
  };

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper} style={{}}>
        <Typography variant='h6' align='center'>Please Sign in to create your own memories and like other's memories</Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6} raised>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} style={{display:'flex', flexWrap: 'wrap', justifyContent: 'center'}} onSubmit={handleSubmit}>
        <Typography variant="h6" style={{margin: theme.spacing(1)}} >{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" style={{margin: theme.spacing(1)}}  variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" style={{margin: theme.spacing(1)}} variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" style={{margin: theme.spacing(1)}} variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput} style={{width: '97%', margin: theme.spacing(1)}}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} style={{margin: theme.spacing(1)}}  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{margin: theme.spacing(1)}}  color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;