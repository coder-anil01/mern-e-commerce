import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all Products
  const getAllProcuct = async () => {
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
    getAllProcuct();
  }, []);

  // Create Product function
  const handleCreate = async (e)=> {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)

      const {data} = await axios.post('/api/v1/product/create-product', productData)
      if(data?.success){
        toast.success("Product Created Successfully")
        // navigate('/dashbord/admin/products')
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error("Somthing went wrong")
    }
  }

  return (
    <Layout title={"Dashbord-Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 w-75"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 w-75">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product pic"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write Product Title"
                  className="form-controller w-75 p-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write Product description"
                  className="form-controller w-75 p-2"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Write Product Price"
                  className="form-controller w-75 p-2"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
             
             <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Write Quantity"
                className="form-controller w-75 p-2"
                onChange={(e) => setQuantity(e.target.value)}
                />
             </div>

              <div className="mb-3">
                <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="form-select mb-3 w-75"
                onChange={(value)=> {
                  setShipping(value);
                }}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>CREATED PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
