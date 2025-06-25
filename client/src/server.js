// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Server is running on port 3001');
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Import routes
import UserRoutes from "./routes/User.js";
import workoutRoutes from "./routes/workout.js";
import contactRoutes from './routes/contact.js';

// config + middleware
dotenv.config();
const app = express();
app.use(cors({ origin: "https://fitrack-red.vercel.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api", contactRoutes);

// Default base route
app.get("/", (req, res) => {
  res.status(200).json({ message: "FiTrack backend is live!" });
});

// MongoDB + server start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
};
connectDB();
