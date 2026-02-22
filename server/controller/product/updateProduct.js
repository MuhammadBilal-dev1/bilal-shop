const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

const updateProductController = async (req, res) => {
  try {
    const allowed = await uploadProductPermission(req.userId);
    if (!allowed) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    const { _id, ...resbody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resbody);

    return res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;
