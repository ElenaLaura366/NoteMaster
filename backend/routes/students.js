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

router.post("/:id/add-grade", async (req, res) => {
  try {
    const { subjectId, value } = req.body;

    if (!subjectId || typeof value !== 'number' || value < 1 || value > 10) {
      return res.status(400).json({ message: "Date invalide" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Elevul nu a fost găsit" });
    }

    const newGrade = {
      subject: subjectId,
      value,
      date: new Date(),
    };

    student.grades.push(newGrade);
    await student.save();

    res.json({ message: "Notă adăugată cu succes", student });
  } catch (err) {
    console.error("Eroare la adăugare notă:", err);
    res.status(500).json({ message: "Eroare server" });
  }
});

router.get("/:id/grades", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate({
      path: "grades.subject",
      select: "name"
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student.grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const email = name.replace(/\s+/g, '').toLowerCase() + "@student.com";
    const password = "123456";

    const student = new Student({
      name,
      email,
      group: "10A",
      password,
      grades: []
    });

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
