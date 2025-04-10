const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to get products" });
  }
};

const seedProducts = async (req, res) => {
  try {
    const result = await productService.seedProducts();
    res.send(result.message);
  } catch (err) {
    res.status(500).json({ error: "Failed to seed products" });
  }
};

module.exports = { getProducts, seedProducts };
