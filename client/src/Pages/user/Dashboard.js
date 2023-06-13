import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User-Dashboard"}>
      <div className=" flex m-3 p-3 gap-10">
        <div className=" col-span-3">
          <UserMenu />
        </div>
        <div className=" col-span-9">
          <div className=" border w-auto p-5">
            <h1>{auth?.user?.name} </h1>
            <h1>{auth?.user?.email} </h1>
            <h1>{auth?.user?.address} </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
