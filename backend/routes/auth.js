const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

router.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send("Student registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    // 1. Caută utilizatorul după nume
    const student = await Student.findOne({ name });
    if (!student) {
      // 404: nu există un student cu acest "name"
      return res.status(404).send("User not found");
    }

    // 2. Dacă există, compară parola
    if (student.password !== password) {
      // 401: parola greșită
      return res.status(401).send("Wrong password");
    }

    // 3. Dacă userul există și parola e corectă, emite token
    const token = jwt.sign({ userId: student._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
