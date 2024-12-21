const express = require("express");

const { login, register, verify } = require("../controllers");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);

module.exports = router;