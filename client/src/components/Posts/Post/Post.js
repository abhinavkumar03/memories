import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/Posts';
import useStyles from './Style';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'; 
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
;

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles;
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id || user?.result?.googleId;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if(hasLikedPost){
      setLikes(likes.filter((id) => id !== userId));
    }else{
      setLikes([...likes, userId ]);
    } // check for google id 
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  }; 

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  

  return (
    <Card className={classes.card} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',borderRadius: '15px', height: '100%', position: 'relative'}} raised elevation={6}>
      <div onClick={openPost}>
      <CardMedia className={classes.media} style={{ height: 0, paddingTop: '56.25%', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'darken'  }} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay} style={{position: 'absolute', top: '20px', left: '20px', color: 'white'}}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.name || user?.result?.name === post?.name) && 
      <div className={classes.overlay2} style={{position: 'absolute', top: '20px', right: '20px', color: 'white'}}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>}
      <div className={classes.details} style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} style={{padding: '0 16px'}} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      </div>
      <CardActions className={classes.cardActions} style={{ padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between'}}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}><Likes/> </Button>
        {(user?.result?.googleId === post?.name || user?.result?.name === post?.name) && <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button> }
        
      </CardActions>
    </Card>
  );
};

export default Post;