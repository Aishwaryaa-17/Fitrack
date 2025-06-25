import express from "express";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleContactForm } from '../controllers/FeedbackController.js'; // Updated import path

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.post("/add", verifyToken, addWorkout);
router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);
router.post("/contact", handleContactForm);

export default router;
