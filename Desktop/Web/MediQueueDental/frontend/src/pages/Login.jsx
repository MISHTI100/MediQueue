import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = async () => {
    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      localStorage.setItem(
        "email",
        res.data.email
      );

      if (
        res.data.role === "Admin"
      ) {
        navigate("/dashboard");
      }

      else if (
        res.data.role === "Doctor"
      ) {
        navigate("/doctor");
      }

      else if (
        res.data.role === "Patient"
      ) {
        navigate("/patient");
      }

      else if (
        res.data.role ===
        "Receptionist"
      ) {
        navigate("/reception");
      }

    } catch (error) {

      console.log(error);

      alert(
        "Invalid Email Or Password"
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
          padding: "40px",
          borderRadius: "20px",
          width: "450px",
          boxShadow:
            "0px 5px 20px rgba(0,0,0,0.1)"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              fontSize: "70px"
            }}
          >
            🏥
          </div>

          <h1
            style={{
              fontSize: "42px",
              margin: "10px 0"
            }}
          >
            MediQueue
          </h1>

          <h2
            style={{
              fontSize: "24px",
              color: "#666",
              margin: 0
            }}
          >
            Login Portal
          </h2>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            borderRadius: "10px",
            border:
              "1px solid #ccc"
          }}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            borderRadius: "10px",
            border:
              "1px solid #ccc"
          }}
        />

        <br />
        <br />

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <br />
        <br />

        <div
          style={{
            textAlign: "center"
          }}
        >
          <Link
            to="/signup"
            style={{
              fontSize: "18px"
            }}
          >
            Create New Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;