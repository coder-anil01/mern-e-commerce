import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashbord from "./pages/user/Dashbord";
import PrivateRoute from "./Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashbord from "./pages/admin/AdminDashbord";
import CreateCategory from "./pages/admin/CreateCategory";
import Users from "./pages/admin/Users";
import CreateProduct from "./pages/admin/CreateProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/search" element={<Search/>}/>

    <Route path="/dashbord" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashbord/>}/>
      <Route path="user/profile" element={<Profile/>}/>
      <Route path="user/order" element={<Orders/>}/>
    </Route>
    <Route path="/dashbord" element={<AdminRoute />}>
      <Route path="admin" element={<AdminDashbord />}/>
      <Route path="admin/create-category" element={<CreateCategory />}/>
      <Route path="admin/create-product" element={<CreateProduct />}/>
      <Route path="admin/product/:slug" element={<UpdateProduct />}/>
      <Route path="admin/products" element={<Products />}/>
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
