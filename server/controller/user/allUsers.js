const userModel = require("../../models/userModel");

const allUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    return res.json({
      message: "All Users",
      data: allUsers,
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

module.exports = allUsers;
