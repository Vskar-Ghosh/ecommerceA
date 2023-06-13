import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-black text-white p-5">
      <h1 className=" text-center">All Right Reserved &copy; VaskarGhosh</h1>
      <p className=" text-center mt-3 font-bold">
        <Link className=" p-2 hover:text-blue-700" to="/about">
          About
        </Link>
        |
        <Link className=" p-2 hover:text-blue-700" to="/contact">
          Contact
        </Link>
        |
        <Link className=" p-2 hover:text-blue-700" to="/policy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
