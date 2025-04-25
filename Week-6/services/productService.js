const Product = require("../models/productModel");

const getAllProducts = async () => {
  return await Product.find();
};

const seedProducts = async () => {
  await Product.deleteMany();
  const sampleData = [
    {
      title: "SuperPhone",
      description: "Premium sound quality.",
      image: "images/kitten1.jpg"
    },
    {
      title: "SmartComfort",
      description: "Cushioned for comfort.",
      image: "images/kitten2.jpg"
    },
    {
      title: "UltraEnduro",
      description: "Long battery and endurance.",
      image: "images/kitten3.jpg"
    }
  ];
  await Product.insertMany(sampleData);
  return { message: "Products seeded successfully" };
};

module.exports = { getAllProducts, seedProducts };
