const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category;
    const product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });

    return res.status(200).json({
      message: "Products",
      error: false,
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
