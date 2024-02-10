import mongoose from "mongoose";
import PostMessage from "../Models/postMessage.js";


export const getPosts=async (req,res)=>{
    const {page}=req.query;
    try {
        const LIMIT=8;
        const startIndex=(Number(page)-1)*LIMIT; //get the starting index of every page
        const total =await PostMessage.countDocuments({});
        const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        console.log(posts);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const getPost=async (req,res)=>{
    const {id}=req.params;
    try {
        
        const post=await PostMessage.findById(id);
        console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error.message)
    }
}


export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});

    try {
      await  newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}


export const updatePost=async(req,res)=>{
    const {id:_id}=req.params;
    console.log("post ID came here ", _id);
    const post=req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post With that ID");
        
    }else{
        
       const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
       res.json(updatedPost);
    }

}

export const deletePost=async(req,res)=>{
    const {id:_id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post With that ID");
        
    }else{
        
     await PostMessage.findByIdAndDelete(_id);
       res.json({message:'post Deleted Successfully'});
    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    console.log(req.userId);

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that ID");
    }

    try {
        let post = await PostMessage.findById(_id);

        if (!post) {
            return res.status(404).send("No post found with that ID");
        }

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            console.log("User liked the post.");
            post.likes.push(req.userId);
        } else {
            console.log("User unliked the post.");
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            { likes: post.likes, likeCount: post.likes.length },
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        console.error("Error occurred while liking the post:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



export const getPostBySearch=async(req,res)=>{
    console.log("searching came here");
    const {searchQuery, tags}=req.query;

    try {
        const title =new RegExp(searchQuery,"i");
        console.log("search q ",searchQuery," search tags ",tags);
        console.log(tags.split(","));
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        console.log(posts);


        res.json({data:posts});
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error});
    }
}