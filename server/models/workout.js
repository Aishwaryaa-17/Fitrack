import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
      // ✅ Removed unique: true here
    },
    sets: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    caloriesBurned: {
      type: Number,
    },
    date: {
      type: Date,
      default: () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0); // Set to start of day
        return d;
      }
    }
  },
  { timestamps: true }
);

// ✅ Composite unique index: one workout per user per day
WorkoutSchema.index({ user: 1, workoutName: 1, date: 1 }, { unique: true });

export default mongoose.model("Workout", WorkoutSchema);
