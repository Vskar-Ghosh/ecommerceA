import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    const { email, name, password, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in reg.");
    }
  };

  return (
    <Layout title={"User Profile"}>
      <div className=" flex m-3 p-3 gap-10">
        <div className=" col-span-3">
          <UserMenu />
        </div>
        <div className=" col-span-9 mx-auto">
          <div className=" w-[400px] h-[70vh] flex  flex-col items-center mx-auto m-4 bg-slate-300 rounded-md shadow-2xl ">
            <h1 className=" text-[25px] font-bold p-4">User Profile</h1>

            <form onSubmit={handleSubmit} className=" mx-auto">
              <div className=" flex flex-col">
                <label>Name : </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter your name"
                  className=" border-black border-2 p-1"
                />
              </div>

              <div className=" flex flex-col">
                <label>Email : </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email address"
                  className=" border-black border-2 p-1"
                  disabled
                />
              </div>
              <div className=" flex flex-col">
                <label>Password : </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="passowrd"
                  className=" border-black border-2 p-1"
                />
              </div>
              <div className=" flex flex-col">
                <label>Phone : </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="enter your phone"
                  className=" border-black border-2 p-1"
                />
              </div>

              <div className=" flex flex-col">
                <label>Address : </label>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className=" border-black border-2 p-1"
                />
              </div>

              <button
                type="submit"
                className=" bg-blue-600 p-2 mt-2 rounded-md w-[100px]"
              >
                Upadate
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
