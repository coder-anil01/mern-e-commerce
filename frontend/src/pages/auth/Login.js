import React, { useState } from "react";
import "../../style/AuthStyle.css"
import Layout from "../../components/layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/Auth.js'

const Login = () => {
  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  //Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/auth/login`,{ email, password });
      if(res.data.success){
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || "/");
        setTimeout(function() {
          toast.success(res.data.message)
        }, 200);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="form-container">
        <h1 className="title">Login Form</h1>
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
