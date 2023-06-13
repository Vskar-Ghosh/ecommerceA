import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div>
        <div className=" text-center">
          <h1 className=" text-4xl font-bold">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No  product fount"
              : `Found ${values?.results.length}`}
          </h6>

          <div className=" flex flex-wrap">
            {values?.results.map((p) => (
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
                  <button className=" p-2 bg-slate-500 m-1 rounded-md hover:bg-slate-300 duration-500">
                    More Details
                  </button>
                  <button className=" p-2 bg-green-300 m-1 rounded-md hover:bg-green-400 duration-500">
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

export default Search;
