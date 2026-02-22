const addToCartModel = require("../../models/cartProduct");

const updateAddToCardProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addTocartProductId = req.body._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne({_id : addTocartProductId}, {
      ...(qty && { quantity: qty }),
    });

    return res.json({
      message: "Product Updated",
      data: updateProduct,
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

module.exports = updateAddToCardProduct;
