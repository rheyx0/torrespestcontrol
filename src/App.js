import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AppointmentList from "./pages/AppointmentList";
import CreateAppointment from "./pages/CreateAppointment";
import EditAppointment from "./pages/EditAppointment";
import AppointmentDetail from "./pages/AppointmentDetail";
import TechnicianTracker from "./pages/TechnicianTracker";
import TechnicianManagement from "./pages/TechnicianManagement"; 
import OverdueAlerts from "./pages/OverdueAlerts";
import ClientHistory from "./pages/ClientHistory";
// FIXED: Removed the stray 'w' at the end of the next line
import { mockAppointments, technicians as initialTechs } from "./data/mockData";

function App() {
  // Initialize state with LocalStorage check
  const [appointments, setAppointments] = useState(() => {
    const savedAppts = localStorage.getItem("appointments");
    return savedAppts ? JSON.parse(savedAppts) : mockAppointments;
  });

  const [technicians, setTechnicians] = useState(() => {
    const savedTechs = localStorage.getItem("technicians");
    return savedTechs ? JSON.parse(savedTechs) : initialTechs;
  });

  // ── Appointment functions ──
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

  // ── Technician functions ──
  const addTechnician = (name) => {
    if (name.trim() && !technicians.includes(name)) {
      const updated = [...technicians, name];
      setTechnicians(updated);
      localStorage.setItem("technicians", JSON.stringify(updated));
    }
  };

  const updateTechnician = (oldName, newName) => {
    const updatedTechs = technicians.map(t => t === oldName ? newName : t);
    setTechnicians(updatedTechs);
    localStorage.setItem("technicians", JSON.stringify(updatedTechs));

    const updatedAppts = appointments.map(a =>
      a.technician === oldName ? { ...a, technician: newName } : a
    );
    setAppointments(updatedAppts);
    localStorage.setItem("appointments", JSON.stringify(updatedAppts));
  };

  const deleteTechnician = (name) => {
    const updated = technicians.filter(t => t !== name);
    setTechnicians(updated);
    localStorage.setItem("technicians", JSON.stringify(updated));
  };

  // ── Follow-up logic ──
  const followUpCount = appointments.filter(a => {
    if (a.status !== "Completed") return false;
    const diff = (new Date() - new Date(a.date)) / (1000 * 60 * 60 * 24);
    return diff >= 5 && diff <= 7;
  }).length;

  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <div className="page-wrapper">
          <Header followUpCount={followUpCount} />
          <Routes>
            <Route path="/" element={<Dashboard appointments={appointments} />} />
            <Route path="/appointments" element={<AppointmentList appointments={appointments} onDelete={deleteAppointment} />} />
            <Route path="/appointments/create" element={<CreateAppointment onAdd={addAppointment} technicians={technicians} />} />
            <Route path="/appointments/edit/:id" element={<EditAppointment appointments={appointments} onUpdate={updateAppointment} technicians={technicians} />} />
            <Route path="/appointments/:id" element={<AppointmentDetail appointments={appointments} />} />
            <Route path="/overdue" element={<OverdueAlerts appointments={appointments} onDelete={deleteAppointment} />} />
            <Route path="/technicians" element={<TechnicianTracker appointments={appointments} technicians={technicians} />} />
            
             <Route path="/technicians/manage" element={
              <TechnicianManagement
                techs={technicians}
                onAdd={addTechnician}
                onUpdate={updateTechnician}
                onDelete={deleteTechnician}
              />
            } /> 

            <Route path="/client-history" element={<ClientHistory appointments={appointments} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
