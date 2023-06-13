import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //getTotal function
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //handelFilterC Function
  const handleFilterC = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //call allproduct functions by useEffect
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  //filter effect
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //categories effect
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  //load more function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All products best-Offer Running"}>
      <div className=" flex gap-10 m-3 p-3">
        <div className=" col-span-3">
          <h6 className=" text-xl m-auto font-semibold">Filter by category</h6>
          <div className=" flex flex-col">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilterC(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h6 className=" mt-8 text-xl m-auto font-semibold">
            Filter by Price
          </h6>
          <div className=" flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className=" flex flex-col">
            <button
              className=" p-2 bg-red-400 rounded-sm mt-5"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className=" col-span-9">
          <h1 className=" m-auto text-4xl font-bold">HomePage</h1>
          <div>
            <h2 className=" text-xl font-medium">Products</h2>
            <div className=" flex flex-wrap">
              {products?.map((p) => (
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
                    <button
                      className=" p-2 bg-slate-500 m-1 rounded-md hover:bg-slate-300 duration-500"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className=" p-2 bg-green-300 m-1 rounded-md hover:bg-green-400 duration-500"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" m-2 p-3">
            {products && products.length < total && (
              <button
                className=" text-xl font-bold bg-cyan-400 p-1 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
