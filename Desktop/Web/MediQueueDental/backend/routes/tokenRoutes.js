const express = require("express");
const router = express.Router();

const {
  generateToken,
  getQueue,
  callNextPatient,
  completeConsultation,
  skipPatient,
  transferPatient,
  dashboardStats,
  averageWaitingTime,
  deleteToken,
  archiveAppointment,
  getAppointmentHistory,
  downloadExcelReport,
  getDoctorQueue,
  callPatientById,
  getTokenById
} = require("../controllers/tokenController");
// Generate Token
router.post("/", generateToken);

// Get Full Queue
router.get("/", getQueue);

// Dashboard Stats
router.get("/dashboard", dashboardStats);

// Analytics
router.get(
  "/analytics/waiting-time",
  averageWaitingTime
);

// Call Next Patient
router.post(
  "/call-next",
  callNextPatient
);

// Complete Consultation
router.post(
  "/complete/:id",
  completeConsultation
);

// Skip Patient
router.post(
  "/skip/:id",
  skipPatient
);

// Transfer Patient To Another Doctor
router.post(
  "/transfer/:id",
  transferPatient
);
router.delete(
  "/:id",
  deleteToken
);

router.post(
  "/archive/:id",
  archiveAppointment
);
router.get(
  "/excel-report",
  downloadExcelReport
);

router.get(
  "/doctor/:doctorId",
  getDoctorQueue
);

router.post(
  "/call/:id",
  callPatientById
);

router.get(
  "/:id",
  getTokenById
);

module.exports = router;