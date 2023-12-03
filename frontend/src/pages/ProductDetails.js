import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({});
    const [realtedProduct, setRealtedProduct] = useState([]);

    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

    const getProduct = async ()=> {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    //get simler product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRealtedProduct(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className="row container mt-5">
            <div className="col-md-6">
            <img className="card-img-top" src={`/api/v1/product/product-photo/${product._id}`}
                style={{width: '18rem', height:"300px", objectFit: "contain"}}
                alt={product.name} />
            </div>
            <div className="col-md-6">
                <h2 className='text-center'>Product Detail</h2>
                <h4 className='text-success'>name: {product.name}</h4>
                <h4 className='text-primary'>price: ₹ {product.price}</h4>
                <h5 className='text-info'>description: {product.description}</h5>
                <h5>category: {product?.category?.name}</h5>
                <button className="btn btn-warning ml-1">Add to Cart</button>
            </div>
        </div>
        <hr/>
        <h4 className="row container mt-5"> related products</h4>
        {realtedProduct.length < 1 && <p className='text-center'> No Similar products Found</p>}
        <div className="d-flex flex-wrap">
          {realtedProduct?.map(p=>(
                <div className="card m-3" style={{width: '18rem'}}>
                <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`}
                style={{width: '18rem', height:"300px", objectFit: "contain"}}
                alt={p.name} />
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,30)}...</p>
                <p className="card-text">₹ {p.price}</p>
                <button className="btn btn-warning ml-1">Add to Cart</button>
                </div>
                </div>
            ))}
          </div>
    </Layout>
  )
}

export default ProductDetails
