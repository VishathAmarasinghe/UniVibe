import React, { useEffect, useState } from 'react'
import { Container,AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts,getPostBySearch } from '../../Actions/Posts';
import Paginate from '../Pagination';
import { MuiChipsInput } from 'mui-chips-input';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentID,setCurrentID]=useState(null);
    const [search, setSearch]=useState("");
    const [tags,setTages]=useState([])
    const query=useQuery();
    const navigate=useNavigate();
    const page=query.get("page") || 1;
    const searchQuery=query.get("searchQuery");


    const handleKeyPress=(e)=>{
      if (e.keyCode==13) {
        searchPost()
      }
    }

    const handleAdd=(tag)=>{
        console.log("handling here tags ",tag);
        setTages(...tags,tag);
    }

    const handleDelete=(tagTodelete)=>{
      setTages(tags.filter((tag)=>tag!=tagTodelete));
    }


    const searchPost=()=>{
      if (search.trim() || tags) {
        console.log("tags ",tags);
        dispatch(getPostBySearch(
          {
            search,tags:tags.join(',')
          }
        ));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
      }else{
        navigate("/")
      }
    }


  const dispatch=useDispatch();

  // useEffect(()=>{
  //   dispatch(getPosts());
  //   console.log("fetching Postes");
  // },[currentID,dispatch])
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} flexDirection={{xs:"column-reverse",md:"row",lg:"row"}}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentID={setCurrentID}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppBar style={{
                borderRadius: 4,
                marginBottom: '1rem',
                display: 'flex',
                padding: '16px',
              }} position='static' color='inherit'>
               <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
               <MuiChipsInput value={tags}  onChange={handleAdd} onDeleteChip={handleDelete}  label="Search tags" variant='outlined' style={{margin:"10px 0"}}/>
               <Button onClick={searchPost} style={{}} color='primary' variant='contained'>
                Search Post
               </Button>
              </AppBar>
              <Form currentID={currentID} setCurrentID={setCurrentID}/>
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6}>
                <Paginate page={page}/>
                </Paper>
              )}
              
            </Grid>

          </Grid>
        </Container>

      </Grow>
  )
}

export default Home