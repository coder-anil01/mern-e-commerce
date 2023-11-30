import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Products = () => {
    const[ products, setProducts] = useState([])

    //Get all Products
    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
            console.log(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])
  return (
    <Layout title={"Products"}>
        <div className='container-fluid m-3 p-3'>
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1 className='text-center'>All Products List</h1>
            {/* <div className="d-flex"> */}
            {products?.map(p=>(
                <Link to={`/dashbord/admin/product/${p.slug}`} className='product-link'>
                <div className="card m-3" style={{width: '18rem'}}>
                <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`}
                style={{width: '18rem', height:"300px", objectFit: "contain"}}
                alt={p.name} />
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                </div>
                </div>
                </Link>
            ))}
            {/* </div> */}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
