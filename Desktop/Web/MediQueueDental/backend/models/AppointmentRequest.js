const mongoose = require("mongoose");

const appointmentRequestSchema =
new mongoose.Schema(
{
  patientName: String,
  phone: String,
  age: Number,
  symptoms: String,
  department: String,
  doctorName: String,
  userEmail: String,

  status: {
    type: String,
    default: "Pending"
  }
},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "AppointmentRequest",
  appointmentRequestSchema
);