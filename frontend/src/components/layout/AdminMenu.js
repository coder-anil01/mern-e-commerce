import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div className='text-center'>
        <h4>Admin Panel</h4>
    <div className="list-group">
    <NavLink to="/dashbord/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
    <NavLink to="/dashbord/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
    <NavLink to="/dashbord/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
    <NavLink to="/dashbord/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
    <NavLink to="/dashbord/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
    </div>

    </div>
  )
}

export default AdminMenu
