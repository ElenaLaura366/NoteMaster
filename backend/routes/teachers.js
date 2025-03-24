const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

router.get("/", async (req, res) => {
  const teachers = await Teacher.find().populate("subjects");
  res.json(teachers);
});

router.post("/", async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
});

router.put("/:id", async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(teacher);
});

router.delete("/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
});

module.exports = router;
