import express from "express";
import { createPost, getPosts,updatePost,deletePost, likePost, getPostBySearch, getPost } from "../Controllers/posts.js";
import auth from '../Middleware/auth.js';
const router=express.Router();

router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.get("/search",getPostBySearch);


export default router;