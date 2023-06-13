import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
      setShipping(data.product.shipping);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in get all category at create product");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("product created successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Create Product Function");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this product");
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error in delete product");
    }
  };

  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className=" flex m-3 p-3 gap-10">
        <div className=" col-span-3">
          <AdminMenu />
        </div>
        <div className=" w-[800px] h-full border border-black col-span-9 shadow-lg hover:scale-105 duration-300 bg-slate-200">
          <div className=" p-5">
            <h1 className=" text-4xl p-2 text-center font-bold">
              Update Product
            </h1>
            <div className=" m-1 w-80 ">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                className=" my-3 border-2 border-black text-black w-96"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className=" my-3 mt-5">
                <label className=" p-3 bg-slate-300 rounded-md">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
            </div>
            <div className=" my-3">
              {photo ? (
                <div className=" text-center mt-8">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    height={"200px"}
                  />
                </div>
              ) : (
                <div className=" text-center mt-8">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    alt="product-photo"
                    height={"200px"}
                  />
                </div>
              )}
            </div>
            <div className=" mt-8">
              <input
                type="text"
                value={name}
                placeholder="Enter Product Name Here"
                className="w-[400px] border-2 border-black p-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" mt-8">
              <textarea
                type="text"
                value={description}
                placeholder="Write description here"
                className="w-[400px] border-2 border-black p-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className=" mt-8">
              <input
                type="number"
                value={price}
                placeholder="Enter Price"
                className="w-[400px] border-2 border-black p-2"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className=" mt-8">
              <input
                type="number"
                value={quantity}
                placeholder="Enter Quantity"
                className="w-[400px] border-2 border-black p-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className=" mt-8 ">
              <Select
                bordered={false}
                size="large"
                placeholder="Select Shipping"
                className=" w-[400px] border-2 border-black text-black"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">Yes</Option>
                <Option value="1">No</Option>
              </Select>
            </div>
            <button
              onClick={handleUpdate}
              className=" p-3 rounded-md bg-cyan-300 mt-8"
            >
              Update Product
            </button>

            <button
              onClick={handleDelete}
              className=" ml-5 p-3 rounded-md bg-red-700 mt-8"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
