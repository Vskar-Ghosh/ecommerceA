import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import { toast } from "react-hot-toast";
import { AiOutlineCaretDown } from "react-icons/ai";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [dropd, setDropd] = useState(false);
  const [cdropd, setcDropd] = useState(false);
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <header className=" shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
        <div className="flex items-center h-full justify-between">
          <Link to={"/"}>
            <div className=" text-2xl font-bold justify-center">
              <h3 className="flex">
                Ecommerce App <FaShopify />
              </h3>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
              <SearchInput />
              <Link className=" hover:text-red-700" to={"/"}>
                Home
              </Link>
              <Link>
                <div className="relative inline-block">
                  <div>
                    <button
                      type="button"
                      onClick={() => setcDropd(!cdropd)}
                      className="inline-flex gap-1 hover:text-red-700"
                    >
                      <Link to={"/categories"}>Categories</Link>
                      <svg class=" h-5 w-5 mt-1">
                        <AiOutlineCaretDown />
                      </svg>
                    </button>
                  </div>

                  {cdropd ? (
                    <div className="absolute  p-1 mt-2origin-top rounded-md bg-white shadow-lg">
                      <div className="p-2">
                        {categories?.map((c) => (
                          <div className=" w-[140px]">
                            <Link
                              className=" p-2 rounded-md hover:bg-slate-200"
                              to={`/category/${c.slug}`}
                            >
                              {c.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className=" hidden absolute p-1 mt-2origin-top rounded-md bg-white shadow-lg ">
                      <div className="py-1">
                        <div>
                          <Link className=" hover:text-red-700">Dashboard</Link>
                        </div>
                        <div>
                          <Link className=" hover:text-red-700">Logout</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
              <Badge count={cart?.length} showZero>
                <Link className=" text-xl hover:text-red-700" to={"/cart"}>
                  Cart
                </Link>
              </Badge>

              {!auth.user ? (
                <>
                  <Link className=" hover:text-red-700" to={"/register"}>
                    Sign Up
                  </Link>
                  <Link className=" hover:text-red-700" to={"/login"}>
                    Login
                  </Link>
                </>
              ) : (
                <div className="relative inline-block">
                  <div>
                    <button
                      type="button"
                      onClick={() => setDropd(!dropd)}
                      className="inline-flex gap-1 hover:text-red-700"
                    >
                      {auth?.user?.name}
                      <svg class=" h-5 w-5 mt-1">
                        <AiOutlineCaretDown />
                      </svg>
                    </button>
                  </div>

                  {dropd ? (
                    <div className="absolute right-0 p-1 mt-2origin-top rounded-md bg-white shadow-lg">
                      <div className="py-1">
                        <div>
                          <Link
                            className=" hover:text-red-700"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </div>
                        <div>
                          <Link
                            onClick={handleLogout}
                            className=" hover:text-red-700"
                            to={"/login"}
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" hidden absolute p-1 mt-2origin-top rounded-md bg-white shadow-lg ">
                      <div className="py-1">
                        <div>
                          <Link
                            className=" hover:text-red-700"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </div>
                        <div>
                          <Link
                            onClick={handleLogout}
                            className=" hover:text-red-700"
                            to={"/login"}
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
