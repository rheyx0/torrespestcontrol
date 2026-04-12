// MEMBER 7 - Appointment Detail View
// Props received from App.js: appointments (array)

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function AppointmentDetail({ appointments }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointment = appointments.find((appt) => String(appt.id) === id);

  const getStatusClass = (status) => {
    if (status === "Completed") return "badge badge-completed";
    if (status === "Pending") return "badge badge-pending";
    if (status === "In Progress") return "badge badge-inprogress";
    if (status === "Cancelled") return "badge badge-cancelled";
    return "badge";
  };

  if (!appointment) {
    return (
      <div style={{ padding: "1.75rem" }}>
        <div className="detail-not-found">
          <h2>Appointment Not Found</h2>
          <p>The appointment you're looking for does not exist.</p>
          <button className="btn-submit" onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const displayDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="detail-page">

      {/* PAGE HEADER */}
      <div className="detail-page-header">
        <div>
          <h1 className="page-title">Appointment Details</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Record ID: #{appointment.id}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-outline" onClick={() => navigate(`/appointments/edit/${appointment.id}`)}>
            ✏️ Edit
          </button>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>

      {/* DETAIL CARD */}
      <div className="detail-card">

        {/* RED HEADER */}
        <div className="detail-card-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 className="detail-client-name">{appointment.clientName}</h2>
              <p className="detail-client-sub">{appointment.serviceType || appointment.pestType} · {appointment.clientType}</p>
            </div>
            <span className={getStatusClass(appointment.status)}>{appointment.status}</span>
          </div>
        </div>

        {/* DETAIL BODY */}
        <div className="detail-card-body">

          {/* CLIENT INFO */}
          <div className="detail-section">
            <div className="detail-section-label">
              <div className="detail-section-dot" style={{ background: "#3b82f6" }} />
              Client Information
            </div>
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span className="detail-info-label">Client Name</span>
                <span className="detail-info-value">{appointment.clientName}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Contact Number</span>
                <span className="detail-info-value">{appointment.contactNumber || "—"}</span>
              </div>
              <div className="detail-info-item" style={{ gridColumn: "1 / -1" }}>
                <span className="detail-info-label">Address</span>
                <span className="detail-info-value">{appointment.address || "—"}</span>
              </div>
            </div>
          </div>

          <div className="detail-divider" />

          {/* SERVICE INFO */}
          <div className="detail-section">
            <div className="detail-section-label">
              <div className="detail-section-dot" style={{ background: "#c0392b" }} />
              Service Details
            </div>
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span className="detail-info-label">Pest / Service Type</span>
                <span className="detail-info-value">{appointment.serviceType || appointment.pestType || "—"}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Client Type</span>
                <span className="detail-info-value">{appointment.clientType || "—"}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Assigned Technician</span>
                <span className="detail-info-value">{appointment.technician || "—"}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Status</span>
                <span className={getStatusClass(appointment.status)}>{appointment.status}</span>
              </div>
            </div>
          </div>

          <div className="detail-divider" />

          {/* SCHEDULE */}
          <div className="detail-section">
            <div className="detail-section-label">
              <div className="detail-section-dot" style={{ background: "#16a34a" }} />
              Schedule
            </div>
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span className="detail-info-label">Date</span>
                <span className="detail-info-value">{displayDate}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Time</span>
                <span className="detail-info-value">{appointment.time || "—"}</span>
              </div>
            </div>
          </div>

          {appointment.notes && (
            <>
              <div className="detail-divider" />
              <div className="detail-section">
                <div className="detail-section-label">
                  <div className="detail-section-dot" style={{ background: "#8b92a5" }} />
                  Notes
                </div>
                <p style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: "1.7", background: "var(--muted)", padding: "1rem", borderRadius: "8px" }}>
                  {appointment.notes}
                </p>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="detail-card-footer">
          <button className="btn-submit" onClick={() => navigate(`/appointments/edit/${appointment.id}`)}>
            Edit Appointment
          </button>
          <button className="btn-cancel" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail;