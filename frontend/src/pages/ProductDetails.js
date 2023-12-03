import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})

    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

    const getProduct = async ()=> {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
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
        <div className="row">similar products</div>
    </Layout>
  )
}

export default ProductDetails
