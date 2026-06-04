const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  createRequest,
  getRequests,
  deleteRequest
} = require(
  "../controllers/patientController"
);

router.post("/", addPatient);

router.get("/", getPatients);

router.post(
  "/request",
  createRequest
);

router.get(
  "/requests",
  getRequests
);
router.delete(
  "/requests/:id",
  deleteRequest
);

module.exports = router;