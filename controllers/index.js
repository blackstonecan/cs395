const { getIndex, getLogin, get404, getRegister } = require("./html");
const { register, login, verify } = require("./api");

module.exports = {
  getIndex,
  getLogin,
  getRegister,
  get404,
  register,
  login,
  verify
};
