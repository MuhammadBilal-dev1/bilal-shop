import React, { useContext, useEffect } from "react";
import GreenTick from "../components/GreenTick";
import { Link } from "react-router-dom";
import Context from "../context";
const Success = () => {
  const { fetchUserAddToCartCount } = useContext(Context);
  useEffect(() => {
    fetchUserAddToCartCount();
    const t = setTimeout(() => {
      fetchUserAddToCartCount();
    }, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="h-[calc(100vh-128px)]">
      <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
        <GreenTick w={400} h={150} />
        <p className="text-green-600 font-bold text-xl">Payment Successfully</p>
        <Link
          to={"/order"}
          className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
        >
          See Order
        </Link>
      </div>
    </div>
  );
};

export default Success;
