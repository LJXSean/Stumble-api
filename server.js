const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path");
const cors = require("cors");

// Connect Database
connectDB();

// Init middleware (for req.body parser in user api)
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server in ${process.env.NODE_ENV} mode, listening on :${PORT}`);
});
