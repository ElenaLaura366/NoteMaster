const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const verifyToken = require('../middlewares/verifyToken');

router.get("/", async (req, res) => {
  const students = await Student.find().populate({
    path: "grades.subject",
    populate: { path: "teacher" },
  });
  res.json(students);
});

router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(student);
});

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

router.get("/me", async (req, res) => {
  try {
    const student = await Student.findById(req.user.userId)
      .populate("grades.subject", "name")
      .exec();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("Eroare la /me:", err);
    res.status(500).json({ message: "Eroare la obținerea datelor studentului" });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  console.log("🔥 req.user in /profile:", req.user); 
  try {
    const student = await Student.findOne({ email: req.user.email }).populate('grades.subject');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
