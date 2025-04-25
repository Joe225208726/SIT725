const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes"); // Optional: if you have this route file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/SIT725", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/products", productRoutes); // Optional route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// ✅ Add this route to support /add?a=10&b=5
app.get("/add", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Invalid input");
  }

  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// Listen only if not imported by test files
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

module.exports = app; // For test access
