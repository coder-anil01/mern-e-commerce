import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/Auth.js'

const HomePage = () => {

  const[auth, setAuth] = useAuth();
  
  return (
    <Layout title={"Best-offers Shop Now"}>
      <h1>Home page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage
