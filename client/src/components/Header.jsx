import React, { useContext, useState } from "react";
import Logo from "./logo.jsx";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { setUserDetails } from "../store/userSlice.js";
import ROLE from "../common/role.js";
import Context from "../context/index.js";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const res = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: "include",
    });

    const api = await res.json();
    if (api.success) {
      toast.success(api.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (api.error) {
      toast.error(api.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            {/* <Logo w={100} h={60} /> */}
            <div className="flex flex-col ">
              <p className="text-3xl font-semibold flex gap-1 leading-none">
                <span className="font-extrabold ">Bilal</span>Shop
              </p>
              <p className="text-sm text-center tracking-widest text-slate-500">
                Online Shopping
              </p>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  <Link
                    to={"/admin-panel/all-products"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Admin panel
                  </Link>
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -right-3 -top-2 ">
                <p className="text-sm">{context.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 flex items-center gap-2"
              >
                Logout
                <div className="text-xl">
                  <FiLogOut />
                </div>
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 flex items-center gap-1"
              >
                Login
                <div className="text-xl">
                  <FiLogIn />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
