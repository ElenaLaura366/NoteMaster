const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const subjectRoutes = require("./routes/subjects");
const authRoutes = require("./routes/auth");
const verifyToken = require('./middlewares/verifyToken');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", verifyToken, studentRoutes);
app.use("/api/teachers", verifyToken, teacherRoutes);
app.use("/api/subjects", verifyToken, subjectRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
