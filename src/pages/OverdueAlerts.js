import React from "react";
import { useNavigate } from "react-router-dom";

function OverdueAlerts({ appointments }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("daysOverdueDesc");
  // --- HERALD'S LOGIC: FILTERING & MATH ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueAppointments = appointments.reduce((acc, app) => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);

    const isUnresolved = app.status === "Pending" || app.status === "In Progress";
    const isPastDue = appDate < today;

    if (isUnresolved && isPastDue) {
      const diffTime = today - appDate;
      const daysOverdue = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      acc.push({ ...app, daysOverdue });
    }
    
    return acc;
  }, []); 
    
  const sortedAppointments = [...overdueAppointments].sort((a, b) => {
    switch (sortBy) {
      case "daysOverdueDesc":
        return b.daysOverdue - a.daysOverdue;
      case "daysOverdueAsc":
        return a.daysOverdue - b.daysOverdue;
      case "clientNameAsc":
        return a.clientName.localeCompare(b.clientName);
      case "clientNameDesc":
        return b.clientName.localeCompare(a.clientName);
      case "dateOldest":
        return new Date(a.date) - new Date(b.date);
      case "dateNewest":
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
      }
      }); 
  // --- CABALLERO'S LOGIC: UI RENDER ---
  return (
    <div className="list-page">
      <div className="list-header">
        <h1 className="page-title">Overdue Alerts</h1>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
          Appointments past their scheduled date
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        {overdueAppointments.length === 0 ? (
          <div className="empty-state">
            <p>🎉 All caught up! No overdue appointments.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {overdueAppointments.map((app) => (
              <div key={app.id} className="overdue-card" style={{ 
                border: "1px solid #fca5a5", backgroundColor: "#fef2f2", 
                padding: "16px", borderRadius: "8px", display: "flex",
                justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <h3 style={{ color: "#dc2626", margin: "0 0 4px 0" }}>⚠️ {app.daysOverdue} days overdue</h3>
                  <p style={{ fontWeight: "bold", margin: 0 }}>{app.clientName}</p>
                  <p style={{ fontSize: "12px", color: "#4b5563", margin: 0 }}>
                    {app.serviceType || app.pestType} | {app.status}
                  </p>
                </div>
                {/* DE LEON'S LOGIC: ROUTING & ACTIONS */}    
                  <div className="record-actions">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OverdueAlerts;
