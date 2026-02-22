import React, { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { useSelector } from "react-redux";
import ROLE from "../common/role";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const isAdmin = user?.role === ROLE.ADMIN;

  const fetchAllProduct = async () => {
    const res = await fetch(SummaryApi.allProduct.url);
    const api = await res.json();
    setAllProduct(api?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => isAdmin && setOpenUploadProduct(true)}
          disabled={!isAdmin}
          title={isAdmin ? "Upload Product" : "Read-only for users"}
          className={`border-2 border-green-600-600 text-green-600 transition-all py-1 px-3 rounded-full flex items-center gap-1 ${isAdmin ? "hover:bg-green-600 hover:text-white" : "opacity-60 cursor-not-allowed"}`}
        >
          <div className="text-2xl">
            <MdFileUpload />
          </div>
          Upload Product
        </button>
      </div>

      {/* all product */}
      <div className="flex flex-wrap items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, i) => {
          return (
            <AdminProductCard
              data={product}
              key={i}
              fetchData={fetchAllProduct}
              readOnly={!isAdmin}
            />
          );
        })}
      </div>

      {/* upload product component */}
      {openUploadProduct && isAdmin && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
