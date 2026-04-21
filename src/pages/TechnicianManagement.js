// TECHNICIAN MANAGEMENT
// Props received from App.js: techs (array), onAdd (function), onDelete (function), onUpdate (function)

import React, { useState } from "react";

function TechnicianManagement({ techs, onAdd, onDelete, onUpdate }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Technician name is required.");
      return;
    }
    const isDuplicate = techs.some(
      (t) => t.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError("A technician with this name already exists.");
      return;
    }
    onAdd(name.trim());
    setName("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleEditStart = (tech) => {
    setEditingId(tech);
    setEditName(tech);
  };

  const handleEditSave = (oldName) => {
    if (!editName.trim()) return;
    if (onUpdate) onUpdate(oldName, editName.trim());
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="list-page">

      {/* PAGE HEADER */}
      <div className="list-header">
        <div>
          <h1 className="page-title">Manage Technicians</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            {techs?.length || 0} technician{(techs?.length || 0) !== 1 ? "s" : ""} registered
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "20px", alignItems: "start" }}>

        {/* ADD TECHNICIAN FORM */}
        <div className="dashboard-card" style={{ padding: "1.5rem" }}>
          <div className="dashboard-card-header" style={{ marginBottom: "1.25rem", padding: 0, border: "none" }}>
            <span className="dashboard-card-title">Add New Technician</span>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter full name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button
            className="btn-submit"
            onClick={handleAdd}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            + Add Technician
          </button>

          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: "10px", textAlign: "center" }}>
            Press Enter or click Add to save
          </p>
        </div>

        {/* TECHNICIAN LIST */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">All Technicians</span>
          </div>
          <div className="dashboard-card-body">
            {techs && techs.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {techs.map((tech, index) => (
                    <tr key={tech}>
                      <td style={{ color: "var(--muted-foreground)", fontWeight: 600, width: "40px" }}>
                        {index + 1}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {editingId === tech ? (
                          <input
                            className="form-input"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleEditSave(tech)}
                            style={{ padding: "6px 10px", fontSize: "13px" }}
                            autoFocus
                          />
                        ) : (
                          tech
                        )}
                      </td>
                      <td>
                        <div className="record-actions" style={{ justifyContent: "flex-end" }}>
                          {editingId === tech ? (
                            <>
                              <button
                                className="action-btn"
                                style={{ background: "#f0fdf4", color: "#15803d" }}
                                onClick={() => handleEditSave(tech)}
                              >
                                Save
                              </button>
                              <button
                                className="action-btn action-btn-delete"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="action-btn action-btn-edit"
                                onClick={() => handleEditStart(tech)}
                              >
                                Edit
                              </button>
                              <button
                                className="action-btn action-btn-delete"
                                onClick={() => onDelete(tech)}
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p style={{ fontWeight: 600, marginBottom: "4px" }}>No technicians yet</p>
                <p>Add a technician using the form on the left</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TechnicianManagement;
