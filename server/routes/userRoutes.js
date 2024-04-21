const express = require("express");
const { registerUser, loginUser, findUserDetails } = require("../controllers/userControllers");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

//to update cart of the user
router.post("/details",requireAuth, findUserDetails);

module.exports = router;