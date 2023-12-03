import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={" All Categories"}>
        <div className="container pt-5">
            <div className="row">
                {categories.map((c)=>(
                    <div className="col-md-3" key={c._id}>
                 <Link className='btn btn-primary mb-3' to={`/category/${c.slug}`}>{c.name}</Link>
                </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories
