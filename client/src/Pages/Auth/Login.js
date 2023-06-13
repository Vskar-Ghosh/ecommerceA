import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in login");
    }
  };
  return (
    <Layout title={"Login Page"}>
      <div className=" w-[350px] h-[400px] m-10 mx-auto bg-slate-300 rounded-lg shadow-2xl hover:scale-105 duration-300">
        <h1 className=" text-center p-4 font-bold text-4xl">LogIn</h1>

        <form onSubmit={handleLogin} className=" p-2 flex flex-col m-4">
          <label className=" p-2 text-xl font-medium">Email : </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=" p-2 w-[300px]"
            type="email"
            value={email}
            placeholder="Enter valid email address"
            required
          />
          <label className=" p-2 text-xl font-medium">Password : </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className=" p-2 w-[300px]"
            type="password"
            value={password}
            placeholder="Enter Password"
            required
          />

          <button
            type="submit"
            className=" uppercase bg-green-400 p-2 w-[100px] rounded-md font-bold m-4 mx-auto hover:bg-green-500"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              navigate("/forgot-password");
            }}
            className=" underline mx-auto hover:text-blue-700 cursor-pointer"
          >
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
