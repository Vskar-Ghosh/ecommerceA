import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //getproduct function
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilerProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //intial details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, []);

  //get similer product
  const getSimilerProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className=" flex gap-10 m-4">
        <div className=" col-span-5">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height={"200px"}
            width={"300px"}
          />
        </div>
        <div className=" col-span-5">
          <h1 className=" text-3xl font-bold text-center">ProductDetails</h1>
          <h6 className=" text-xl">Name: {product.name}</h6>
          <h6 className=" text-xl">description: {product.description}</h6>
          <h6 className=" text-xl">price: ${product.price}</h6>
          <h6 className=" text-xl">Category: {product.category?.name}</h6>
          <button className=" p-2 bg-green-500 rounded-md hover:bg-green-400 duration-200">
            Add To Cart
          </button>
        </div>
      </div>
      <hr />
      <div>
        <h1 className=" text-2xl font-bold">Similer Product</h1>
        {relatedProducts.length < 1 && (
          <p className=" text-center">No Similer Products Found</p>
        )}
        <div className=" flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className=" border-2 border-black p-3 m-3 h-[370px] w-[250px]">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className=" w-40 h-52"
              />
              <div>
                <h5>{p.name} </h5>
                <p>{p.description.substring(0, 20)} ...</p>
                <p> ${p.price} </p>
                <button className=" p-2 bg-green-300 m-1 rounded-md hover:bg-green-400 duration-500">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
