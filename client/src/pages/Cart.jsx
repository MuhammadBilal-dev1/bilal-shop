import { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayUSDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import BackButton from "../components/BackButton";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const res = await fetch(SummaryApi.viewAddToCartProducts.url, {
      method: SummaryApi.viewAddToCartProducts.method,
      credentials: "include",
    });
    const api = await res.json();
    if (api.success) {
      setData(api.data);
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const increaseQty = async (id, qty) => {
    const res = await fetch(SummaryApi.updateCartProducts.url, {
      method: SummaryApi.updateCartProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const api = await res.json();
    if (api.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const res = await fetch(SummaryApi.updateCartProducts.url, {
        method: SummaryApi.updateCartProducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const api = await res.json();
      if (api.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const res = await fetch(SummaryApi.deleteCartProducts.url, {
      method: SummaryApi.deleteCartProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const api = await res.json();
    if (api.success) {
      fetchData();
      context.fetchUserAddToCartCount();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);
      // const stripePromise = await loadStripe(
      //   import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
      // );

      const res = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ cartItems: data }),
      });
      console.log("han bos handle payment chala he", res);
      if (!res.ok) throw new Error("Failed to initiate payment");
      const api = await res.json();


      // AGAR BACKEND SE URL AA RAHA HAI (Jo ke aa raha hai tumhare log ke mutabiq)
      if (api.url) {
        window.location.href = api.url; // Ye user ko Stripe page par le jayega
      } else if (api.id) {
        // Fallback: Agar sirf ID aaye toh purana tareeka
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: api.id,
        });
      } else {
        alert("Payment URL nahi mil saki. Check console.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="container mx-auto px-4 my-6 min-h-[calc(100vh-168px)]">
      <div>
        <BackButton />
      </div>
      <div className="text-center text-lg  my-1">
        {data.length === 0 && !loading && (
          <p className="text-slate-400 text-2xl py-5">Cart is empty</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between ">
        {/* view product */}
        <div className="w-full max-w-3xl h-[calc(100vh-256px)] overflow-y-scroll scrollbar-none ">
          {loading
            ? loadingCart.map((product, i) => {
                return (
                  <div
                    key={"loading" + i}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, i) => {
                return (
                  <div
                    key={"product" + i}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* delete product */}
                      <div
                        className="absolute right-2 hover:bg-red-600 hover:text-white  text-red-600 text-2xl p-1 rounded top-2 cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 w-[95%]">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-white px-2 bg-green-600 font-medium text-lg">
                          {displayUSDCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <div className="flex items-center gap-2">
                          Total Price :
                          <p className="text-green-600 font-semibold text-lg">
                            {displayUSDCurrency(
                              product?.productId?.sellingPrice *
                                product?.quantity
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center rounded"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* total summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-32 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg ">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg ">
                  <p>Total Price</p>
                  <p className="text-green-600">
                    {displayUSDCurrency(totalPrice)}
                  </p>
                </div>
                <button
                  className="bg-blue-600 p-2 text-white w-full rounded-lg hover:bg-opacity-80"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
