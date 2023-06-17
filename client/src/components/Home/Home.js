import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputLabel } from '@mui/material';
// import 'react-tagsinput/react-tagsinput.css';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/Posts';
import useStyles from './styles';
import Paginate from '../Pagination';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles;
    const navigate = useNavigate();
    const location = useLocation();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        searchPost();
      }
    };

    const handleAddChip = (chip) => {
      setTags([...tags, chip]);
    };
  
    const handleDeleteChip = (chip) => {
      setTags(tags.filter((tag) => tag !== chip));
    }

    const handleChange = (newTags) => {
      setTags(newTags);
    };

    const searchPost = () => {
      if(search.trim() || tags){
  
        dispatch(getPostsBySearch({ search: search , tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`)
      }else{
        navigate("/")
      }
    }
 
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} style={{ borderRadius: 4, marginBottom: '1rem', display: 'flex', padding: '16px'}} position='static' color='inherit'>
                <TextField name='search' variant='outlined' label="Search Memories" fullWidth value={search} onKeyDown={handleKeyDown} onChange={(e) => { setSearch(e.target.value) }} />
                <InputLabel style={{ margin: '10px 0' }} value={tags} onAdd={handleAddChip} onChange={handleChange} onDelete={handleDeleteChip} label="Search Tags" variant='outline'/>
                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'> Search </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length) && (
              <Paper elevation={6}>
                <Paginate page={page} className={classes.pagination} style={{borderRadius: 4, marginTop: '1rem',padding: '16px'}} />
              </Paper> )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
