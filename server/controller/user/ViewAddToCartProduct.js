const addToCartModel = require("../../models/cartProduct");

const ViewAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProduct = await addToCartModel
      .find({
        userId: currentUser,
      })
      .populate("productId");

    return res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = ViewAddToCartProduct;
