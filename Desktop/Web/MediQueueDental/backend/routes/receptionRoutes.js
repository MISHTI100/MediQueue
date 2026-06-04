const express = require("express");
const router = express.Router();

const {
  registerPatientAndGenerateToken
} = require("../controllers/receptionController");

router.post(
  "/register",
  registerPatientAndGenerateToken
);

module.exports = router;