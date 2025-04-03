const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public"))); // Serve frontend files

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/SIT725", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose Schema and Model
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const Product = mongoose.model("Product", ProductSchema);

// Get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send("Failed to fetch products.");
    }
});

// Seed route to populate test data
app.get("/seed", async (req, res) => {
    try {
        await Product.deleteMany(); // Optional: clear existing data

        const sampleData = [
            {
                title: "SuperPhone",
                description: "Premium sound quality.",
                image: "images/kitten1.jpg"
            },
            {
                title: "SmartComfort",
                description: "Cushioned for comfort and clarity.",
                image: "images/kitten2.jpg"
            },
            {
                title: "UltraEnduro",
                description: "Built for long battery and endurance.",
                image: "images/kitten3.jpg"
            }
        ];

        await Product.insertMany(sampleData);
        res.send("✅ Products inserted successfully!");
    } catch (err) {
        res.status(500).send("❌ Failed to seed database.");
    }
});

// Serve index.html on root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
