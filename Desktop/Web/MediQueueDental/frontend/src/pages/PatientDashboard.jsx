import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function PatientDashboard() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] =
useState("");

const [phone, setPhone] =
useState("");

const [age, setAge] =
useState("");

const [symptoms, setSymptoms] =
useState("");
const [myToken, setMyToken] =
useState(null);
const [notification, setNotification] =
useState("");

const profileName =
  localStorage.getItem("name");

useEffect(() => {

  const savedToken =
    localStorage.getItem(
      "latestToken"
    );

  if (!savedToken) return;

  setMyToken(
    JSON.parse(savedToken)
  );

}, []);



const loadMyToken =
async (tokenId) => {

  try {

    const res =
      await API.get(
        `/tokens/${tokenId}`
      );

    setMyToken(
      res.data.token
    );

  } catch (error) {

    console.log(error);

  }

};

const loadQueue = async () => {
  try {
    const token = localStorage.getItem("token");

    const res =
      await API.get("/tokens", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    setQueue(
      res.data.queue || []
    );

  } catch (error) {

    console.log(error);

  }
};



const loadDoctors = async () => {
  try {
    const token = localStorage.getItem("token");

    const res =
      await API.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    setDoctors(
      res.data.doctors || []
    );

  } catch (error) {

    console.log(error);

  }
};
useEffect(() => {

  loadQueue();

  loadDoctors();

}, []);

useEffect(() => {
  const interval = setInterval(() => {
    loadQueue();
  }, 3000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {

  const interval =
    setInterval(() => {

      const calledPatient =
  queue.find(
    (token) =>
      myToken &&
      token.tokenNumber ===
        myToken.tokenNumber &&
      token.status ===
        "In Consultation"
  );
  console.log(
  "My Token:",
  myToken?.tokenNumber
);

console.log(
  "Called Patient:",
  calledPatient
);

      const completedPatient =
        queue.find(
          (token) =>
            token.status ===
              "Done" &&
            myToken &&
            token.tokenNumber ===
              myToken.tokenNumber
        );

      if (
        completedPatient
      ) {

        setNotification("");

        localStorage.removeItem(
          "latestToken"
        );

        setMyToken(null);

        return;
      }

      if (calledPatient) {

  setNotification(
    `🔔 Doctor Is Ready To See You. Token ${calledPatient.tokenNumber}`
  );

  if (Notification.permission === "granted") {
    new Notification(
      "MediQueue Alert",
      {
        body: `Doctor is ready to see you. Token ${calledPatient.tokenNumber}`
      }
    );
  }
}

    }, 2000);

  return () =>
    clearInterval(
      interval
    );

}, [queue, myToken]);

// Reset selected doctor when department changes to prevent mismatched bookings
useEffect(() => {
  setSelectedDoctor("");
}, [department]);

const filteredDoctors = doctors.filter((doctor) =>
  doctor.status?.toLowerCase() === "available" &&
  (department === "" || doctor.specialization === department)
);

const bookAppointment = async () => {

  if (
    !patientName ||
    !phone ||
    !age ||
    !selectedDoctor
  ) {
    alert(
      "Please Fill All Details"
    );
    return;
  }

  try {

    await API.post(
  "/patients/request",
  {
    patientName,
    phone,
    age,
    symptoms,
    department,
    doctorName:
      selectedDoctor,

    userEmail:
      localStorage.getItem(
        "email"
      )
  }
);

    alert(
      `Appointment Request Sent To Reception For ${selectedDoctor}`
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed To Send Request"
    );

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
      <h1
        style={{
          textAlign: "center",
          fontSize: "60px"
        }}
      >
        🧑 Patient Dashboard
      </h1>
      <div
  style={{
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center"
  }}
>
  <h2>👤 {localStorage.getItem("name")}</h2>
</div>
      <div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px"
  }}
>
  <h2>
    Patient Details
  </h2>

  <input
    placeholder="Patient Name"
    value={patientName}
    onChange={(e) =>
      setPatientName(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "10px"
    }}
  />

  <input
    placeholder="Phone Number"
    value={phone}
    onChange={(e) =>
      setPhone(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "10px"
    }}
  />

  <input
    placeholder="Age"
    value={age}
    onChange={(e) =>
      setAge(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "10px"
    }}
  />

  <textarea
    placeholder="Symptoms"
    value={symptoms}
    onChange={(e) =>
      setSymptoms(
        e.target.value
      )
    }
    style={{
      width: "100%",
      height: "100px",
      padding: "12px"
    }}
  />
</div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >
        <h2>Select Department</h2>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(
              e.target.value
            )
          }
          style={{
            width: "450px",
            height: "60px",
            fontSize: "22px",
            borderRadius: "10px",
            padding: "10px"
          }}
        >
          <option value="">
            All Departments
          </option>

          <option value="Dental">
            Dental
          </option>

          <option value="Cardiology">
            Cardiology
          </option>

          <option value="Neurology">
            Neurology
          </option>

          <option value="Gynaecology">
  Gynaecology
</option>

          <option value="Orthopedics">
            Orthopedics
          </option>

          <option value="Dermatology">
            Dermatology
          </option>

          <option value="ENT">
            ENT
          </option>

          <option value="General Medicine">
            General Medicine
          </option>

          <option value="Pediatrics">
            Pediatrics
          </option>
        </select>
      </div>

      <br />

      <h2
        style={{
          textAlign: "center"
        }}
      >
        Available Doctors
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {filteredDoctors.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "red"
            }}
          >
            ❌ No Doctors Available In This Department
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() =>
                setSelectedDoctor(
                  doctor.doctorName
                )
              }
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                cursor: "pointer",
                boxShadow:
                  "0px 3px 10px rgba(0,0,0,0.1)",
                border:
                  selectedDoctor ===
                  doctor.doctorName
                    ? "4px solid green"
                    : "1px solid #ddd"
              }}
            >
              <h2>
                👨‍⚕️{" "}
                <strong>
                  {doctor.doctorName}
                </strong>
              </h2>

              <p
                style={{
                  fontSize: "20px"
                }}
              >
                <strong>
                  Department:
                </strong>{" "}
                {
                  doctor.specialization
                }
              </p>

              <p
                style={{
                  fontSize: "20px"
                }}
              >
                <strong>
                  Room:
                </strong>{" "}
                {
                  doctor.roomNumber
                }
              </p>

              <p
                style={{
                  fontSize: "20px"
                }}
              >
                <strong>
                  Status:
                </strong>{" "}
                {doctor.status}
              </p>
            </div>
          ))
        )}
      </div>

      <br />

      <div
        style={{
          textAlign: "center"
        }}
      >
        <button
          disabled={!selectedDoctor}
          onClick={bookAppointment}
          style={{
            padding: "15px 35px",
            fontSize: "20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          📅 Book Appointment
        </button>
      </div>

      <hr />
{myToken && (
  <div
    style={{
      background: "#d4edda",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "20px",
      textAlign: "center"
    }}
  >
    <h2>
      ✅ Your Request Has Been Approved
    </h2>

    <h3>
      Token Number:
      {" "}
      {myToken.tokenNumber}
    </h3>

    <h3>
      Doctor:
      {" "}
      {myToken.doctorName || myToken.doctorId?.doctorName}
    </h3>

    {notification && (
  <div
    style={{
      background: "#fff3cd",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "20px",
      textAlign: "center",
      border:
        "2px solid orange"
    }}
  >
    <h2>
      {notification}
    </h2>

    <button
      onClick={() =>
        setNotification("")
      }
      style={{
        padding: "10px 20px",
        marginTop: "10px"
      }}
    >
      ❌ Dismiss Notification
    </button>
  </div>
)}

    <button
      onClick={() =>
        navigate("/token-slip", {
          state: {
            tokenNumber: myToken.tokenNumber,
            patientName: myToken.patientName || myToken.patientId?.patientName,
            doctorName: myToken.doctorName || myToken.doctorId?.doctorName,
            priority: myToken.priority,
            phone: myToken.phone || myToken.patientId?.phone,
            age: myToken.age || myToken.patientId?.age
          }
        })
      }
      style={{
        marginRight: "10px",
        padding: "10px 20px"
      }}
    >
      📥 Download Slip
    </button>

    <button
      onClick={() => {
        localStorage.removeItem(
          "latestToken"
        );
        setMyToken(null);
      }}
      style={{
        padding: "10px 20px"
      }}
    >
      ❌ Remove Slip
    </button>
  </div>
)}
      <h2
        style={{
          textAlign: "center"
        }}
      >
        Live Queue
      </h2>

      <div
        style={{
          textAlign: "center"
        }}
      >
        {queue.length === 0 ? (
          <h3>
            No Patients In Queue
          </h3>
        ) : (
          queue.map((token) => (
            <div
              key={token._id}
              style={{
                background: "white",
                margin: "10px auto",
                padding: "15px",
                maxWidth: "500px",
                borderRadius: "10px",
                fontSize: "20px"
              }}
            >
              <strong>
                {token.tokenNumber}
              </strong>{" "}
              - {token.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;