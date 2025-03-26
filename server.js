require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  education: String,
  subject: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
});

// Create Model
const Contact = mongoose.model("Contact", ContactSchema);

// API Route to Handle Form Submission
app.post("/submit", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
