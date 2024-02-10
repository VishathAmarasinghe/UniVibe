import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import memories from "../../assets/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode"; 

const Navbar = () => {
  
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch=useDispatch();
  const navigate=useNavigate(); 
  const location=useLocation();

  console.log("user ",user);
  useEffect(()=>{
    const token=user?.token;

    if (token) {
      const decodedToken=jwtDecode(token);
      if (decodedToken.exp*1000<new Date().getTime()) {
        logOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")))
  },[location])


  const logOut=()=>{
    dispatch({
      type:"LOGOUT"
    })
    navigate("/auth") 
    setUser(null)
  }
  return (
    <AppBar
      style={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component={Link}
          to="/"
          style={{
            color: "rgba(0,183,255, 1)",
            textDecoration: "none",
          }}
          color="red"
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          style={{ marginLeft: "15px" }}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar
        style={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar
              style={{
                color: "black",
                backgroundColor: "green",
              }}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt[0]}
            </Avatar>
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
              }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logOut} style={{}}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
