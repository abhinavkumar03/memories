import axios from 'axios';

const BaseUrl = process.env.BaseUrl || 'http://localhost:5000';
const API = axios.create({ baseURL: BaseUrl  })

API.interceptors.request.use((req) => {
    try {
        if(localStorage.getItem('profile')){
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        }
    } catch (error) {
        console.log(error)
    }
    
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData); 
export const signUp = (formData) => API.post('/user/signup', formData); 
