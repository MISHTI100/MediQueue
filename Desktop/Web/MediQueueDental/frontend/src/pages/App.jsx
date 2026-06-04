import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorPanel from "./pages/DoctorPanel";
import Reception from "./pages/Reception";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";
import QueueBoard from "./pages/QueueBoard";
import DisplayBoard from "./pages/DisplayBoard";
import TokenSlip from "./pages/TokenSlip";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorPanel />} />
        <Route path="/reception" element={<Reception />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/queue" element={<QueueBoard />} />
        <Route path="/display" element={<DisplayBoard />} />
        <Route path="/token-slip" element={<TokenSlip />} />
      </Routes>
    </Router>
  );
}

export default App;