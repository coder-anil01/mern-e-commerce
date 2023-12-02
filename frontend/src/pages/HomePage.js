import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices';

const HomePage = () => {
  const[products, setProducts] = useState([])
  const[categories, setCategories] = useState([])
  const[checked, setChecked] = useState([])
  const[radio, setRadio] = useState([])

   // get all category
   const getAllCategory = async () => {
     try {
       const { data } = await axios.get("/api/v1/category/get-category");
       if (data?.success) {
         setCategories(data?.category);
       }
     } catch (error) {
       console.log(error);
     }
   };

   useEffect(() => {
     getAllCategory();
   }, []);

  //Get All Product
  const getAllProduct = async()=>{
    try {
      const {data} = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProduct();
  },[checked.length, radio.length])
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct()
  },[checked, radio])


  //Filter Category
  const handleFilter = (value, id) => {
    let all = [ ...checked ];
    if(value){
      all.push(id);
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get Filter product
  const filterProduct = async ()=>{
    try {
      const {data} = await axios.post(`/api/v1/product/product-filter`, {checked, radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Layout title={"Best-offers Shop Now"}>
      <div className="row mt-4">
        <div className="col-md-3">
{/* Filter by Category */}
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ml-3">
          {categories?.map((c) => (
            <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}>
            {c.name}
          </Checkbox>
        ))}
        </div>
{/* Filter by Price */}
          <h4 className="text-center mt-5">Filter By Category</h4>
          <div className="d-flex flex-column ml-3">
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Prices?.map(p => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
{/* Reset Filter */}
          <div className="d-flex flex-column ml-3">
            <button className='btn' onClick={() => window.location.reload()}>RESET FILTERS</button>
        </div>
        </div>
        <div className="col-md-9">

{/* All Products */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-column"></div>
          <div className="d-flex flex-wrap">
          {products?.map(p=>(
                <div className="card m-3" style={{width: '18rem'}}>
                <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`}
                style={{width: '18rem', height:"300px", objectFit: "contain"}}
                alt={p.name} />
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,30)}...</p>
                <p className="card-text">₹ {p.price}</p>
                <button className="btn btn-info mr-1">More Details</button>
                <button className="btn btn-warning ml-1">Add to Cart</button>
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
