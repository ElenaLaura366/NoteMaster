const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.get("/", async (req, res) => {
  const subjects = await Subject.find().populate("teacher");
  res.json(subjects);
});

router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.json(subject);
});

router.put("/:id", async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(subject);
});

router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
});

module.exports = router;
