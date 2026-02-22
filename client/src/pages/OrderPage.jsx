import { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayUSDCurrency from "../helpers/displayCurrency";
const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: "include",
      });
      const api = await res.json();
      if (api?.success) {
        setData(Array.isArray(api.data) ? api.data : []);
      } else {
        setData([]);
        setError(api?.message || "Unable to fetch orders");
      }
    } catch (e) {
      setError("Unable to fetch orders");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-125px)]">
      {loading && <p>Loading orders...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !data[0] && !error && <p>No Order available</p>}

      <div className="w-full pb-6">
        {Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <div key={item.userId + index}>
                <p className="font-medium text-lg">
                  {moment(item.createdAt).format("LLLL")}
                </p>
                <div className="border rounded">
                  <div className="flex lg:flex-row justify-between gap-4 flex-col w-full">
                    <div className="grid gap-1">
                      {item?.productDetails.map((product, index) => {
                        return (
                          <div
                            key={product.productId + index}
                            className="flex gap-3 bg-slate-100"
                          >
                            <img
                              src={product.image[0]}
                              className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                            />
                            <div className="lg:w-[600px]">
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {product.name}
                              </div>
                              <div className="flex items-center gap-5">
                                <div className="bg-green-600 text-white px-2 rounded">
                                  {displayUSDCurrency(product.price)}
                                </div>
                                <p>Quantity : {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col gap-4 p-2 min-w-[320px]">
                      <div>
                        <div className="text-lg font-bold">
                          Payment Details :{" "}
                        </div>
                        <p className="ml-1">
                          Payment method :{" "}
                          {item.paymentDetails.payment_method_type[0]}
                        </p>
                        <p className="ml-1">
                          Payment Status : {item.paymentDetails.payment_status}
                        </p>
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          Shipping Details
                        </div>
                        {item.shipping_options.map((shipping) => {
                          return (
                            <div key={shipping.shipping_rate} className=" ml-1">
                              Shipping Amount : {shipping.shipping_amount}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="font-semibold ml-auto w-fit lg:text-lg mr-5">
                    Total Amount : {displayUSDCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderPage;
