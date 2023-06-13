import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className=" flex  gap-10 m-3 p-3">
        <div className=" col-span-3 ">
          <AdminMenu />
        </div>
        <div className=" col-span-9 ">
          <div className=" border w-auto p-5">
            <h1 className=" text-2xl p-2 font-semibold">
              {" "}
              Admin Name : {auth?.user?.name}
            </h1>
            <h1 className=" text-2xl p-2 font-semibold">
              {" "}
              Admin Email : {auth?.user?.email}
            </h1>
            <h1 className=" text-2xl p-2 font-semibold">
              {" "}
              Admin Phone : {auth?.user?.phone}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
