import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"All Orders"}>
      <div className=" flex m-3 p-3 gap-10">
        <div className=" col-span-3">
          <UserMenu />
        </div>
        <div className=" col-span-9">
          <h1 className=" text-3xl font-bold">ORDERS</h1>

          <div>
            {orders?.map((o, i) => {
              return (
                <div>
                  <table className=" text-center border-separate border-spacing-2 border border-slate-400">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status} </td>
                        <td>{o?.buyer?.name} </td>
                        <td>{moment(o?.createAt).fromNow()} </td>
                        <td>{o?.payment.success ? "Success" : "Failed"} </td>
                        <td>{o?.products?.length} </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className=" flex flex-col">
                    {o?.products?.map((p) => (
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* {JSON.stringify(orders, null, 4)} */}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
