import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/Auth';

const Profile = () => {

  const [auth, setAuth]= useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile",{
        name, email, password, phone, address,
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({ ...auth, user: data?.updateUser})
        let ls =localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  }

  //get User data
  useEffect(()=> {
    const {name, email, phone, address} = auth.user
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user])

  return (
    <Layout title={"Your-Profile"}>
        <div className="container-fluid m-3 p-3">

        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
            <div className="form-container">
        <h1 className="title">Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Enter Email"
              disabled
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control"
              placeholder="Enter Number"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="form-control"
              placeholder="Enter Address"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile
