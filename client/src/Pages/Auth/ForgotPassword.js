import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in fg");
    }
  };
  return (
    <Layout title={"Reset Password"}>
      <div className=" w-[350px] h-[400px] m-10 mx-auto bg-slate-300 rounded-lg shadow-2xl hover:scale-105 duration-300">
        <h1 className=" text-center p-2 font-bold text-4xl">Forgot Password</h1>

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
          <label className=" p-2 text-xl font-medium">Answer : </label>
          <input
            onChange={(e) => setAnswer(e.target.value)}
            className=" p-2 w-[300px]"
            type="text"
            value={answer}
            placeholder="What is your favoutite sports?"
            required
          />
          <label className=" p-2 text-xl font-medium">New Password : </label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            className=" p-2 w-[300px]"
            type="password"
            value={newPassword}
            placeholder="Enter New Password"
            required
          />

          <button
            type="submit"
            className=" uppercase bg-green-400 p-2 w-[100px] rounded-md font-bold m-4 mx-auto hover:bg-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
