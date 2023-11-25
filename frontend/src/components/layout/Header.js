import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link className="navbar-brand" to="/">🛒 E-commerce</Link>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 topnav-right">
      <li className="nav-item ">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item ">
        <NavLink className="nav-link" to="/category">Category <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item ">
        <NavLink className="nav-link" to="/cart">Cart 🛒(0)</NavLink>
      </li>
    </ul>
    </div>
    </nav>
    </>
  )
}

export default Header
