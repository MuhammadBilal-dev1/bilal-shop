import SummaryApi from "../common/index";

const fetcgCategoryWiseProduct = async (category) => {
  try {
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
  } catch (err) {
    return {
      success: false,
      data: [],
      message: err?.message || "Network error",
    };
  }
};

export default fetcgCategoryWiseProduct;
