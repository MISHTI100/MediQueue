const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getDoctors = async (
  req,
  res
) => {
  try {

    const doctors =
      await Doctor.find()
      .sort({
        doctorName: 1
      });

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};
exports.updateAvailability =
async (req, res) => {
  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message:
          "Doctor not found"
      });
    }

    doctor.status =
      req.body.status;

    await doctor.save();

    res.json({
      success: true,
      doctor
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};

exports.updateEmergency =
async (req, res) => {
  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message:
          "Doctor not found"
      });
    }

    doctor.emergencyAvailable =
      req.body.emergencyAvailable;

    await doctor.save();

    res.json({
      success: true,
      doctor
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};
exports.deleteDoctor = async (req, res) => {
  try {

    const doctor =
      await Doctor.findByIdAndDelete(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.json({
      success: true,
      message:
        "Doctor Removed Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};