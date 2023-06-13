import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className=" flex  justify-center items-center">
        <div className=" flex-col mt-1">
          {categories?.map((c) => (
            <div className=" m-10" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className=" bg-blue-500 p-3 rounded-md font-semibold text-white text-xl hover:bg-blue-800"
              >
                {c.name}{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
