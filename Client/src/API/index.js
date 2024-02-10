import axios from 'axios';


const API=axios.create({
    baseURL:'http://localhost:5000'
})


API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')) {
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

const url='http://localhost:5000/posts';
 
export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const createPost=(newpost)=>API.post("/posts",newpost);
export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const fetchPostBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)


export const signIn=(FormData)=>API.post("/user/signin",FormData);
export const signUp=(FormData)=>API.post("/user/signup",FormData);


