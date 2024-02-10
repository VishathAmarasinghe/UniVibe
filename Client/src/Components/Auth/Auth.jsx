import {
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import {  useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../Actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [isSignup, setisSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const googleSuccess=async(res)=>{
    console.log(res);
    const userobject=jwtDecode(res.credential)
    // useGoogleLogin({
    //   onSuccess: tokenResponse => console.log(tokenResponse)
    // })
    
    console.log(userobject);
    const result=userobject;
    const token=userobject.jti;

    
    

    try {
        dispatch({
            type:"AUTH",
            data:{
                result,
                token
            }
        });
        navigate("/");
    } catch (error) {
        console.log("error ",error);
    }
  };

  const googleFailure=async()=>{
    console.log("google sign is errror");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      dispatch(signup(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const switchMode = () => {
    setisSignUp((pre) => !pre);
    setShowPassword(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevshowpassword) => !prevshowpassword);
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
        elevation={3}
      >
        <Avatar
          style={{
            margin: "2px",
            backgroundColor: "green",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Sign  Up" : "Sign In"}
        </Typography>
        <form
          style={{
            width: "100%",
            marginTop: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              margin: "2px",
            }}
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} variant="text">
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Dont have account?  Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
