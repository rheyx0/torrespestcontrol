

// WHAT THIS PAGE SHOULD DO:
// - Find all appointments where:
//     * status is still "Pending" OR "In Progress"
//     * AND the date has already passed (date < today)
// - Display them as alert cards with a warning style
// - Show how many days overdue each appointment is
// - Allow the user to click Edit to update the appointment
// - If no overdue appointments, show a success message


import React from "react";
import { useNavigate } from "react-router-dom";


function OverdueAlerts({ appointments }) {
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

  // Passing the filtered data to the UI layer
  return (
    <div className="list-page">
      <div className="list-header">
        <h1 className="page-title">Overdue Alerts</h1>
      </div>
      
      {/* Simple raw output to verify the logic works */}
      <div style={{ marginTop: "20px", padding: "10px", background: "#f9fafb" }}>
        {overdueAppointments.length === 0 ? (
          <p>No overdue appointments right now.</p>
        ) : (
          <ul>
            {overdueAppointments.map(app => (
              <li key={app.id} style={{ marginBottom: "8px" }}>
                <strong>{app.clientName}</strong> is {app.daysOverdue} days overdue.
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default OverdueAlerts;
