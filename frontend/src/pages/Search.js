import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch()
  return (
    <div>
      <Layout title={"Search results"}>
        <div className="container">
            <div className="text-center">
                <h1>Search Resust</h1>
                <h4>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h4>
                <div className="d-flex flex-wrap mt-4">
                {values?.results.map(p=>(
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
    </div>
  )
}

export default Search
