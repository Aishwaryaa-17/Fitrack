// server/routes/workout.js

import express from "express";
import { addWorkout, getWorkoutsByDate } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route for adding a workout
router.post("/add", verifyToken, addWorkout);

// Route for fetching workouts by date
router.get("/", verifyToken, getWorkoutsByDate);

export default router;
