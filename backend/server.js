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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/questions", require("./routes/questions"));
