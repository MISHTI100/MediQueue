import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Reception() {

  const navigate = useNavigate();

  const [doctors, setDoctors] =
    useState([]);

  const [requests, setRequests] =
    useState([]);

  const [queue, setQueue] =
    useState([]);

  const [form, setForm] =
    useState({
      patientName: "",
      phone: "",
      age: "",
      priority: "Normal",
      doctorName: ""
    });

  const [selectedRequestId, setSelectedRequestId] = useState(null);

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

  const loadRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res =
        await API.get("/patients/requests", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      setRequests(
        res.data.requests || []
      );

    } catch (error) {

      console.log(error);

    }
  };

  const loadQueue = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/tokens", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueue(res.data.queue || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    loadDoctors();
    loadRequests();
    loadQueue();

  }, []);

  const approveRequest =
    (request) => {

      setSelectedRequestId(request._id);

      setForm({
        patientName:
          request.patientName || "",

        phone:
          request.phone || "",

        age:
          request.age || "",

        priority:
          "Normal",

        doctorName:
          request.doctorName || ""
      });

      alert(`Approved: ${request.patientName}. Details filled below.`);
    };

  const registerPatient =
    async () => {

      try {
        const token = localStorage.getItem("token");

        const res =
          await API.post(
            "/reception/register",
            form,
            { headers: { Authorization: `Bearer ${token}` } }
          );

        const tokenNum = res.data.token?.tokenNumber || res.data.tokenNumber;
localStorage.setItem(
  "latestToken",
  JSON.stringify({
    tokenNumber: tokenNum,
    patientName: form.patientName,
    doctorName: form.doctorName,
    status: "Waiting"
  })
);
        // Remove the original request after successful token generation
        if (selectedRequestId) {
          try {
            await API.delete(`/patients/requests/${selectedRequestId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
          } catch (err) {
            console.log("Cleanup failed", err);
          }
        }

        alert(`Generated Token: ${tokenNum}. Request cleared.`);

        navigate(
          "/token-slip",
          {
            state: {
              tokenNumber: tokenNum,
              patientName: res.data.token?.patientId?.patientName || form.patientName,
              phone: res.data.token?.patientId?.phone || form.phone,
              age: res.data.token?.patientId?.age || form.age,
              doctorName: res.data.token?.doctorId?.doctorName || form.doctorName,
              priority: res.data.token?.priority || form.priority
            }
          }
        );

        setForm({
          patientName: "",
          phone: "",
          age: "",
          priority: "Normal",
          doctorName: ""
        });

        setSelectedRequestId(null);
        loadRequests();
        loadQueue();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Generate Token"
        );

      }
    };

 const deleteRequest = async (id) => {
  try {

    const token =
      localStorage.getItem("token");

    await API.delete(
      `/patients/requests/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      "Request Removed Successfully"
    );

    loadRequests();

  } catch (error) {

    console.log(error);

    alert(
      "Failed To Remove Request"
    );

  }
};

  const removePatient = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/tokens/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(
        "Patient Removed Successfully"
      );

      loadQueue();
    } catch (error) {
      console.log(error);
      alert(
        "Failed To Remove Patient"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f4f8fb"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        👩‍💼 Reception Dashboard
      </h1>

      {/* Requests */}

      <div
        style={{
          background: "#fff8dc",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      >
        <h2>
          🔔 Appointment Requests
        </h2>

        {requests.length === 0 ? (
          <p>
            No Requests
          </p>
        ) : (
          requests.map(
            (request) => (
              <div
                key={
                  request._id
                }
                style={{
                  background:
                    "white",
                  padding:
                    "15px",
                  marginBottom:
                    "10px",
                  borderRadius:
                    "10px"
                }}
              >
                <h3>
                  👤{" "}
                  {
                    request.patientName
                  }
                </h3>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  {
                    request.phone
                  }
                </p>

                <p>
                  <strong>
                    Age:
                  </strong>{" "}
                  {
                    request.age
                  }
                </p>

                <p>
                  <strong>
                    Symptoms:
                  </strong>{" "}
                  {
                    request.symptoms
                  }
                </p>

                <p>
                  <strong>
                    Department:
                  </strong>{" "}
                  {
                    request.department
                  }
                </p>

                <p>
                  <strong>
                    Doctor:
                  </strong>{" "}
                  {
                    request.doctorName
                  }
                </p>

                <button
                  onClick={() =>
                    approveRequest(
                      request
                    )
                  }
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => deleteRequest(request._id)}
                  style={{
                    marginLeft: "10px",
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  🗑 Remove
                </button>
              </div>
            )
          )
        )}
      </div>

      {/* Generate Token */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        <h2>
          🎫 Generate Token
        </h2>
        <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px"
  }}
>
  <h2>
    📋 Queue Management
  </h2>

  {queue.length === 0 ? (
    <p>No Patients In Queue</p>
  ) : (
    queue.map((token) => (
      <div
        key={token._id}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px"
        }}
      >
        <h3>
          {token.tokenNumber} - {token.patientId?.patientName || "Walk-in"}
        </h3>
        <p>
          <strong>Doctor:</strong> {token.doctorId?.doctorName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: token.status === "Done" ? "green" : "orange" }}>
            {token.status}
          </span>
        </p>
        <button
          onClick={() => removePatient(token._id)}
          style={{
            background: "red",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          🗑 Remove Patient
        </button>
      </div>
    ))
  )}
</div>

        <input
          placeholder="Patient Name"
          value={
            form.patientName
          }
          onChange={(e) =>
            setForm({
              ...form,
              patientName:
                e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        />

        <br />
        <br />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        />

        <br />
        <br />

        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age:
                e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        />

        <br />
        <br />

        <select
          value={
            form.doctorName
          }
          onChange={(e) =>
            setForm({
              ...form,
              doctorName:
                e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        >
          <option value="">
            Select Doctor
          </option>

          {doctors.map(
            (doctor) => (
              <option
                key={
                  doctor._id
                }
                value={
                  doctor.doctorName
                }
              >
                {
                  doctor.doctorName
                }{" "}
                -
                {" "}
                {
                  doctor.specialization
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <select
          value={
            form.priority
          }
          onChange={(e) =>
            setForm({
              ...form,
              priority:
                e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        >
          <option value="Normal">
            Normal
          </option>

          <option value="Senior Citizen">
            Senior Citizen
          </option>

          <option value="Emergency">
            Emergency
          </option>
        </select>

        <br />
        <br />

        <button
          onClick={
            registerPatient
          }
          style={{
            width: "100%",
            padding: "12px"
          }}
        >
          🎫 Generate Token
        </button>
      </div>
    </div>
  );
}

export default Reception;