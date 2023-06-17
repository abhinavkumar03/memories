import React, { useState, useRef } from "react";
import { Typography, TextField, Button  } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from '../../actions/Posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
    const classes = useStyles;
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {

        const finalComment = `${user.result.name}: ${comment}`;// curly brackeets
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <div>
            <div className={classes.CommentsOuterContainer} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className={classes.commentsInnerContainer} style={{ height: '200px', overflowY: 'auto', marginRight: '30px'}}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} variant="subtitle1" gutterBottom>
                            <strong>{c.split(':')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (<div style={{ width: '70%'}}>
                    <Typography gutterBottom variant="h6"> Write a comments</Typography>    
                    <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)}  />
                    <Button style={{ marginTop: '10px'}} color="primary" fullWidth disabled={!comment} variant="contained" onClick={handleClick}>Comment</Button>
                </div>)}
            </div>
        </div>
    )
}

export default CommentSection;