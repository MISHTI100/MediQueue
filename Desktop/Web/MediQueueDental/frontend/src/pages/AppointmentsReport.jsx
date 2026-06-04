import { useEffect, useState } from "react";
import API from "../services/api";

function AppointmentsReport() {

  const [data, setData] =
    useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const res =
        await API.get(
          "/appointments/history"
        );

      setData(
        res.data.history || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div style={{padding:"30px"}}>

      <h1>
        📊 Appointment History
      </h1>

      {data.map((item) => (

        <div
          key={item._id}
          style={{
            background:"white",
            padding:"15px",
            marginBottom:"10px"
          }}
        >

          <h3>
            {item.tokenNumber}
          </h3>

          <p>
            {item.patientName}
          </p>

          <p>
            {item.doctorName}
          </p>

        </div>

      ))}

    </div>
  );
}

export default AppointmentsReport;