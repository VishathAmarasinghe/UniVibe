import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost,updatePost } from "../../Actions/Posts";




const Form = ({currentID, setCurrentID}) => {

  const post=useSelector((state)=>currentID?state.posts.find((p)=>p._id===currentID):null);
  const user=JSON.parse(localStorage.getItem("profile"));


  useEffect(()=>{
    if (post) {
      setPostData(post)
    }
  },[post])


  const dispatch=useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });


  const handleSubmit=(e)=>{
    e.preventDefault();

    if (currentID) {
      dispatch(updatePost(currentID,{...postData,name:user?.result?.name}));
    }else{
      dispatch(createPost({...postData,name:user?.result?.name}));
    }
    clear();

    

  }

  const clear=()=>{
    setCurrentID(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })


  }



  if (!user?.result?.name) {
    return(
      <Paper style={{
        padding:"10px"
      }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Memories and like others's Memories
        </Typography>

      </Paper>
    )
  }




  return (
    <Paper>
      <form
        autoComplete="off"
        noValidate
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentID?"Editing":"Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div style={{
          width: '97%',
          margin: '10px 0',
        }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          style={{
            marginBottom: 10,
          }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
