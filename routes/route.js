const express = require("express");
const router = express.Router();
const {uploadHandler} = require("../controllers/controller");
const {registerHandler} = require("../controllers/controller")


router.post("/upload",uploadHandler);

router.post("/register",registerHandler);

module.exports = router;