import React from 'react'
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({setCurrentID}) => {

  const {posts,isLoading}=useSelector((state)=>state.posts)


 if (!posts.length && !isLoading) return 'No posts';

  console.log("values ",posts);
  return (
    isLoading ?<CircularProgress/>:(
      <Grid container alignItems="stretch" spacing={3}>
        {
          posts.map((post)=>(
            <Grid
            key={post._id}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            >
              <Post post={post} setCurrentID={setCurrentID}/>

            </Grid>
          ))
        }

      </Grid>
    )
  )
}

export default Posts;