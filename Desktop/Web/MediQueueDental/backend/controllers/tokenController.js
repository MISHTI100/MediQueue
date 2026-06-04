const ExcelJS =
require("exceljs");
const AppointmentHistory =
require(
  "../models/AppointmentHistory"
);
const Token = require("../models/Token");

// Generate Token
exports.generateToken = async (req, res) => {
  try {
    const count =
  await Token.countDocuments();

const nextNumber =
  (count % 999) + 1;

const tokenNumber =
  `DENT-${String(
    nextNumber
  ).padStart(3, "0")}`;

    const token = await Token.create({
      tokenNumber,
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      priority: req.body.priority
    });

    res.status(201).json({
      success: true,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Queue
exports.getQueue = async (req, res) => {
  try {

    const queue = await Token.find()
      .populate("patientId")
      .populate("doctorId");

    res.status(200).json({
      success: true,
      queue
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Call Next Patient
exports.callNextPatient = async (req, res) => {
  try {

    const queue = await Token.find({
      status: "Waiting"
    });

    const priorityOrder = {
      Emergency: 1,
      "Senior Citizen": 2,
      Normal: 3
    };

    queue.sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );

    if (queue.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No patients in queue"
      });
    }

    const nextPatient = queue[0];

    nextPatient.status = "In Consultation";
    nextPatient.callTime = new Date();

    await nextPatient.save();

    res.status(200).json({
      success: true,
      token: nextPatient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Complete Consultation
exports.completeConsultation = async (req, res) => {
  try {

    const token =
  await Token.findById(
    req.params.id
  )
  .populate("patientId")
  .populate("doctorId");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      });
    }

    token.status = "Done";
token.endTime = new Date();

await AppointmentHistory.create({

  tokenNumber:
    token.tokenNumber,

  patientName:
    token.patientId?.patientName,

  phone:
    token.patientId?.phone,

  age:
    token.patientId?.age,

  symptoms:
    token.patientId?.symptoms,

  doctorName:
    token.doctorId?.doctorName,

  priority:
    token.priority

});

await Token.findByIdAndDelete(
  req.params.id
);

res.status(200).json({
  success: true,
  message:
    "Appointment Completed And Saved"
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Skip Patient
exports.skipPatient = async (req, res) => {
  try {

    const token =
      await Token.findById(
        req.params.id
      );

    if (!token) {
      return res.status(404).json({
        success: false,
        message:
          "Token not found"
      });
    }

    token.status =
      "Waiting";

    await token.save();

    res.status(200).json({
      success: true,
      message:
        "Patient moved back to queue",
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};

// Transfer Patient To Another Doctor
exports.transferPatient = async (req, res) => {
  try {

    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      });
    }

    token.doctorId = req.body.newDoctorId;

    await token.save();

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Dashboard Statistics
exports.dashboardStats = async (req, res) => {
  try {

    const waiting = await Token.countDocuments({
      status: "Waiting"
    });

    const served = await Token.countDocuments({
      status: "Done"
    });

    const consultation = await Token.countDocuments({
      status: "In Consultation"
    });

    const skipped = await Token.countDocuments({
      status: "Skipped"
    });

    res.status(200).json({
      success: true,
      waiting,
      served,
      consultation,
      skipped
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Average Waiting Time Analytics
exports.averageWaitingTime = async (req, res) => {
  try {

    const completed = await Token.find({
      status: "Done"
    });

    let totalWaitingTime = 0;
    let count = 0;

    completed.forEach((token) => {

      if (token.callTime && token.issueTime) {

        totalWaitingTime +=
          (new Date(token.callTime) -
            new Date(token.issueTime))
          / 60000;

        count++;
      }

    });

    const averageWaitingTime =
      count > 0
        ? (totalWaitingTime / count).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      averageWaitingTime
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.deleteToken =
async (req, res) => {

  try {

    const token =
      await Token.findByIdAndDelete(
        req.params.id
      );

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Patient removed from queue"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.archiveAppointment =
async (req, res) => {

  try {

    const token =
      await Token.findById(
        req.params.id
      )
      .populate("patientId")
      .populate("doctorId");

    if (!token) {
      return res.status(404).json({
        success: false
      });
    }

    await AppointmentHistory.create({

      tokenNumber:
        token.tokenNumber,

      patientName:
        token.patientId
          ?.patientName,

      phone:
        token.patientId
          ?.phone,

      age:
        token.patientId
          ?.age,

      symptoms:
        token.patientId
          ?.symptoms,

      doctorName:
        token.doctorId
          ?.doctorName,

      priority:
        token.priority

    });

    await Token.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};
exports.getAppointmentHistory =
async (req, res) => {

  try {

    const history =
      await AppointmentHistory.find()
      .sort({
        createdAt: -1
      });

    res.json({
      success: true,
      history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};
exports.downloadExcelReport =
async (req, res) => {

  try {

    const history =
      await AppointmentHistory.find();

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Appointments"
      );

    worksheet.columns = [
      {
        header:
          "Token Number",
        key:
          "tokenNumber",
        width: 20
      },
      {
        header:
          "Patient Name",
        key:
          "patientName",
        width: 25
      },
      {
        header:
          "Phone",
        key:
          "phone",
        width: 20
      },
      {
        header:
          "Age",
        key:
          "age",
        width: 10
      },
      {
        header:
          "Symptoms",
        key:
          "symptoms",
        width: 30
      },
      {
        header:
          "Doctor Name",
        key:
          "doctorName",
        width: 25
      },
      {
        header:
          "Priority",
        key:
          "priority",
        width: 15
      }
    ];

    history.forEach(
      (item) => {

        worksheet.addRow({
          tokenNumber:
            item.tokenNumber,

          patientName:
            item.patientName,

          phone:
            item.phone,

          age:
            item.age,

          symptoms:
            item.symptoms,

          doctorName:
            item.doctorName,

          priority:
            item.priority
        });

      }
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Appointments.xlsx"
    );

    await workbook.xlsx.write(
      res
    );

    res.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

exports.getDoctorQueue =
async (req, res) => {

  try {

    const queue =
      await Token.find({

        doctorId:
          req.params.doctorId,

        status: {
          $ne: "Done"
        }

      })
      .populate("patientId")
      .populate("doctorId");

    res.json({
      success: true,
      queue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

exports.callPatientById =
async (req, res) => {

  try {

    await Token.updateMany(
      {},
      {
        status:
          "Waiting"
      }
    );

    const token =
      await Token.findById(
        req.params.id
      );

    if (!token) {

      return res.status(404)
      .json({
        success:false
      });

    }

    token.status =
      "In Consultation";

    token.callTime =
      new Date();

    await token.save();

    res.json({
      success:true,
      token
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
exports.getTokenById =
async (req, res) => {

  try {

    const token =
      await Token.findById(
        req.params.id
      )
      .populate("patientId")
      .populate("doctorId");

    res.json({
      success: true,
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};