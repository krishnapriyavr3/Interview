import React, { useState } from "react";
import axios from "axios";

const Practice = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("Click below to load a question...");
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState(false);

  // Fetch question from backend
  const fetchQuestion = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions", {
        params: { category: category || undefined },
      });
      setQuestion(res.data.text || "No question received.");
      setAnswer("");
      setShowReview(false);
    } catch (err) {
      console.error("Error fetching question:", err.message);
      setQuestion("⚠️ Could not fetch question. Please try again.");
    }
  };

  // Handle answer submission
  const submitAnswer = () => {
    setReview(answer || "No answer provided.");
    setShowReview(true);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-3">
        <h1 className="navbar-brand mb-0">Practice Questions</h1>
        <div>
          <a href="/dashboard" className="btn btn-warning me-2">
            Dashboard
          </a>
          <button className="btn btn-danger">Logout</button>
        </div>
      </nav>

      {/* Practice Section */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold text-primary mb-4">
          Sharpen Your Interview Skills
        </h2>

        {/* Filter */}
        <div className="mb-4">
          <label className="fw-semibold me-2">Choose Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select w-auto d-inline-block"
          >
            <option value="">Any</option>
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>

        {/* Question Card */}
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
          <p className="fs-5 mb-3">{question}</p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="form-control mb-3"
            rows="4"
          />

          <div className="d-flex justify-content-center gap-3">
            <button onClick={submitAnswer} className="btn btn-success">
              Submit Answer
            </button>
            <button onClick={fetchQuestion} className="btn btn-primary">
              Next Question
            </button>
          </div>
        </div>

        {/* Review Section */}
        {showReview && (
          <div
            className="card bg-light p-3 mt-4 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <h5 className="fw-bold text-primary">Your Answer</h5>
            <p>{review}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
