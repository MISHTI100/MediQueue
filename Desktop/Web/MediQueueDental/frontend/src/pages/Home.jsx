import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef6ff",
        padding: "40px"
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px"
        }}
      >
        <h1
          style={{
            fontSize: "35px",
            marginBottom: "10px",
            fontWeight: "bold"
          }}
        >
          🏥 MediQueue Healthcare
        </h1>

        <p
          style={{
            fontSize: "25px",
            color: "#555"
          }}
        >
          Smart Queue & Patient Management System
        </p>
      </div>

      {/* Portal Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap"
        }}
      >
        {/* Doctor */}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >
          <div
            style={{
              width: "380px",
              height: "420px",
              background: "white",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <div
              style={{
                fontSize: "90px",
                marginBottom: "25px"
              }}
            >
              👨‍⚕️
            </div>

            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px"
              }}
            >
              Doctor Portal
            </h2>

            <p
              style={{
                textAlign: "center",
                padding: "0 30px",
                color: "#666",
                fontSize: "22px",
                lineHeight: "1.6"
              }}
            >
              Manage patients,
              queue and
              availability
            </p>
          </div>
        </Link>

        {/* Patient */}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >
          <div
            style={{
              width: "380px",
              height: "420px",
              background: "white",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <div
              style={{
                fontSize: "90px",
                marginBottom: "25px"
              }}
            >
              🧑
            </div>

            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px"
              }}
            >
              Patient Portal
            </h2>

            <p
              style={{
                textAlign: "center",
                padding: "0 30px",
                color: "#666",
                fontSize: "22px",
                lineHeight: "1.6"
              }}
            >
              View doctors,
              queue and
              token status
            </p>
          </div>
        </Link>

        {/* Reception */}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >
          <div
            style={{
              width: "380px",
              height: "420px",
              background: "white",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <div
              style={{
                fontSize: "90px",
                marginBottom: "25px"
              }}
            >
              👩‍💼
            </div>

            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px"
              }}
            >
              Reception Portal
            </h2>

            <p
              style={{
                textAlign: "center",
                padding: "0 30px",
                color: "#666",
                fontSize: "22px",
                lineHeight: "1.6"
              }}
            >
              Register patients
              and generate
              tokens
            </p>
          </div>
        </Link>

        {/* Admin */}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >
          <div
            style={{
              width: "380px",
              height: "420px",
              background: "white",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <div
              style={{
                fontSize: "90px",
                marginBottom: "25px"
              }}
            >
              🛠️
            </div>

            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px"
              }}
            >
              Admin Portal
            </h2>

            <p
              style={{
                textAlign: "center",
                padding: "0 30px",
                color: "#666",
                fontSize: "22px",
                lineHeight: "1.6"
              }}
            >
              Manage doctors,
              departments and
              system
            </p>
          </div>
        </Link>
      </div>

      {/* Features */}
      <div
        style={{
          marginTop: "80px",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            fontSize: "40px"
          }}
        >
          Platform Features
        </h2>

        <p>✅ Multi-Department Clinics</p>
        <p>✅ Doctor Management</p>
        <p>✅ Patient Registration</p>
        <p>✅ Queue Management</p>
        <p>✅ Token Generation</p>
        <p>✅ Doctor Availability</p>
        <p>✅ Emergency Priority Queue</p>
        <p>✅ Live Display Board</p>
      </div>
    </div>
  );
}

export default Home;