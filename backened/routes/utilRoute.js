const express = require("express");
const { getUserDetails } = require("../controller/userController");
const authentication = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/user-details", authentication, getUserDetails);

module.exports = router;
