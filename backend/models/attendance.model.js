const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
