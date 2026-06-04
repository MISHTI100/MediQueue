import { useLocation, Link } from "react-router-dom";

function TokenSlip() {

  const location = useLocation();

  const data = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          width: "500px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0px 0px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h1
          style={{
            textAlign: "center"
          }}
        >
          🎫 Token Slip
        </h1>

        <hr />

        <h2>
          Token Number:
        </h2>

        <h1
          style={{
            color: "green"
          }}
        >
          {data.tokenNumber}
        </h1>

        <hr />

        <p>
          <strong>
            Patient Name:
          </strong>{" "}
          {data.patientName}
        </p>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {data.phone}
        </p>

        <p>
          <strong>
            Age:
          </strong>{" "}
          {data.age}
        </p>

        <p>
          <strong>
            Doctor:
          </strong>{" "}
          {data.doctorName}
        </p>

        <p>
          <strong>
            Priority:
          </strong>{" "}
          {data.priority}
        </p>

        

        <hr />

        <button
          onClick={() =>
            window.print()
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          🖨️ Print Slip
        </button>

        <Link to="/reception">
  <button
    style={{
      width: "100%",
      padding: "12px"
    }}
  >
    👩‍💼 Back To Reception
  </button>
</Link>
      </div>
    </div>
  );
}

export default TokenSlip;