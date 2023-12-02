import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import Checkbox from 'antd/es/checkbox/Checkbox.js';

const HomePage = () => {
  const[products, setProducts] = useState([])
  const[categories, setCategories] = useState([])
  const[checked, setChecked] = useState([])

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
    getAllProduct()
  },[])


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
  
  return (
    <Layout title={"Best-offers Shop Now"}>
      <div className="row mt-4">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ml-3">
          {categories?.map((c) => (
            <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}>
            {c.name}
          </Checkbox>
        ))}
        </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
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
                <p className="card-text">{p.description}</p>
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
