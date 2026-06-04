const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getDoctors,
  updateAvailability,
  updateEmergency,
  deleteDoctor
} = require("../controllers/doctorController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Admin adds doctor
router.post(
  "/",
  protect,
  authorize("Admin"),
  addDoctor
);

// Get all doctors
router.get(
  "/",
  getDoctors
);

// Doctor Available / Unavailable
router.put(
  "/availability/:id",
  protect,
  updateAvailability
);

// Doctor Emergency YES / NO
router.put(
  "/emergency/:id",
  protect,
  updateEmergency
);
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteDoctor
);

module.exports = router;