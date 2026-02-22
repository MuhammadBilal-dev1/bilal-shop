import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from "./AdminEditProduct";
import displayUSDCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData, readOnly = false }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="mx-auto w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt="Product-image"
            width={120}
            height={120}
            className="mx-auto object-fill h-full w-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {displayUSDCurrency(data.sellingPrice)}
          </p>
          <button
            className={`w-fit ml-auto p-2 rounded-full ${readOnly ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-green-200 hover:bg-green-600 hover:text-white cursor-pointer"}`}
            onClick={() => !readOnly && setEditProduct(true)}
            disabled={readOnly}
            title={readOnly ? "Read-only for users" : "Edit product"}
          >
            <FaEdit />
          </button>
        </div>
      </div>

      {editProduct && !readOnly && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
