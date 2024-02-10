import { Container } from "@mui/material";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { BrowserRouter, Navigate, Route, Routes,redirect } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";

function App() {
  const user=JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={()=><Navigate to="/posts"/>} />
          <Route path="/posts" Component={Home}/>
          <Route path="/posts/search" Component={Home}/>
          <Route path="/posts/:id"  Component={PostDetails} />
          <Route path="/auth" exact Component={()=>(!user?<Auth/>:<Navigate to="/posts"/>)} />
        </Routes>
      
      </Container>
    </BrowserRouter>
  );
}

export default App;
