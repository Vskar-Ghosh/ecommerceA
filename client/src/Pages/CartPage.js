import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  //get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //payment function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className=" flex flex-col">
        <div className=" col-span-12">
          <h1 className=" text-2xl font-semibold">
            {`Hello ${auth?.token && auth?.user?.name}`}{" "}
          </h1>

          <h4 className=" text-center">
            {cart?.length > 0
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your Cart is Empty"}{" "}
          </h4>
        </div>
        <div className=" flex m-10 justify-between">
          <div className=" col-span-6">
            <div>
              {cart?.map((p) => (
                <div className=" flex border-2 p-5 gap-2 m-2">
                  <div className=" col-span-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className=" w-40  h-40"
                    />
                  </div>
                  <div className=" col-span-8">
                    <div className=" border-2 p-10 shadow-lg">
                      <h5 className=" font-semibold">{p.name} </h5>
                      <p>{p.description.substring(0, 20)} ...</p>
                      <p>Price : ${p.price} </p>
                      <button
                        onClick={() => removeCartItem(p._id)}
                        className=" p-2 bg-red-600 rounded-md hover:scale-105 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" col-span-4 px-14 justify-center border-2 ">
            <h2 className=" text-3xl font-semibold text-center">
              Cart Summary
            </h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className=" mt-4 text-2l font-semibold">
              Total:{totalPrice()}{" "}
            </h4>
            {auth?.user?.address ? (
              <>
                <div className=" ">
                  <h4 className=" text-xl font-semibold mb-0">
                    Current Address :{" "}
                  </h4>
                  <h5 className=" text-xl mt-0">{auth?.user?.address} </h5>
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className=" bg-orange-500 p-2 rounded-md hover:scale-105 duration-200"
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {auth?.token ? (
                    <>
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className=" bg-orange-500 p-2 rounded-md hover:scale-105 duration-200"
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        className=" bg-orange-500 p-2 rounded-md hover:scale-105 duration-200"
                      >
                        Please Login to Checkout
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            <div className=" mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    onClick={handlePayment}
                    className=" bg-green-500 p-2 rounded-md"
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
