import { Link } from "react-router-dom";

function Dashboard() {
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
          fontSize: "35px",
          marginBottom: "30px"
        }}
      >
        🏥 MediQueue Healthcare
        <br />
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}
      >
        <Link to="/add-doctor">
          <button
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ➕ Add Doctor
          </button>
        </Link>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >
        <h2
          style={{
            textAlign: "center"
          }}
        >
          System Features
        </h2>

        <p>✅ Doctor Management</p>
        <p>✅ Reception Management</p>
        <p>✅ Patient Registration</p>
        <p>✅ Token Generation</p>
        <p>✅ Queue Management</p>
        <p>✅ Emergency Priority Queue</p>
        <p>✅ Doctor Availability</p>
        <p>✅ Display Board</p>
        <p>✅ Token Slip Printing</p>
      </div>
    </div>
  );
}

export default Dashboard;