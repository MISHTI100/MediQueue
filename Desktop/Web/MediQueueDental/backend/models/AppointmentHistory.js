const mongoose =
  require("mongoose");

const appointmentHistorySchema =
  new mongoose.Schema({

    tokenNumber: String,

    patientName: String,

    phone: String,

    age: Number,

    symptoms: String,

    doctorName: String,

    priority: String,

    completedAt: {
      type: Date,
      default: Date.now
    }

  });

module.exports =
mongoose.model(
  "AppointmentHistory",
  appointmentHistorySchema
);