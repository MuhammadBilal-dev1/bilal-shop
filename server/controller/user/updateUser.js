const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;

    const sessionUserDoc = await userModel.findById(sessionUser);
    if (sessionUserDoc?.role !== "ADMIN") {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    return res.status(200).json({
      data: updateUser,
      error: false,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateUser;
