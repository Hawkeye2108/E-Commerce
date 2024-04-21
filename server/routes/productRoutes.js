const express = require("express");
const { getAllProducts, addProduct, removeProduct, removeAllProducts } = require("../controllers/productControllers");
const requireAuth = require("../middlewares/requireAuth")
const router = express.Router();

router.get("/", getAllProducts);

//Add a product to user's cart
router.post("/add", requireAuth, addProduct);

//Remove a product from user's cart
router.post("/remove", requireAuth, removeProduct);

//Remove all products from user's cart
router.post("/removeAllProducts", requireAuth, removeAllProducts);

module.exports = router;