import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigation = useNavigate();

  const totalPrice = ()=> {
    try {
        let total = 0;
        cart?.map((item)=> {
            total = total + item.price;
        });
        return total.toLocaleString("en-US", {
            currency: "USD"
        });
    } catch (error) {
        console.log(error)
    }
  }

  const removeCartItem =(pid)=> {
    try {
        let myCart = [...cart];
        let index = myCart.findIndex((item)=> item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center mb-12">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your Cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-4">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <h5 className="card-text">₹ {p.price}</h5>
                  <button className="btn btn-danger" onClick={()=> removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4>Cart Summary</h4>
            <p> total | Checkout | Payment</p>
            <hr/>
            <h5>Total:- {totalPrice()}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
