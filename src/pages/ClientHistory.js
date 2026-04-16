
// WHAT THIS PAGE SHOULD DO:
// - Show a search input where you type a client name
// - Display all appointments that match that client name
// - For each appointment show: date, service, technician, status, notes
// - Show a summary: total visits, last visit date, most common service
// - If no results found, show a "No client found" message

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientHistory({ appointments }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Step 1: Filter appointments where clientName matches the search input
  // Hint: appointments.filter(a => a.clientName.toLowerCase().includes(search.toLowerCase()))
  const filteredAppointments = appointments.filter(a =>
    a.clientName.toLowerCase().includes(search.toLowerCase())
  );

  // Step 2: Only show results if search has at least 2 characters
  // Hint: if (search.trim().length < 2) return all or return empty
  const shouldShowResults = search.trim().length >= 2;
  const displayAppointments = shouldShowResults ? filteredAppointments : [];

   // Step 3: Summary stats
  const totalVisits = displayAppointments.length;
 
  const lastVisit = displayAppointments.length > 0
    ? [...displayAppointments].sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
    : null;
 
  const serviceCount = {};
  displayAppointments.forEach(a => {
    const s = a.pestType || a.serviceType || "Other";
    serviceCount[s] = (serviceCount[s] || 0) + 1;
  });
  const mostCommonService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
 
  // Step 4: JSX
  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h1 className="page-title">Client History</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Search appointment history by client name
          </p>
        </div>
      </div>
 
      {/* SEARCH INPUT */}
      <div className="controls-bar" style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="🔍  Type a client name to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
 
      {/* SUMMARY CARD */}
      {shouldShowResults && displayAppointments.length > 0 && (
        <div className="dashboard-card" style={{ marginBottom: "1rem", padding: "1.25rem 1.5rem" }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 700, textTransform: "uppercase" }}>Total Visits</div>
              <div style={{ fontSize: "24px", fontWeight: 800 }}>{totalVisits}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 700, textTransform: "uppercase" }}>Last Visit</div>
              <div style={{ fontSize: "24px", fontWeight: 800 }}>
                {new Date(lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 700, textTransform: "uppercase" }}>Most Common Service</div>
              <div style={{ fontSize: "24px", fontWeight: 800 }}>{mostCommonService}</div>
            </div>
          </div>
        </div>
      )}
 
      {/* RESULTS TABLE */}
      {shouldShowResults && (
        <div className="dashboard-card">
          {displayAppointments.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Technician</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {displayAppointments.map(a => (
                  <tr key={a.id}>
                    <td>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>{a.pestType || a.serviceType}</td>
                    <td>{a.technician || "—"}</td>
                    <td>
                      <span className={`badge badge-${a.status.toLowerCase().replace(" ", "")}`}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--muted-foreground)" }}>{a.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p style={{ fontWeight: 600, marginBottom: "4px" }}>No client found</p>
              <p>Try searching with a different name</p>
            </div>
          )}
        </div>
      )}
 
      {/* PROMPT WHEN SEARCH IS TOO SHORT */}
      {!shouldShowResults && search.length > 0 && (
        <div className="empty-state">
          <p>Keep typing to search...</p>
        </div>
      )}
 
    </div>
  );
}
 
export default ClientHistory;
 





















