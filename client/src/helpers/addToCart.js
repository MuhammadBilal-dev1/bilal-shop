import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const res = await fetch(SummaryApi.addToCartProduct.url, {
    method: SummaryApi.addToCartProduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  const api = await res.json();
  if (api.success) {
    toast.success(api.message);
  }
  if (api.error) {
    toast.error(api.message);
  }

  return api;
};

export default addToCart;
