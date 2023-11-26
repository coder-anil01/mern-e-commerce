import React, { useState } from "react";
import "../../style/AuthStyle.css";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  //Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        navigate("/login");
        setTimeout(function () {
          toast.success(res.data.message);
        }, 200);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <Layout title={"Forget-Password"}>
      <div className="form-container">
        <h1 className="title">Forget Password</h1>
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
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              placeholder="Enter Password Hint"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Forget Password</button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
