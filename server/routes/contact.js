import express from 'express';
import Feedback from '../models/Feedback.js'; // Assuming the model for feedback is in this file

const router = express.Router();

// POST route for handling feedback submissions
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation check (optional)
    if (!name || !email || !message || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({ name, email, message, rating });

    // Save the feedback to the database
    await newFeedback.save();

    console.log('----Feedback Submitted----:', newFeedback);

    // Return a success response
    return res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

export default router;
