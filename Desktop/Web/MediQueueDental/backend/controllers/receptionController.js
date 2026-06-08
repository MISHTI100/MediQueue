const Patient = require("../models/Patient");
const Token = require("../models/Token");
const Doctor = require("../models/Doctor");

exports.registerPatientAndGenerateToken = async (req, res) => {
  try {

    const {
  patientName,
  phone,
  age,
  priority,
  doctorName,
  userEmail
} = req.body

    // Check doctor
    const doctor = await Doctor.findOne({
      doctorName
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    // Check availability
    if (doctor.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Doctor is currently unavailable"
      });
    }

    // Emergency check
    if (
      priority === "Emergency" &&
      !doctor.emergencyAvailable
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Doctor not accepting emergency patients"
      });
    }

    // Create patient
    const patient = await Patient.create({
  patientName,
  phone,
  age,
  priority,
  userEmail
});

    // Generate token
    const count =
      await Token.countDocuments();

    const tokenNumber =
      `DENT-${String(
        count + 1
      ).padStart(3, "0")}`;

    // Create token
    const token = await Token.create({
      tokenNumber,
      patientId: patient._id,
      doctorId: doctor._id,
      priority,
      status: "Waiting"
    });

    res.status(201).json({
      success: true,
      message:
        "Patient Registered Successfully",
      tokenNumber,
      doctorName:
        doctor.doctorName,
      patient,
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};