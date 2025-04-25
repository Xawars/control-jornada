const mongoose = require("mongoose");

const JornadaSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: Date, required: true },
  end: { type: Date },
  hours: { type: Number },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
});

module.exports = mongoose.model("Jornada", JornadaSchema);
