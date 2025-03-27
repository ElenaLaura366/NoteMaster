const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  group: String,
  password: String,
  grades: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      value: Number,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
