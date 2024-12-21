const asyncHandler = require("express-async-handler");
const {
  userLogin,
  userRegister,
  generateToken,
  verifyToken,
} = require("../helpers");

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userLogin(email, password);

    let token = null;
    if (user) token = generateToken(user);

    const response = {
      success: user,
      token,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });
    }

    const user = await userRegister(email, password);

    let token = null;
    if (user) token = generateToken(user);

    const response = {
      success: user,
      token,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

const verify = asyncHandler(async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const user = verifyToken(token);

    const response = {
      success: user,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  login,
  register,
  verify
};
