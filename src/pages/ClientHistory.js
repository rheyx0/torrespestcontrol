
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

  // Step 3: Calculate summary stats for the matched client
  // - Total appointments
  // - Most recent appointment date
  // - Most common pest/service type

  // Step 4: Return JSX with search input and results

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

      {/* YOUR CODE GOES HERE */}
      {/* Show matched appointments below the search bar */}
      {/* Include a summary card at the top showing total visits, last visit, etc. */}

    </div>
  );
}

export default ClientHistory;
