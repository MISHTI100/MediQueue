const mongoose = require("mongoose");

const patientSchema =
new mongoose.Schema(
{
  patientName: {
    type: String,
    required: true
  },

  phone: String,

  userEmail: String,

  age: Number,

  symptoms: String,

  department: String,

  doctorName: String,

  tokenNumber: String,

  status: {
    type: String,
    default: "Waiting"
  },

  priority: {
    type: String,
    enum: [
      "Emergency",
      "Senior Citizen",
      "Normal"
    ],
    default: "Normal"
  }
},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Patient",
  patientSchema
);