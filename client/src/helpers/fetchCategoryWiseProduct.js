import SummaryApi from "../common/index";

const fetcgCategoryWiseProduct = async (category) => {
  const res = await fetch(SummaryApi.categoryWiseProduct.url, {
    method: SummaryApi.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const api = await res.json();

  return api;
};

export default fetcgCategoryWiseProduct;
