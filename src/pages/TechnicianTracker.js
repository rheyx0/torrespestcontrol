
// WHAT THIS PAGE SHOULD DO:
// - Show a list of all technicians from the appointments data
// - For each technician, show:
//     * How many total appointments they have
//     * How many are Pending
//     * How many are In Progress
//     * How many are Completed
//     * How many are Cancelled
// - Show a progress bar or indicator for their workload
// - Sort technicians by most appointments (busiest first)

import React from "react";

function TechnicianTracker({ appointments }) {

  // Step 1: Get all unique technicians from appointments
  // Hint: use appointments.map() and filter out duplicates

  // Step 2: For each technician, count their appointments by status
  // Hint: use appointments.filter(a => a.technician === techName)

  // Step 3: Return the JSX to display the tracker

  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h1 className="page-title">Technician Tracker</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Workload overview for all technicians
          </p>
        </div>
      </div>

      {/* YOUR CODE GOES HERE */}
      {/* Show a card for each technician with their appointment counts */}

    </div>
  );
}

export default TechnicianTracker;
