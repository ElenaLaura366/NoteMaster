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
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send("User not found");
    }

    // 2. Dacă există, compară parola
    if (student.password !== password) {
      // 401: parola greșită
      return res.status(401).send("Wrong password");
    }

    // 3. Dacă userul există și parola e corectă, emite token
    const token = jwt.sign({ userId: student._id, email: student.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send({ message: "Utilizatorul nu a fost găsit." });
    }

    // Comparăm cu parola veche (în clar)
    if (student.password === newPassword) {
      return res.status(409).send({ message: "Noua parolă nu poate fi identică cu parola veche." });
    }

    // Dacă e validă, o actualizăm
    student.password = newPassword;
    await student.save();

    res.status(200).send({ message: "Parola a fost resetată cu succes." });
  } catch (err) {
    res.status(500).send({ message: "Eroare internă. Încearcă din nou." });
  }
});


module.exports = router;
