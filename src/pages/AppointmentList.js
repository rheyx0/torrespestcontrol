// MEMBER 3 & 4 - Appointment List + Search / Filter / Sort
// Props received from App.js: appointments (array), onDelete (function)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { statusOptions, clientTypes } from "../data/mockData";

function AppointmentList({ appointments, onDelete }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("All");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getStatusClass = (status) => {
    if (status === "Completed") return "badge badge-completed";
    if (status === "Pending") return "badge badge-pending";
    if (status === "In Progress") return "badge badge-inprogress";
    if (status === "Cancelled") return "badge badge-cancelled";
    return "badge";
  };

  let processedAppointments = appointments?.filter((app) => {
    const serviceName = app.serviceType || app.pestType || "";
    const cleanSearch = search.trim().toLowerCase();
    const matchesSearch =
      app.clientName?.toLowerCase().includes(cleanSearch) ||
      serviceName.toLowerCase().includes(cleanSearch);
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesType = filterType === "All" || app.clientType === filterType;
    const appMonthIndex = new Date(app.date).getMonth();
    const matchesMonth = sortBy === "All" || appMonthIndex.toString() === sortBy;
    return matchesSearch && matchesStatus && matchesType && matchesMonth;
  }) || [];

  processedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="list-page">

      {/* PAGE HEADER */}
      <div className="list-header">
        <div>
          <h1 className="page-title">Appointment Records</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            {processedAppointments.length} record{processedAppointments.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/appointments/create")}>
          + New Appointment
        </button>
      </div>

      {/* CONTROLS */}
      <div className="controls-bar">
        <input
          type="text"
          placeholder="🔍  Search client or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {statusOptions?.map((status, i) => (
            <option key={i} value={status}>{status}</option>
          ))}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All Client Types</option>
          {clientTypes?.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="All">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={index.toString()}>{month}</option>
          ))}
        </select>
      </div>

      {/* TABLE CARD */}
      <div className="dashboard-card">
        {processedAppointments.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Service</th>
                <th>Client Type</th>
                <th>Date & Time</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedAppointments.map((app, index) => {
                const displayDate = new Date(app.date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                });
                return (
                  <tr key={app.id}>
                    <td style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>{index + 1}</td>
                    <td style={{ fontWeight: 700, color: "var(--foreground)" }}>{app.clientName}</td>
                    <td>{app.serviceType || app.pestType}</td>
                    <td>
                      <span style={{
                        background: "var(--muted)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--muted-foreground)"
                      }}>
                        {app.clientType}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{displayDate}</div>
                      {app.time && <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{app.time}</div>}
                    </td>
                    <td style={{ color: "var(--muted-foreground)" }}>{app.technician || "—"}</td>
                    <td><span className={getStatusClass(app.status)}>{app.status}</span></td>
                    <td>
                      <div className="record-actions">
                        <button
                          className="action-btn action-btn-view"
                          onClick={() => navigate(`/appointments/${app.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="action-btn action-btn-edit"
                          onClick={() => navigate(`/appointments/edit/${app.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn action-btn-delete"
                          onClick={() => onDelete(app.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>No appointments found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentList;