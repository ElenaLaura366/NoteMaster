const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
