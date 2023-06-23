import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className=" flex flex-col">
        <h1 className=" mx-auto text-4xl font-semibold">
          Category-{category?.name}
        </h1>
        <h4 className=" mx-auto text-xl ">{products?.length} results found</h4>

        <div className=" mx-auto">
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
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                    className=" p-2 bg-green-300 m-1 rounded-md hover:bg-green-400 duration-500"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
