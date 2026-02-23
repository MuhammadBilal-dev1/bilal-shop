import  { useContext, useState } from "react";
// import Logo from "./logo.jsx";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { setUserDetails } from "../store/userSlice.js";
// import ROLE from "../common/role.js";
import Context from "../context/index.js";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-7">
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
                    className="whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Admin panel
                  </Link>
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2"
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

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Menu"
            className="text-2xl p-2 rounded-md"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
          {mobileOpen && (
            <div className="absolute right-4 top-16 z-50 bg-white rounded-md shadow-lg w-56">
              <div className="p-2 divide-y">
                {user?._id ? (
                  <>
                    <Link
                      to={"/order"}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-100 rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <FaRegCircleUser /> <span>My Orders</span>
                      </span>
                    </Link>
                    <Link
                      to={"/cart"}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-100 rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <FaShoppingCart /> <span>Cart</span>
                      </span>
                      <span className="text-xs bg-red-600 text-white rounded-full px-2 py-0.5">
                        {context.cartProductCount}
                      </span>
                    </Link>
                    <Link
                      to={"/admin-panel/all-products"}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-100 rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Admin panel</span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded text-white bg-red-600 hover:bg-red-700 mt-2"
                    >
                      <FiLogOut /> <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to={"/login"}
                    className="flex items-center gap-2 px-3 py-2 rounded text-white bg-red-600 hover:bg-red-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FiLogIn /> <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
