import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams()
    const navigate = useNavigate()

    const getProduct = async ()=> {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])
  return (
    <Layout>
        <div className="container pt-3">
            <h3 className='text-center'>Category- {category?.name}</h3>
            <h5 className='text-center'>{products?.length} result found</h5>
            <div className="row">
            {products?.map(p=>(
                <div className="card m-3" style={{width: '18rem'}}>
                <img onClick={()=> navigate(`/product/${p.slug}`)} className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`}
                style={{width: '18rem', height:"300px", objectFit: "contain"}}
                alt={p.name} />
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,30)}...</p>
                <p className="card-text">₹ {p.price}</p>
                <button className="btn btn-info mr-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                <button className="btn btn-warning ml-1">Add to Cart</button>
                </div>
                </div>
            ))}
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct
