import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Modal } from 'antd';
import toast from "react-hot-toast";
import CategoryForm from "../../components/form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdatedName] = useState("");

  //=> ******  Handele Submit   ******** //
  const handeleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is Created`);
        getAllCategory()
        setName("")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong");
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Updated category
  const handleUpdated = async (e)=> {
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updateName} )
      if(data.success){
        toast.success(`${updateName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somthing went wrong while Updating Category")
    }
  }

   // Deleted category
   const handleDelete = async (id)=> {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`, );
      if(data.success){
        toast.success(`Category is Deleted`);
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somthing went wrong while Updating Category")
    }
  }

  return (
    <Layout title={"Dashbord-Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            
            <div className="p-3 w-75">
              <CategoryForm
                handleSubmit={handeleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <table className="table w-75">
              <thead>
                <tr>
                  <th className="col">Name</th>
                  <th className="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td className="d-flex">
                        <button className="btn-primary btn mr-5" onClick={()=> {setVisible(true); setUpdatedName(c.name); setSelected(c); }}>Edit</button>
                        <button className="btn-danger btn" onClick={()=> {handleDelete(c._id)}}>Delete</button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}> <CategoryForm value={updateName} setValue={setUpdatedName} handleSubmit={handleUpdated}/></Modal> 
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
