const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors=require("cors");


// Import routes
const userRoutes = require("./routes/userRoutes"); // optional if you have it
const authRoutes = require("./routes/authRoutes");
const prodRoutes = require('./routes/productRoutes');
// const bookingRoutes = require("./routes/BookingRoutes");

dotenv.config();
const app = express();

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// // Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and MongoDB connected!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // optional if you have user routes
app.use('/api/prod', prodRoutes);
// app.use("/api/bookings", bookingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));