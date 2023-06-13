import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in reg.");
    }
  };

  return (
    <Layout title={"Register Page"}>
      <div className=" w-[300px] h-[80vh] flex  flex-col items-center mx-auto m-4 bg-slate-300 rounded-md shadow-2xl ">
        <h1 className=" text-[25px] font-bold">Register Page</h1>

        <form onSubmit={handleSubmit} className=" m-4 items-center">
          <div className=" flex flex-col">
            <label>Name : </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              className=" border-black border-2 p-1"
              required
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
              required
            />
          </div>
          <div className=" flex flex-col">
            <label>Password : </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="passowrd"
              className=" border-black border-2 p-1"
              required
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
              required
            />
          </div>
          <div className=" flex flex-col">
            <label>Answer : </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your favourite sports?"
              className=" border-black border-2 p-1"
              required
            />
          </div>
          <div className=" flex flex-col">
            <label>Address : </label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className=" border-black border-2 p-1"
              required
            />
          </div>

          <button
            type="submit"
            className=" bg-blue-600 p-1 m-2 mx-auto rounded-md w-[100px]"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
