const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      data: [],
      success: true,
      error: false,
      message: "Logged out successfully!",
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userLogout;
