const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i");

    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    return res.status(200).json({
      message: "Search Product list",
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

module.exports = searchProduct;
