import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className=" text-center flex flex-col ">
        <h1 className=" text-3xl font-bold">Admin Panel</h1>
        <NavLink
          to="/dashboard/admin/create-category"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          All Orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
