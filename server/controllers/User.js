import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/user.js";
import Workout from "../models/workout.js";

dotenv.config();

//NEW REGISTRATION
export const UserRegister = async (req, res, next) => {
  console.log("====== REGISTER CALLED ======");
  console.log("Headers:", req.headers);
  console.log("Body received:", req.body);

  try {
    const { email, password, name, img } = req.body;

    if (!email || !password || !name) {
      console.log("🚫 MISSING FIELDS:", { email, password, name }); // Log the fields
      return next(createError(400, "All fields (email, password, name) are required."));
    }
      // Check if the email is in use
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return next(createError(409, "Email is already in use."));
      }

// export const UserRegister = async (req, res, next) => {
//     try {
//       const { email, password, name, img } = req.body;

//       if (!email || !password || !name) {
//         return next(createError(400, "All fields (email, password, name) are required."));
//     }

      //Hashing is the process of converting password into a fixed-length, unique, and irreversible string using a mathematical function.
      //Salt ensures that even identical passwords generate different hashes. 

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const user = new User({
          name,
          email,
          password: hashedPassword,
          img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
          expiresIn: "9999 years",
        });
        return res.status(200).json({ token, user });
      } catch (error) {
        return next(error);
      }
    };

//LOGIN 
// export const UserLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });
//     // Check if user exists
//     if (!user) {
//       return next(createError(404, "User not found"));
//     }
//     console.log(password, user.password);
//     // Check if password is correct
//     const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
//     if (!isPasswordCorrect) {
//       return next(createError(401, "Incorrect password"));
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT, {
//       expiresIn: "9999 years",
//     });

//     return res.status(200).json({ token, user });
//   } catch (error) {
//     return next(error);
//   }
// }; 

// LOGIN 
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Specific message for invalid email
      return res.status(400).json({ message: "Incorrect Email" });
    }

    // if (!user) {
    //   // If user is not found, assume both are incorrect (can't check password)
    //   return res.status(400).json({ message: "Login Failed. Please try again." });
    // }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      // Specific message for incorrect password
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years", 
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        // add other public fields if needed
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};


//Fetch the currently logged-in user’s details using their token, 
//looks up that user in the database,
//and eventually show them their dashboard info.
export const getUserDashboard = async(req, res, next)=>{
  try{
    const userId = req.user?.id; //This gets the user's ID from the request.
    const user = await User.findById(userId); //fetch the user from MongoDB by ID.
    if(!user){
      return next(createError(404,"User not Found"));
    }

    //This function helps you get all entries that belong to today only.
    const currentDateFormatted = new Date(); 
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //Calculate total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { 
        user: user._id, 
        date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no. of Workouts.
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: {$gte: startToday, $lt: endToday},
    });

    //Calculate avg calories burnt per workout.
    const avgCaloriesBurntPerWorkout = totalCaloriesBurnt.length > 0
    ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts : 0;

    //Fetch category of Workers
    //calculates the total calories burned per workout category, for today, for a specific user
    const categoryCalories = await Workout.aggregate([
      { $match: { 
        user: user._id, 
        date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

   //Format category data for pie chart
  
      const pieChartData = categoryCalories.map((category, index) => ({
        id: index,
        value: category.totalCaloriesBurnt,
        label: category._id,
      }));
  
      const weeks = [];
      const caloriesBurnt = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(
          currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
        );
        weeks.push(`${date.getDate()}th`);
  
        const startOfDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const endOfDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        );
  
        const weekData = await Workout.aggregate([
          {
            $match: {
              user: user._id,
              date: { $gte: startOfDay, $lt: endOfDay },
            },
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              totalCaloriesBurnt: { $sum: "$caloriesBurned" },
            },
          },
          {
            $sort: { _id: 1 }, // Sort by date in ascending order
          },
        ]);
  
        caloriesBurnt.push(
          weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
        );
      }
  
      return res.status(200).json({
        totalCaloriesBurnt:
          totalCaloriesBurnt.length > 0
            ? totalCaloriesBurnt[0].totalCaloriesBurnt
            : 0,
        totalWorkouts: totalWorkouts,
        avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
        totalWeeksCaloriesBurnt: {
          weeks: weeks,
          caloriesBurned: caloriesBurnt,
        },
        pieChartData: pieChartData,
      });

    } catch(err){
      next(err);
    }
  };


//This route returns all workouts for a specific date (or today).
//It sums up the total calories burned from those workouts.

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    // Find all workouts for that day
    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );//Loop through all those workouts and add up the caloriesBurned values.

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

//Extract workout details from user entered string.

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;
    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }
    // Split workoutString into lines
    const eachworkout = workoutString.split(";").map((line) => line.trim());
    // Check if any workouts start with "#" to indicate categories
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    // Loop through each line to parse workout details
    await eachworkout.forEach((line) => {
      count++;
      if (line.startsWith("#")) {
        const parts = line?.split("\n").map((part) => part.trim());
        console.log(parts);
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();
        // Extract workout details
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format "));
        }

        if (workoutDetails) {
          // Add category to workout details
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        );
      }
    });

    // Calculate calories burnt for each workout
    await parsedWorkouts.forEach(async (workout) => {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      await Workout.create({ ...workout, user: userId });
    });

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  console.log(parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    console.log(details);
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};

