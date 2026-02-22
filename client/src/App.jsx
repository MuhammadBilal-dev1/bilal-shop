import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    const res = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const api = await res.json();
    if (api.success) {
      dispatch(setUserDetails(api.data));
    }
  };

  const fetchUserAddToCartCount = async () => {
    const res = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: "include",
    });

    const api = await res.json();
    setCartProductCount(api?.data?.count);
  };

  useEffect(() => {
    // user details
    fetchUserDetails();
    // user add to cart count
    fetchUserAddToCartCount();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddToCartCount }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className=" pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
