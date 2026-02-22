const addToCartModel = require("../../models/cartProduct");

const deleteAddToCardProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addTocartProductId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({_id : addTocartProductId});

    return res.json({
      message: "Product deleted from cart",
      data: deleteProduct,
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

module.exports = deleteAddToCardProduct;
