const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    // array to store one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({category});

      if (product) {
        productByCategory.push(product);
      }
    }

    return res.status(200).json({
      message: "Category Product",
      error: false,
      success: true,
      data: productByCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
