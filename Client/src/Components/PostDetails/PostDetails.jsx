import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostBySearch } from '../../Actions/Posts';
import { Paper,Typography,Divider,CircularProgress } from '@mui/material';



const PostDetails = () => {
    const {post,posts,isLoading}=useSelector((state)=>state.posts);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        dispatch(getPost(id));
    },[id])


    useEffect(()=>{
        if (post) {
            dispatch(getPostBySearch({search:"none",tags:post?.tags.join(",")}));
        }
    },[post])


    if (isLoading) {
        return (
          <Paper elevation={6} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh'
          }}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }

      const openPost = (_id) => navigate(`/posts/${_id}`);


    const recommendedPosts=posts.filter(({_id})=>_id===post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div style={{display:"flex",
    width:"100%"
    }}>
        <div style={{
            borderRadius: '20px',
            margin: '10px',
            flex: 1,
        }}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div style={{
             marginLeft: '20px',
        }}>
          <img style={{
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '400px',
          }} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div style={{
            borderRadius: '20px',
    margin: '10px',
    flex: 1,
        }}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div style={{
            display:"flex"
          }}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
      </Paper>
  )
}

export default PostDetails