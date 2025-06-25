//Contact-Page handling 

import Feedback from '../models/Feedback.js';  // Importing the Feedback model

export const handleContactForm = async (req, res) => {
    const { name, email, message, rating } = req.body;
  
    if (!name || !email || !message || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const feedback = new Feedback({
        name,
        email,
        message,
        rating,
        submittedAt: new Date(),
      });
  
      await feedback.save();
      res.status(200).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving feedback", error: error.message });
    }
  };