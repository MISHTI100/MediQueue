const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: true
    },

    specialization: {
      type: String,
      required: true
    },

    roomNumber: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Unavailable"
      ],
      default: "Available"
    },

    emergencyAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports =
mongoose.model(
  "Doctor",
  doctorSchema
);