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
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashbord from "./pages/admin/AdminDashbord";
import CreateCategory from "./pages/admin/CreateCategory";
import Users from "./pages/admin/Users";
import CreateProduct from "./pages/admin/CreateProduct";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/about" element={<About/>}/>

    <Route path="/dashbord" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashbord/>}/>
    </Route>
    <Route path="/dashbord" element={<AdminRoute />}>
      <Route path="admin" element={<AdminDashbord />}/>
      <Route path="admin/create-category" element={<CreateCategory />}/>
      <Route path="admin/create-product" element={<CreateProduct />}/>
      <Route path="admin/users" element={<Users />}/>
    </Route>

    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot-password" element={<ForgetPassword/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
