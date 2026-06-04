import { useEffect, useState } from "react";
import API from "../services/api";

function DoctorPanel() {

  const [queue, setQueue] =
    useState([]);
  
  const [doctors, setDoctors] =
  useState([]);

const [selectedDoctor,
  setSelectedDoctor] =
  useState("");

  const [available, setAvailable] =
    useState(false);

  const [emergency, setEmergency] =
    useState(true);

  const loadDoctors =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.get(
        "/doctors",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      "DOCTORS:",
      res.data
    );

    setDoctors(
      res.data.doctors || []
    );

    if (
      res.data.doctors?.length > 0
    ) {

      setSelectedDoctor(
        res.data.doctors[0]._id
      );

    }

  } catch (error) {

    console.log(
      "DOCTOR ERROR:",
      error
    );

  }

};
``

  const loadQueue = async () => {
  try {

    const res =
      await API.get(
  `/tokens/doctor/${selectedDoctor}`
);

    console.log(
      "TOKENS:",
      res.data
    );

    setQueue(
      res.data.queue || []
    );

  } catch (error) {

    console.log(
      "QUEUE ERROR:",
      error
    );

  }
};

  useEffect(() => {

  loadDoctors();

}, []);

useEffect(() => {

  if (
    selectedDoctor
  ) {

    loadQueue();

  }

}, [selectedDoctor]);

  const callNextPatient =
    async () => {
      try {

        await API.post(
          "/tokens/call-next"
        );

        loadQueue();

        alert(
          "Next Patient Called"
        );

      } catch (error) {

        console.log(error);

      }
    };
  const recallPreviousPatient = async () => {
  try {

    const consultationPatient =
      queue.find(
        (token) =>
          token.status ===
          "In Consultation"
      );

    if (!consultationPatient) {
      alert(
        "No Current Patient Found"
      );
      return;
    }

    await API.post(
      `/tokens/skip/${consultationPatient._id}`
    );

    loadQueue();

    alert(
      "Moved Back To Queue"
    );

  } catch (error) {

    console.log(error);

  }
};
const callPatient =
async (id) => {

  try {

    await API.post(
      `/tokens/call/${id}`
    );

    loadQueue();

    alert(
      "Patient Called"
    );

  } catch (error) {

    console.log(error);

  }

};


  const completePatient =
    async (id) => {

      try {

        await API.post(
  `/tokens/complete/${id}`
);

alert(
  "✅ Appointment Saved Successfully"
);

loadQueue();

      } catch (error) {

        console.log(error);

      }
    };
    const nextPatient =
  queue.find(
    (token) =>
      token.status ===
      "Waiting"
  );
const archiveAppointment =
async (id) => {

  try {

    await API.post(
      `/tokens/archive/${id}`
    );

    alert(
      "Appointment Saved"
    );

    loadQueue();

  } catch (error) {

    console.log(error);

  }

};
  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f8fb",
        minHeight: "100vh"
      }}
    >
      <h1>
        👨‍⚕️ Doctor Dashboard
      </h1>

      <h3>
  Select Doctor
</h3>

<select
  value={selectedDoctor}
  onChange={(e) =>
    setSelectedDoctor(
      e.target.value
    )
  }
  style={{
    padding: "10px",
    marginBottom: "20px"
  }}
>
  {doctors.map((doc) => (
    <option
      key={doc._id}
      value={doc._id}
    >
      {doc.doctorName}
    </option>
  ))}
</select>
      <div
  style={{
    marginBottom: "20px"
  }}
>
  <button
    onClick={() =>
      window.open(
        "http://localhost:5000/api/tokens/excel-report",
        "_blank"
      )
    }
    style={{
      padding: "12px 20px",
      fontSize: "16px",
      background: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    📊 Download Excel Report
  </button>
</div>

      <div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
  

  

  
</div>

      <br />
      <br />

      <button
        onClick={() =>
          setAvailable(true)
        }
      >
        Available
      </button>

      <button
        onClick={() =>
          setAvailable(false)
        }
      >
        Unavailable
      </button>

      <p>
        Status:
        {available
          ? " Available"
          : " Unavailable"}
      </p>

      <hr />

      <h2>
        Patient Queue
      </h2>

      {queue.map((token) => (
        <div
          key={token._id}
          style={{
            background:
              "white",
            padding:
              "15px",
            marginBottom:
              "15px",
            borderRadius:
              "10px"
          }}
        >
          <h3>
            {
              token.tokenNumber
            }
          </h3>

          <p>
  <strong>Patient:</strong>{" "}
  {token.patientId?.patientName}
</p>

<p>
  <strong>Phone:</strong>{" "}
  {token.patientId?.phone}
</p>

<p>
  <strong>Age:</strong>{" "}
  {token.patientId?.age}
</p>

<p>
  <strong>Symptoms:</strong>{" "}
  {token.patientId?.symptoms}
</p>



<p>
  <strong>Department:</strong>{" "}
  {token.patientId?.department}
</p>

<p>
  <strong>Doctor:</strong>{" "}
  {token.doctorId?.doctorName}
</p>

          <p>
            <strong>
              Status:
            </strong>
            {" "}
            {
              token.status
            }
          </p>

          <p>
  <strong>
    Priority:
  </strong>
  {" "}
  {token.priority}
</p>

<div>

  <button
    onClick={() =>
      callPatient(
        token._id
      )
    }
    style={{
      background:
        "#007bff",
      color:
        "white",
      marginRight:
        "10px"
    }}
  >
    📢 Call Patient
  </button>

  <button
    onClick={() =>
      completePatient(
        token._id
      )
    }
  >
    ✅ Complete Appointment
  </button>

</div>
        </div>
      ))}
    </div>
  );
}

export default DoctorPanel;