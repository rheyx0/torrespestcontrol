import React, { useState, useMemo } from "react";

function TechnicianTracker({ appointments }) {

  const [selectedTech, setSelectedTech] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("most-appointments");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Check if appointment is overdue
  const isOverdue = (appointment) => {
    if (appointment.status !== "Pending") return false;
    const appointmentDate = new Date(appointment.date + " " + (appointment.time || "00:00"));
    return appointmentDate < new Date();
  };

  // Unique technicians
  const technicians = [...new Set(appointments.map(a => a.technician))];

  // Stats per technician with date filtering
  const technicianStats = useMemo(() => {
    return technicians.map(tech => {
      let techAppointments = appointments.filter(a => a.technician === tech);

      // Apply date range filter
      if (startDate) {
        techAppointments = techAppointments.filter(
          a => new Date(a.date) >= new Date(startDate)
        );
      }
      if (endDate) {
        techAppointments = techAppointments.filter(
          a => new Date(a.date) <= new Date(endDate)
        );
      }

      const overdue = techAppointments.filter(a => isOverdue(a)).length;

      return {
        name: tech,
        total: techAppointments.length,
        pending: techAppointments.filter(a => a.status === "Pending").length,
        inProgress: techAppointments.filter(a => a.status === "In Progress").length,
        completed: techAppointments.filter(a => a.status === "Completed").length,
        cancelled: techAppointments.filter(a => a.status === "Cancelled").length,
        overdue: overdue,
      };
    });
  }, [appointments, startDate, endDate]);

  // Filter by search term
  const filteredTechs = technicianStats.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort techs based on sortBy
  const sortedTechs = [...filteredTechs].sort((a, b) => {
    if (sortBy === "most-appointments") return b.total - a.total;
    if (sortBy === "overdue") return b.overdue - a.overdue;
    if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
    return 0;
  });

  // Selected technician appointments with date filtering
  const filteredAppointments = useMemo(() => {
    if (!selectedTech) return [];

    let appointments_list = appointments.filter(a => a.technician === selectedTech);

    // Apply date range filter
    if (startDate) {
      appointments_list = appointments_list.filter(
        a => new Date(a.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      appointments_list = appointments_list.filter(
        a => new Date(a.date) <= new Date(endDate)
      );
    }

    return appointments_list;
  }, [selectedTech, appointments, startDate, endDate]);

  const getStatusClass = (status) => {
    if (status === "Completed") return "badge badge-completed";
    if (status === "Pending") return "badge badge-pending";
    if (status === "In Progress") return "badge badge-inprogress";
    if (status === "Cancelled") return "badge badge-cancelled";
    return "badge";
  };

  return (
    <div className="list-page">

      {/* HEADER */}
      <div className="list-header">
        <div>
          <h1 className="page-title">Technician Tracker</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Workload overview for all technicians
          </p>
        </div>
      </div>

      {/* FILTERS & CONTROLS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "var(--background)",
        borderRadius: "8px",
        border: "1px solid var(--border)"
      }}>
        {/* Search by Technician Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>
            Search Technician
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
          />
        </div>

        {/* Start Date */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
          />
        </div>

        {/* End Date */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
          />
        </div>

        {/* Sort */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
          >
            <option value="most-appointments">Most Appointments</option>
            <option value="overdue">Most Overdue</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            onClick={() => {
              setSearchTerm("");
              setStartDate("");
              setEndDate("");
              setSortBy("most-appointments");
              setSelectedTech(null);
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#64748b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              height: "38px",
              width: "100%"
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* TECHNICIAN CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        
        {sortedTechs.length > 0 ? (
          sortedTechs.map((tech, index) => {
            const hasOverdue = tech.overdue > 0;
            const isSelected = selectedTech === tech.name;
            const cardBorderColor = isSelected
              ? (hasOverdue ? "3px solid #e03131" : "2px solid var(--primary)")
              : (hasOverdue ? "2px solid #ff6b6b" : "1px solid var(--border)");
            const cardBackground = isSelected
              ? (hasOverdue ? "rgba(255, 107, 107, 0.14)" : "rgba(59, 130, 246, 0.08)")
              : (hasOverdue ? "rgba(255, 107, 107, 0.05)" : "var(--card)");
            const cardShadow = isSelected
              ? (hasOverdue ? "0 0 0 3px rgba(224, 49, 49, 0.2)" : "0 0 0 3px rgba(59, 130, 246, 0.2)")
              : "none";

            return (
              <div
                key={index}
                className="dashboard-card"
                style={{
                  padding: "1.25rem",
                  cursor: "pointer",
                  border: cardBorderColor,
                  backgroundColor: cardBackground,
                  boxShadow: cardShadow,
                  transition: "all 0.15s ease"
                }}
                onClick={() =>
                  setSelectedTech(selectedTech === tech.name ? null : tech.name)
                }
              >
                
                {/* NAME */}
                <div style={{ fontWeight: 700, fontSize: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {tech.name}
                  {hasOverdue && <span style={{ color: "#ff6b6b", fontSize: "12px", fontWeight: 600 }}>⚠️ Overdue</span>}
                </div>

                {/* TOTAL - WITH PLURALIZATION */}
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "6px" }}>
                  {tech.total} {tech.total === 1 ? "appointment" : "appointments"}
                </div>

                {/* STATUS */}
                <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--muted-foreground)" }}>
                  <div>🟡 Pending: {tech.pending}</div>
                  <div>🔵 In Progress: {tech.inProgress}</div>
                  <div>🟢 Completed: {tech.completed}</div>
                  <div>🔴 Cancelled: {tech.cancelled}</div>
                  {tech.overdue > 0 && <div style={{ color: "#ff6b6b", fontWeight: 600, marginTop: "6px" }}>⏰ Overdue: {tech.overdue}</div>}
                </div>

              </div>
            );
          })
        ) : (
          <div style={{
            gridColumn: "1 / -1",
            padding: "40px",
            textAlign: "center",
            color: "var(--muted-foreground)"
          }}>
            <p style={{ fontSize: "16px", fontWeight: 500 }}>No technicians found</p>
            <p style={{ fontSize: "13px", marginTop: "8px" }}>Try adjusting your search filters</p>
          </div>
        )}

      </div>

      {/* APPOINTMENT TABLE */}
      {selectedTech && (
        <div className="dashboard-card" style={{ marginTop: "20px" }}>
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">
              Appointments for {selectedTech}
            </span>
          </div>

          <div className="dashboard-card-body">
            {filteredAppointments.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(a => {
                    const isOverdueAppt = isOverdue(a);
                    const rowStyle = isOverdueAppt ? {
                      backgroundColor: "rgba(255, 107, 107, 0.1)",
                      borderLeft: "3px solid #ff6b6b"
                    } : {};

                    return (
                      <tr key={a.id} style={rowStyle}>
                        <td>{a.clientName}</td>
                        <td>{a.pestType || a.serviceType}</td>
                        <td>
                          {new Date(a.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td>{a.time || "—"}</td>
                        <td>
                          <span className={getStatusClass(a.status)} style={{
                            backgroundColor: isOverdueAppt && a.status === "Pending" ? "#ff6b6b" : undefined,
                            color: isOverdueAppt && a.status === "Pending" ? "#fff" : undefined
                          }}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-state" style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--muted-foreground)"
              }}>
                <p style={{ fontSize: "15px", fontWeight: 500 }}>No appointments found</p>
                <p style={{ fontSize: "13px", marginTop: "8px" }}>for the selected date range</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default TechnicianTracker;
