import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth';


const Dashbord = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashbord"}>
        <div className="container-fluid m-3 p-3">

        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
            <div className="card">
              <h4>Name:- {auth?.user?.name}</h4>
              <h4>Email:- {auth?.user?.email}</h4>
              <h4>Contact:- {auth?.user?.phone}</h4>
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Dashbord
