const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!email) {
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    if (!user) {
      throw new Error("User not found");
    }

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (checkedPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOptions = {
        httpOnly: true,
        secure: true,
      };

      return res.cookie("token", token, tokenOptions).status(200).json({
        data: token,
        success: true,
        error: false,
        message: "Login successfully!",
      });
    } else {
      throw new Error("Invalid email and password!");
    }
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignInController;
