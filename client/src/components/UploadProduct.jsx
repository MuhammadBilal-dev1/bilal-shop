import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/UploadImage";
import { MdFileUpload } from "react-icons/md";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchdata }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const api = await res.json();
    if (api.success) {
      toast.success(api?.message);
      onClose();
      fetchdata();
    }
    if (api.error) {
      toast.error(api?.message);
    }
  };

  return (
    <div className="fixed w-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            onClick={onClose}
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          >
            <IoCloseOutline />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="p-2 bg-slate-100 border rounded outline-none"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            className="p-2 bg-slate-100 border rounded outline-none"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            onChange={handleOnChange}
            name="category"
            className="p-2 bg-slate-100 border rounded outline-none"
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((val, i) => {
              return (
                <option value={val.value} key={val.value + i}>
                  {val.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="category" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex gap-2 flex-wrap">
                {data.productImage.map((val, i) => {
                  return (
                    <div className="relative group">
                      <img
                        key={i}
                        alt={val}
                        src={val}
                        width={91.5}
                        height={80}
                        className="bg-slate-100 border cursor-pointer transform hover:scale-110 hover:translate-y-1 hover:translate-x-1 transition duration-100 ease-in-out"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(val);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(i)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-sm">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="p-2 bg-slate-100 border rounded outline-none"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            className="p-2 bg-slate-100 border rounded outline-none"
            placeholder="Enter Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            name="description"
            required
            id="description"
            className="h-[8rem] bg-slate-100 border resize-none p-1 "
            placeholder="Enter Product description"
            onChange={handleOnChange}
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-green-600 text-white mb-10 hover:bg-green-700 flex justify-center gap-2">
            <div className="text-2xl">
              <MdFileUpload />
            </div>
            Upload Product
          </button>
        </form>
      </div>

      {/* display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
