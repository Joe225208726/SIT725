const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /api/products
router.get("/", productController.getProducts);

// GET /api/products/seed
router.get("/seed", productController.seedProducts);

module.exports = router;
