const express = require("express");
const { registerAdmin, loginAdmin } = require("../controller/admin");

const router = express.Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

module.exports = router;
