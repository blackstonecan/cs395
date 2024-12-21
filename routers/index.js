const express = require("express");
const path = require("path");

const html = require("./html");
const api = require("./api");

const router = express.Router();

router.use("/api", api);
router.use(html);

module.exports = router;