import React from "react";
import Layout from "../components/Layout/Layout";
import Image1 from "../images/download.jpg";

const Policy = () => {
  return (
    <Layout title={"Privecy policy page"}>
      <div className=" absolute max-h-100 md:flex p-6 items-center justify-center md:mt-24 md:ml-64">
        <div className=" h-full">
          <img src={Image1} alt="banner contact" />
        </div>
        <div className=" md:ml-4 ">
          <p className=" p-2">Add privacy policy</p>
          <p className=" p-2">Add privacy policy</p>
          <p className=" p-2">Add privacy policy</p>
          <p className=" p-2">Add privacy policy</p>
          <p className=" p-2">Add privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
