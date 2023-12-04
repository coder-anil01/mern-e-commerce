import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SearchInput from "../form/SearchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/Cart.js";
import {Badge} from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const[cart] = useCart();

  const handleLogout = () => {
    setTimeout(function () {
      navigate('/login');
    }, 10);
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(function () {
      toast.success("Logout successfully");
    }, 200);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            🛒 E-commerce
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 topnav-right">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link class="dropdown-item" to={"/categories"}>All Categories</Link>
              {categories?.map((c) => (
              <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
            </div>
          </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink
                      className="dropdown-item"
                      to={`/dashbord/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashbord
                    </NavLink>
                    <NavLink
                      className="dropdown-item bg-danger text-light"
                      onClick={handleLogout}
                      to="/"
                    >
                      Logout
                    </NavLink>
                  </div>
                </li>
              </>
            )}
            <li className="nav-item ">
              <Badge count={cart?.length} showZero>
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
              </Badge>
            </li>
            <SearchInput />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
