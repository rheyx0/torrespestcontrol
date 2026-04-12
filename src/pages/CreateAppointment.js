// MEMBER 5 - Create Appointment Form
// Props received from App.js: onAdd (function)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientTypes, pestTypes, statusOptions, technicians } from "../data/mockData";

function CreateAppointment({ onAdd }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clientName: "",
    address: "",
    clientType: "",
    pestType: "",
    status: "Pending",
    date: "",
    time: "",
    technician: "",
    contactNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.clientName.trim())    newErrors.clientName    = "Client name is required";
    if (!form.address.trim())       newErrors.address       = "Address is required";
    if (!form.clientType)           newErrors.clientType    = "Client type is required";
    if (!form.pestType)             newErrors.pestType      = "Pest type is required";
    if (!form.date)                 newErrors.date          = "Date is required";
    if (!form.time)                 newErrors.time          = "Time is required";
    if (!form.technician)           newErrors.technician    = "Technician is required";
    if (!form.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,11}/.test(form.contactNumber.replace(/\D/g, ""))) {
      newErrors.contactNumber = "Contact number must be 10-11 digits";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onAdd({ id: Date.now(), ...form });
    navigate("/appointments");
  };

  return (
    <div className="create-page">

      {/* PAGE HEADER */}
      <div className="create-page-header">
        <div>
          <h1 className="page-title">Create New Appointment</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Fill in all required fields marked with *
          </p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate("/appointments")}>
          ← Back to List
        </button>
      </div>

      {/* FORM CARD - FULL WIDTH */}
      <div className="create-form-card">

        {/* CLIENT INFO SECTION */}
        <div className="edit-section">
          <div className="edit-section-title">
            <div className="edit-section-dot" style={{ background: "#3b82f6" }} />
            Client Information
          </div>
          <div className="edit-grid-2">
            <div className="form-group">
              <label className="form-label">Client Name *</label>
              <input type="text" name="clientName" value={form.clientName} onChange={handleChange}
                placeholder="Enter client name"
                className={`form-input ${errors.clientName ? "input-error" : ""}`} />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Contact Number *</label>
              <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange}
                placeholder="09123456789"
                className={`form-input ${errors.contactNumber ? "input-error" : ""}`} />
              {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Address *</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              placeholder="Enter client address"
              className={`form-input ${errors.address ? "input-error" : ""}`} />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
        </div>

        <div className="edit-divider" />

        {/* SERVICE INFO SECTION */}
        <div className="edit-section">
          <div className="edit-section-title">
            <div className="edit-section-dot" style={{ background: "#c0392b" }} />
            Service Details
          </div>
          <div className="edit-grid-2">
            <div className="form-group">
              <label className="form-label">Client Type *</label>
              <select name="clientType" value={form.clientType} onChange={handleChange}
                className={`form-input ${errors.clientType ? "input-error" : ""}`}>
                <option value="">-- Select Client Type --</option>
                {clientTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.clientType && <span className="error-message">{errors.clientType}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Pest Type *</label>
              <select name="pestType" value={form.pestType} onChange={handleChange}
                className={`form-input ${errors.pestType ? "input-error" : ""}`}>
                <option value="">-- Select Pest Type --</option>
                {pestTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.pestType && <span className="error-message">{errors.pestType}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Technician *</label>
              <select name="technician" value={form.technician} onChange={handleChange}
                className={`form-input ${errors.technician ? "input-error" : ""}`}>
                <option value="">-- Select Technician --</option>
                {technicians.map(tech => <option key={tech} value={tech}>{tech}</option>)}
              </select>
              {errors.technician && <span className="error-message">{errors.technician}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-input">
                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="edit-divider" />

        {/* SCHEDULE SECTION */}
        <div className="edit-section">
          <div className="edit-section-title">
            <div className="edit-section-dot" style={{ background: "#16a34a" }} />
            Schedule
          </div>
          <div className="edit-grid-2">
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                className={`form-input ${errors.date ? "input-error" : ""}`} />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Time *</label>
              <input type="time" name="time" value={form.time} onChange={handleChange}
                className={`form-input ${errors.time ? "input-error" : ""}`} />
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>
          </div>
        </div>

        <div className="edit-divider" />

        {/* NOTES SECTION */}
        <div className="edit-section">
          <div className="edit-section-title">
            <div className="edit-section-dot" style={{ background: "#8b92a5" }} />
            Additional Notes
          </div>
          <div className="form-group">
            <textarea name="notes" value={form.notes} onChange={handleChange}
              placeholder="Add any additional notes..." rows="4" className="form-input" />
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="edit-form-footer">
          <button type="button" onClick={handleSubmit} className="btn-submit">
            Create Appointment
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/appointments")}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreateAppointment;