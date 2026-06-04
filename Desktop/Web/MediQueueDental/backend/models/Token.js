const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    tokenNumber: String,

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },

    priority: String,

    status: {
      type: String,
      enum: [
        "Waiting",
        "In Consultation",
        "Done",
        "Skipped"
      ],
      default: "Waiting"
    },

    issueTime: {
      type: Date,
      default: Date.now
    },

    callTime: Date,

    endTime: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Token", tokenSchema);