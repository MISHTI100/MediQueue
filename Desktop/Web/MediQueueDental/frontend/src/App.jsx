import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenSlip from "./pages/TokenSlip";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";

import Reception from "./pages/Reception";
import DoctorPanel from "./pages/DoctorPanel";
import PatientDashboard from "./pages/PatientDashboard";

import QueueBoard from "./pages/QueueBoard";
import DisplayBoard from "./pages/DisplayBoard";

import AppointmentsReport
from "./pages/AppointmentsReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/token-slip"
  element={<TokenSlip />}
/>

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Admin */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-doctor"
          element={<AddDoctor />}
        />

        {/* Reception */}
        <Route
          path="/reception"
          element={<Reception />}
        />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={<DoctorPanel />}
        />

        {/* Patient */}
        <Route
          path="/patient"
          element={<PatientDashboard />}
        />

        {/* Queue */}
        <Route
          path="/queue"
          element={<QueueBoard />}
        />

        {/* Display Board */}
        <Route
          path="/display"
          element={<DisplayBoard />}
        />

        <Route
  path="/appointments-report"
  element={
    <AppointmentsReport />
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;