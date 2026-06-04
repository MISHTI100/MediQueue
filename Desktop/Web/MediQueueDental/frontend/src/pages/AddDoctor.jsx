import { useState, useEffect } from "react";
import API from "../services/api";

function AddDoctor() {

  const [doctor, setDoctor] = useState({
    doctorName: "",
    specialization: "",
    roomNumber: "",
    status: "Available"
  });

  const [doctors, setDoctors] =
    useState([]);

  const loadDoctors = async () => {
    try {

      const token =
        localStorage.getItem("token");

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

      setDoctors(
        res.data.doctors || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const addDoctor = async () => {
    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        "/doctors",
        doctor,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Doctor Added Successfully"
      );

      setDoctor({
        doctorName: "",
        specialization: "",
        roomNumber: "",
        status: "Available"
      });

      loadDoctors();

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Doctor"
      );

    }
  };

  const removeDoctor =
    async (id) => {
      try {

        const token =
          localStorage.getItem("token");

        await API.delete(
          `/doctors/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Doctor Removed"
        );

        loadDoctors();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Remove Doctor"
        );

      }
    };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto"
      }}
    >
      <h1>
        👨‍⚕️ Doctor Management
      </h1>

      <input
        placeholder="Doctor Name"
        value={doctor.doctorName}
        onChange={(e) =>
          setDoctor({
            ...doctor,
            doctorName:
              e.target.value
          })
        }
        style={{
          width: "100%",
          padding: "12px"
        }}
      />

      <br /><br />

      <select
        value={doctor.specialization}
        onChange={(e) =>
          setDoctor({
            ...doctor,
            specialization:
              e.target.value
          })
        }
        style={{
          width: "100%",
          padding: "12px"
        }}
      >
        <option value="">
          Select Department
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

      <br /><br />

      <input
        placeholder="Room Number"
        value={doctor.roomNumber}
        onChange={(e) =>
          setDoctor({
            ...doctor,
            roomNumber:
              e.target.value
          })
        }
        style={{
          width: "100%",
          padding: "12px"
        }}
      />

      <br /><br />

      <button
        onClick={addDoctor}
        style={{
          width: "100%",
          padding: "12px"
        }}
      >
        ➕ Add Doctor
      </button>

      <hr />

      <h2>
        Available Doctors
      </h2>

      {doctors.map(
        (doc) => (
          <div
            key={doc._id}
            style={{
              background:
                "white",
              padding: "15px",
              marginBottom:
                "10px",
              borderRadius:
                "10px"
            }}
          >
            <h3>
              {doc.doctorName}
            </h3>

            <p>
              Department:
              {" "}
              {doc.specialization}
            </p>

            <p>
              Room:
              {" "}
              {doc.roomNumber}
            </p>

            <button
              onClick={() =>
                removeDoctor(
                  doc._id
                )
              }
            >
              🗑 Remove
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default AddDoctor;