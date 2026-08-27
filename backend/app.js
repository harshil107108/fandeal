const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const posterRoutes = require("./routes/posterRoutes");
const app = express();
const port = process.env.PORT || 8080;

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/poster", posterRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});