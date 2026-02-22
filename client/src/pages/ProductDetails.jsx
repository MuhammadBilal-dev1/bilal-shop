import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import displayUSDCurrency from "../helpers/displayCurrency";
import { FaOpencart } from "react-icons/fa";
import { VscTag } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import BackButton from "../components/BackButton";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const productImageListLoading = new Array(4).fill(null);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCartCount } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const res = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);

    const api = await res.json();

    setData(api?.data);
    setActiveImage(api?.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-120px)]">
      <div>
        <BackButton />
      </div>
      <div></div>
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-4">
            <img
              src={activeImage}
              className="w-full h-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[800px] overflow-hidden min-h-[450px] bg-slate-200 p-1 right-[-810px] top-0">
                <div
                  className="w-full h-full min-h-[450px] min-w-[800px] mix-blend-multiply scale-95"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((image, i) => {
                  return (
                    <div key={i} className="h-20 w-20 bg-slate-200 rounded p-1">
                      <img
                        src={image}
                        alt="Product-image"
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(image)}
                        onClick={() => handleMouseEnterProduct(image)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="flex flex-col gap-1 h-[calc(100vh-202px)] overflow-y-scroll scrollbar-none ">
            <p className="bg-slate-200 animate-pulse w-40 px-2 py-3 rounded-full inline-block "></p>
            <h2 className="bg-slate-200 animate-pulse w-120 mt-2 h-36 px-2 py-3 text-2xl lg:text-3xl font-medium"></h2>
            <p className="capitalize bg-slate-200 animate-pulse w-32 mt-2 h-5 px-2 py-3 lg:text-xl text-lg"></p>
            <div className="flex gap-1 text-2xl text-slate-200 animate-pulse">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStarHalf />
            </div>

            <div className="flex items-center gap-3 text-2xl lg:text-3xl font-medium my-2">
              <p className="bg-slate-200 w-[7.5rem] h-[2.3rem] animate-pulse text-white p-1"></p>
              <p className=" bg-slate-200 w-[500px] h-[2.3rem] animate-pulse line-through"></p>
            </div>

            <div className="flex items-center gap-4 my-2 ">
              <button className="bg-slate-200 w-[120px] h-[40px] animate-pulse"></button>
              <button className="bg-slate-200 w-[200px] h-[40px] animate-pulse"></button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="bg-slate-200 w-[160px] h-[25px] animate-pulse"> </p>
              <p className="bg-slate-200 w-[700px] h-[25rem] animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 lg:h-[calc(100vh-213px)] overflow-y-scroll scrollbar-none">
            <p className="bg-red-200 text-red-600 px-2 py-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">
              {data.productName}
            </h2>
            <p className="capitalize text-slate-400 lg:text-xl text-lg">
              {data?.category}
            </p>
            <div className="flex gap-1 text-2xl text-yellow-500">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStarHalf />
            </div>

            <div className="flex items-center gap-3 text-2xl lg:text-3xl font-medium my-2">
              <p className="bg-green-800 text-white p-1">
                {displayUSDCurrency(data.sellingPrice)}
              </p>
              <p className=" text-red-800 p-2 line-through">
                {displayUSDCurrency(data.price)}
              </p>
            </div>

            <div className="flex items-center gap-4 my-2 ">
              <button
                className="border-2 flex items-center gap-2 border-red-600 rounded px-4 py-1 min-w-[120] text-red-600 font-medium hover:bg-red-600 hover:text-white lg:text-xl"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                <div className="md:text-2xl">
                  <VscTag />
                </div>
                Buy
              </button>
              <button
                className="border-2 flex items-center gap-2 border-red-600 rounded px-3 py-1 min-w-[120] text-white font-medium bg-red-600 hover:bg-red-700 lg:text-xl"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
                <div className="text-white md:text-2xl">
                  <FaOpencart />
                </div>
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t-2 mt-28 border-slate-300 ">
        {data?.category && (
          <CategroyWiseProductDisplay
            category={data?.category}
            heading={"Recommended Product"}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
