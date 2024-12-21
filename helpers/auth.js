const jwt = require("jsonwebtoken");

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.SYS_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SYS_SECRET);
};

module.exports = { generateToken, verifyToken };