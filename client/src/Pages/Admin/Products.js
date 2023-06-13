import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error in getAllProduct");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className=" flex  gap-10 m-3 p-3">
        <div className=" col-span-3">
          <AdminMenu />
        </div>
        <div className=" col-span-9">
          <div className=" flex flex-col items-center">
            <h1 className=" text-2xl font-bold text-center">
              All Products List
            </h1>
            <div className=" flex flex-wrap">
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                  <div className=" border-2 border-black p-3 m-3 h-[300px] w-[250px]">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className=" w-40 h-52"
                    />
                    <div>
                      <h5>{p.name} </h5>
                      <p>{p.description} </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
