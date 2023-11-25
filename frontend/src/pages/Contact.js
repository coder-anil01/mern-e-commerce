import React from 'react'
import Layout from '../components/layout/Layout'
import contact from "../image/contact.jpeg"

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img style={{ width: "100%"}} src={contact} alt="contactus" />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-centerr">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and about product feel free to call anytime we 27×7 avilable
          </p>
          <p className="mt-3">www.helper@gmail.com</p>
          <p className="mt-3">7987654321</p>
          <p className="mt-3">1800-0000-0000 (toll free)</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
