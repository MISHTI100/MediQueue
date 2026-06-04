import { useEffect, useState } from "react";
import API from "../services/api";

function QueueBoard() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const res = await API.get("/tokens");
        setQueue(res.data.queue || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadQueue();
  }, []);

  return (
    <div>
      <h1>Live Queue</h1>

      {queue.map((token) => (
        <div key={token._id}>
          {token.tokenNumber} - {token.status}
        </div>
      ))}
    </div>
  );
}

export default QueueBoard;