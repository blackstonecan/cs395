const express = require("express");
const path = require("path");

const { getIndex, get404, getLogin, getRegister } = require("../controllers");

const router = express.Router();
const BASE_URL = path.join(__dirname, "..", "public");

router.get("/monitor", getIndex);
router.get("/login", getLogin);
router.get("/register", getRegister);
router.use(get404);

module.exports = router;