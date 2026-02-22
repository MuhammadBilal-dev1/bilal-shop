const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

const UploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    const allowed = await uploadProductPermission(sessionUserId);
    if (!allowed) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    return res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = UploadProductController;
