const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  AppointmentId: String,
  Text: String,
  Description: String,
  StartDate: Date,
  EndDate: Date,
  AllDay: Boolean,
  Notes: String,
  DateCreated: { type: Date, default: Date.now },
  OrderIndex: String,
  Time: String,
  RecurrenceRule: { type: String, default: null },
  RecurrenceException: { type: String, default: null },
  isDay: { type: Boolean, default: false },
  done: { type: Boolean, default: false }
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);