import { PaginationItem,Pagination } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getPosts } from '../Actions/Posts'


const Paginate = ({page}) => {
  const dispatch=useDispatch();
  const {numberOfPages}=useSelector((state)=>state.posts);

  useEffect(()=>{
    if (page) {
      dispatch(getPosts(page));
    }

  },[page])
  return (
    <Pagination
    style={{justifyContent:'space-around'}}
    count={numberOfPages}
    page={Number(page) ||1}
    variant='outlined'
    color='primary'
    renderItem={(item)=>(
      <PaginationItem
      {...item}
      component={Link}
      to={`/posts?page=${item.page}`}
      />
    )}
    />
  )
}

export default Paginate;