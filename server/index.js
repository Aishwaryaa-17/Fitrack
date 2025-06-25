import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import workoutRoutes from "./routes/workout.js";
import contactRoutes from './routes/contact.js';

dotenv.config();
console.log("MONGODB_URL:", process.env.MONGODB_URL);

const app = express();
app.use(cors({
  origin: "https://fitrack-aish.vercel.app", // should be your Vercel frontend URL
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Base route to check server status
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "FiTrack backend is live!",
  });
});
app.get("/api", (req, res) => {
  res.status(200).json({ message: "API is working fine 👌" });
});

// Use the imported User routes
app.use("/api/user", UserRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/contact", contactRoutes);

// Database connection function
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Server startup function
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;

    console.log("PORT:", PORT);

    // ✅ Important change for Render: bind to 0.0.0.0
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Global error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, message });
});

// Start the server
startServer();
