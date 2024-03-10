const express = require("express");
const router = express.Router();
const {uploadHandler} = require("../controllers/controller");
const {registerHandler} = require("../controllers/controller")

router.get("/",(req,res)=>{
    res.send("<h1>Jatin</h1>");
});


router.post("/upload",uploadHandler);

router.post("/register",registerHandler);

module.exports = router;