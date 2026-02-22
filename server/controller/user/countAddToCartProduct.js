const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({
      userId: userId,
    });

    return res.json({
      message: "Ok",
      data: {
        count: count,
      },
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

module.exports = countAddToCartProduct;
