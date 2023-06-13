import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"get back - page not found"}>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" mt-32 font-bold text-8xl">404</h1>
        <h2>Opps! Page Not Found</h2>
        <Link className=" bg-black text-white p-2 m-2 rounded-sm" to="/">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
