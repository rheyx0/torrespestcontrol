import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AppointmentList from "./pages/AppointmentList";
import CreateAppointment from "./pages/CreateAppointment";
import EditAppointment from "./pages/EditAppointment";
import AppointmentDetail from "./pages/AppointmentDetail";
import { mockAppointments } from "./data/mockData";

function App() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const addAppointment = (newAppointment) => {
    const withId = { ...newAppointment, id: Date.now() };
    const updated = [...appointments, withId];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const updateAppointment = (updatedAppointment) => {
    const updated = appointments.map((a) =>
      a.id === updatedAppointment.id ? updatedAppointment : a
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
        <Sidebar />
        <div className="page-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard appointments={appointments} />} />
            <Route path="/appointments" element={<AppointmentList appointments={appointments} onDelete={deleteAppointment} />} />
            <Route path="/appointments/create" element={<CreateAppointment onAdd={addAppointment} />} />
            <Route path="/appointments/edit/:id" element={<EditAppointment appointments={appointments} onUpdate={updateAppointment} />} />
            <Route path="/appointments/:id" element={<AppointmentDetail appointments={appointments} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;