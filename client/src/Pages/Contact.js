import React from "react";
import Layout from "../components/Layout/Layout";
import Image1 from "../images/download.jpg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us Page"}>
      <div className=" absolute max-h-100 md:flex p-6 items-center justify-center md:mt-24 md:ml-64">
        <div className=" h-full">
          <img src={Image1} alt="banner contact" />
        </div>
        <div className=" m-4">
          <button className=" text-lg uppercase bg-black text-white w-[200px] text-center p-2">
            Contact us
          </button>
          <p className=" text-sm">
            Any query and info about producct feel free to call anytime we 24x7
            available
          </p>

          <div className=" flex pt-4">
            <BiMailSend size={20} />
            <p className=" text-sm"> : www.help@ecommerce.app.com</p>
          </div>

          <div className=" flex pt-4">
            <BiPhoneCall size={20} />
            <p className=" text-sm"> : 012-3456789</p>
          </div>

          <div className=" flex pt-4">
            <BiSupport size={20} />
            <p className=" text-sm"> : 1800-0000-0000 (toll free) </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
