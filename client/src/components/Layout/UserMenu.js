import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className=" text-center flex flex-col ">
        <h1 className=" text-3xl font-bold">Dashboard</h1>
        <NavLink
          to="/dashboard/user/profile"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className=" w-[300px] border p-2 hover:bg-gray-200"
        >
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
