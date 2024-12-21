const { getDynamicSysInfo, getStaticSysInfo } = require("./getSysInfo");
const { userLogin, userRegister } = require("./user");
const { generateToken, verifyToken } = require("./auth");

module.exports = {
  getStaticSysInfo,
  getDynamicSysInfo,
  userLogin,
  userRegister,
  generateToken,
  verifyToken
};
