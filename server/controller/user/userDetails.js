const userModel = require("../../models/userModel");

const userDetailsController = async (req, res) => {
  try {

    const user = await userModel.findById(req.userId);

    return res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userDetailsController;
