const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/questions", require("./routes/questions"));
app.get("/api/questions", (req, res) => {
  const { category } = req.query;

  // Mock question bank
  const questions = {
    HR: [
      "Tell me about yourself.",
      "Why should we hire you?",
      "What are your strengths and weaknesses?"
    ],
    Technical: [
      "Explain the difference between REST and GraphQL.",
      "What is a closure in JavaScript?",
      "How does MongoDB differ from SQL databases?"
    ],
    Behavioral: [
      "Describe a time when you faced a conflict in a team and how you handled it.",
      "Tell me about a project you are most proud of.",
      "How do you handle failure?"
    ],
  };

  let pool = [];
  if (category && questions[category]) {
    pool = questions[category];
  } else {
    pool = [...questions.HR, ...questions.Technical, ...questions.Behavioral];
  }

  // Pick a random question
  const randomQuestion = pool[Math.floor(Math.random() * pool.length)];
  res.json({ text: randomQuestion });
});
