import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Patient"
  });

  const registerUser = async () => {
    try {

      const res = await API.post(
        "/auth/register",
        form
      );

      alert(
        res.data.message ||
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef6ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          width: "300px"
        }}
      >
        <h1
  style={{
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  🏥 MediQueue Signup
</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          <option value="Patient">
            Patient
          </option>

          <option value="Doctor">
            Doctor
          </option>

          <option value="Receptionist">
            Receptionist
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>

        <br />
        <br />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Sign Up
        </button>

        <br />
        <br />

        <Link to="/login">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;