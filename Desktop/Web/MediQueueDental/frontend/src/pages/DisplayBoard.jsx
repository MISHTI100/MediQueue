import { useEffect, useState } from "react";
import API from "../services/api";

function DisplayBoard() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {

    async function fetchQueue() {
      try {
        const res = await API.get("/tokens");
        setQueue(res.data.queue || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQueue();

  }, []);

  const currentPatient =
    queue.find(
      (item) =>
        item.status === "In Consultation"
    );

  return (
    <div>
      <h1>Dental Clinic Display Board</h1>

      <h2>
        Now Serving:
      </h2>

      <h1>
        {currentPatient
          ? currentPatient.tokenNumber
          : "No Patient"}
      </h1>
    </div>
  );
}

export default DisplayBoard;