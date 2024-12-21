const path = require("path");

const BASE_URL = path.join(__dirname, "..", "public");

const getIndex = (req, res) => {
  res.sendFile(path.join(BASE_URL, "index.html"));
};

const get404 = (req, res) => {
  res.status(404).sendFile(path.join(BASE_URL, "404.html"));
};

const getLogin = (req, res) => {
  res.sendFile(path.join(BASE_URL, "login.html"));
}

const getRegister = (req, res) => {
  res.sendFile(path.join(BASE_URL, "register.html"));
}

module.exports = { getIndex, get404, getLogin, getRegister };