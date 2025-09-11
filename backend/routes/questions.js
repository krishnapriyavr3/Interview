const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add a new question
router.post("/", async (req, res) => {
  try {
    const { text, category } = req.body;
    const question = new Question({ text, category });
    await question.save();
    res.json({ msg: "Question added", question });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a random question
router.get("/random", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a question
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ msg: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
// Get a random question (with optional category filter)
router.get("/random", async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const count = await Question.countDocuments(filter);
    if (count === 0) return res.json(null);
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne(filter).skip(random);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
