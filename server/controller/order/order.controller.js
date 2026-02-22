const orderModel = require("../../models/orderProductModel");

const orderController = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const orderList = await orderModel
      .find({ userId: currentUserId })
      .sort({ createdAt: -1 });
    console.log('backend orderlist ',orderList);
    
     res.status(200).json({
      data: orderList,
      message: "Order list",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = orderController;
