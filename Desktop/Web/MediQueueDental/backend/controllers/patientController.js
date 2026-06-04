const Patient = require("../models/Patient");

exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const AppointmentRequest =
require("../models/AppointmentRequest");

exports.createRequest =
async (req, res) => {
  try {

    const request =
      await AppointmentRequest.create(
        req.body
      );

    res.json({
      success: true,
      request
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getRequests =
async (req, res) => {
  try {

    const requests =
      await AppointmentRequest.find();

    res.json({
      success: true,
      requests
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({
      success: true,
      patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteRequest =
async (req, res) => {
  try {

    await AppointmentRequest.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Request Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};