import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"All-Users"}>
      <div className=" flex m-3 p-3 gap-10">
        <div className=" col-span-3">
          <AdminMenu />
        </div>
        <div className=" col-span-9">Users</div>
      </div>
    </Layout>
  );
};

export default Users;
