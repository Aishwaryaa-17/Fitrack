import axios from "axios";

// 🔄 Change this to your live Render backend URL
const API = axios.create({
  baseURL: "https://fitrack-r3wo.onrender.com"
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, body) =>
  API.post("/workouts/add", body, {
    headers: { Authorization: `Bearer ${token}` },
  });
