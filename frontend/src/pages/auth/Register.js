import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";

const Register = () => {

    const [ name, setName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ phone, setPhone] = useState("")
    const [ address, setAddress] = useState("")

    //Form function
    const handleSubmit =(e)=>{
        e.preventDefault()
        toast.success('Register Successfully')
        console.log(name, email, password, phone, address);
    }

  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              onChange={(e)=> setName(e.target.value)}
              value={name}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e)=> setPhone(e.target.value)}
              value={phone}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e)=> setAddress(e.target.value)}
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
