// MEMBER 1 & 2 - Dashboard
// Props received from App.js: appointments (array)
import React from "react";

function Dashboard({ appointments }) {
  const total      = appointments.length;
  const pending    = appointments.filter(a => a.status === "Pending").length;
  const completed  = appointments.filter(a => a.status === "Completed").length;
  const inProgress = appointments.filter(a => a.status === "In Progress").length;
  const cancelled  = appointments.filter(a => a.status === "Cancelled").length;

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(a => a.date === today);

  const followUps = appointments.filter(a => {
    if (a.status !== "Completed") return false;
    const diff = (new Date() - new Date(a.date)) / (1000 * 60 * 60 * 24);
    return diff >= 5 && diff <= 7;
  });

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const pestCount = {};
  appointments.forEach(a => {
    const p = a.pestType || a.serviceType || "Other";
    pestCount[p] = (pestCount[p] || 0) + 1;
  });
  const topPests = Object.entries(pestCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const clientTypeCount = {};
  appointments.forEach(a => {
    const t = a.clientType || "Other";
    clientTypeCount[t] = (clientTypeCount[t] || 0) + 1;
  });

  const barColors = ["red", "blue", "green", "amber"];

  const getStatusClass = (status) => {
    if (status === "Completed") return "badge badge-completed";
    if (status === "Pending") return "badge badge-pending";
    if (status === "In Progress") return "badge badge-inprogress";
    if (status === "Cancelled") return "badge badge-cancelled";
    return "badge";
  };

  const dotColors = {
    "Completed": "#22c55e",
    "Pending": "#f59e0b",
    "In Progress": "#3b82f6",
    "Cancelled": "#ef4444",
  };

  return (
    <div style={{ padding: "1.75rem" }}>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>

        <div className="stat-card">
          <div className="stat-card-body">
            <div className="stat-card-label">Total Appointments</div>
            <div className="stat-card-value">{total}</div>
            <div className="stat-card-sub">All records in system</div>
          </div>
          <div className="stat-card-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-body">
            <div className="stat-card-label">Pending</div>
            <div className="stat-card-value">{pending}</div>
            <div className="stat-card-sub">Awaiting service</div>
          </div>
          <div className="stat-card-icon amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-body">
            <div className="stat-card-label">Completed</div>
            <div className="stat-card-value">{completed}</div>
            <div className="stat-card-sub">Successfully done</div>
          </div>
          <div className="stat-card-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>

        <div className="stat-card accent">
          <div className="stat-card-body">
            <div className="stat-card-label">Follow-ups Due</div>
            <div className="stat-card-value">{followUps.length}</div>
            <div className="stat-card-sub">Need attention</div>
          </div>
          <div className="stat-card-icon" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: "16px", marginBottom: "16px" }}>

        {/* Recent Appointments Table */}
        <div className="dashboard-card" style={{ gridColumn: "1 / 3" }}>
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Recent Appointments</span>
            <a href="/appointments" className="see-all-btn">See all →</a>
          </div>
          <div className="dashboard-card-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length > 0 ? recentAppointments.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600 }}>{a.clientName}</td>
                    <td>{a.pestType || a.serviceType}</td>
                    <td>{a.clientType}</td>
                    <td>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" style={{ textAlign: "center", color: "#8b92a5", padding: "2rem" }}>No appointments found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-up Alerts */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Follow-up Alerts</span>
          </div>
          <div className="dashboard-card-body">
            {followUps.length === 0 ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "#8b92a5", fontSize: "13px" }}>
                No follow-ups needed
              </div>
            ) : (
              followUps.map(a => (
                <div key={a.id} className="alert-item">
                  <div className="alert-avatar">{a.clientName?.charAt(0)}</div>
                  <div className="alert-info">
                    <div className="alert-name">{a.clientName}</div>
                    <div className="alert-sub">{a.pestType} — Follow-up due</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>

        {/* Service Analytics */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Service Analytics</span>
          </div>
          <div className="analytics-bar-list">
            <div className="analytics-bar-item">
              <div className="analytics-bar-meta">
                <span className="analytics-bar-label">Completed</span>
                <span className="analytics-bar-pct">{total > 0 ? Math.round((completed/total)*100) : 0}%</span>
              </div>
              <div className="analytics-bar-track">
                <div className="analytics-bar-fill green" style={{ width: `${total > 0 ? (completed/total)*100 : 0}%` }} />
              </div>
            </div>
            <div className="analytics-bar-item">
              <div className="analytics-bar-meta">
                <span className="analytics-bar-label">Pending</span>
                <span className="analytics-bar-pct">{total > 0 ? Math.round((pending/total)*100) : 0}%</span>
              </div>
              <div className="analytics-bar-track">
                <div className="analytics-bar-fill amber" style={{ width: `${total > 0 ? (pending/total)*100 : 0}%` }} />
              </div>
            </div>
            <div className="analytics-bar-item">
              <div className="analytics-bar-meta">
                <span className="analytics-bar-label">In Progress</span>
                <span className="analytics-bar-pct">{total > 0 ? Math.round((inProgress/total)*100) : 0}%</span>
              </div>
              <div className="analytics-bar-track">
                <div className="analytics-bar-fill blue" style={{ width: `${total > 0 ? (inProgress/total)*100 : 0}%` }} />
              </div>
            </div>
            <div className="analytics-bar-item">
              <div className="analytics-bar-meta">
                <span className="analytics-bar-label">Cancelled</span>
                <span className="analytics-bar-pct">{total > 0 ? Math.round((cancelled/total)*100) : 0}%</span>
              </div>
              <div className="analytics-bar-track">
                <div className="analytics-bar-fill red" style={{ width: `${total > 0 ? (cancelled/total)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Pest Types */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Top Pest Types</span>
          </div>
          <div className="analytics-bar-list">
            {topPests.length > 0 ? topPests.map(([pest, count], i) => (
              <div key={pest} className="analytics-bar-item">
                <div className="analytics-bar-meta">
                  <span className="analytics-bar-label">{pest}</span>
                  <span className="analytics-bar-pct">{count} jobs</span>
                </div>
                <div className="analytics-bar-track">
                  <div
                    className={`analytics-bar-fill ${barColors[i]}`}
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            )) : (
              <div style={{ color: "#8b92a5", fontSize: "13px", padding: "0.5rem 0" }}>No data yet</div>
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Today's Schedule</span>
            <span style={{ fontSize: "11px", color: "#8b92a5" }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="dashboard-card-body">
            {todaysAppointments.length === 0 ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "#8b92a5", fontSize: "13px" }}>
                No appointments today
              </div>
            ) : (
              todaysAppointments.map(a => (
                <div key={a.id} className="schedule-item">
                  <div className="schedule-dot" style={{ background: dotColors[a.status] || "#8b92a5" }} />
                  <div style={{ flex: 1 }}>
                    <div className="schedule-name">{a.clientName}</div>
                    <div className="schedule-service">{a.pestType || a.serviceType}</div>
                  </div>
                  <div className="schedule-time">{a.time}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;