import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashbord from "./user/Dashbord";
import PrivateRoute from "./Routes/Private";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/about" element={<About/>}/>

    <Route path="/dashbord" element={<PrivateRoute/>}>
      <Route path="" element={<Dashbord/>}/>
    </Route>

    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
