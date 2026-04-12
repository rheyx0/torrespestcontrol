// MEMBER 6 - Edit Appointment Form
// Props received from App.js: appointments (array), onUpdate (function)

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clientTypes, pestTypes, statusOptions, technicians } from "../data/mockData";

function EditAppointment({ appointments, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const appointmentToEdit = appointments.find((a) => a.id === parseInt(id));
    if (appointmentToEdit) {
      setForm(appointmentToEdit);
    } else {
      navigate("/appointments");
    }
  }, [id, appointments, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.clientName) newErrors.clientName = "Client Name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.clientType) newErrors.clientType = "Client Type is required";
    if (!form.pestType) newErrors.pestType = "Pest Type is required";
    if (!form.status) newErrors.status = "Status is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.technician) newErrors.technician = "Technician is required";
    if (!form.contactNumber) newErrors.contactNumber = "Contact Number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onUpdate(form);
      navigate("/appointments");
    } else {
      setErrors(validationErrors);
    }
  };

  if (!form) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div className="edit-page">

      {/* PAGE HEADER */}
      <div className="edit-page-header">
        <div>
          <h1 className="page-title">Edit Appointment</h1>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>
            Editing record for <strong>{form.clientName}</strong>
          </p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate("/appointments")}>
          ← Back to List
        </button>
      </div>

      {/* FORM CARD */}
      <div className="edit-form-card">

        {/* CLIENT INFO SECTION */}
        <div className="edit-section">
          <div className="edit-section-title">
            <div className="edit-section-dot" style={{ background: "#3b82f6" }} />
            Client Information
          </div>
          <div className="edit-grid-2">
            <div className="form-group">
              <label className="form-label">Client Name</label>
              <input type="text" name="clientName" value={form.clientName} onChange={handleChange} className={`form-input ${errors.clientName ? "input-error" : ""}`} />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input type="text" name="contactNumber" value={form.contactNumber} onChange={handleChange} className={`form-input ${errors.contactNumber ? "input-error" : ""}`} />
              {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className={`form-input ${errors.address ? "input-error" : ""}`} />
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
              <label className="form-label">Client Type</label>
              <select name="clientType" value={form.clientType} onChange={handleChange} className={`form-input ${errors.clientType ? "input-error" : ""}`}>
                <option value="">Select Type</option>
                {clientTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.clientType && <span className="error-message">{errors.clientType}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Pest Type</label>
              <select name="pestType" value={form.pestType} onChange={handleChange} className={`form-input ${errors.pestType ? "input-error" : ""}`}>
                <option value="">Select Pest</option>
                {pestTypes.map(pest => <option key={pest} value={pest}>{pest}</option>)}
              </select>
              {errors.pestType && <span className="error-message">{errors.pestType}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Technician</label>
              <select name="technician" value={form.technician} onChange={handleChange} className={`form-input ${errors.technician ? "input-error" : ""}`}>
                <option value="">Select Technician</option>
                {technicians.map(tech => <option key={tech} value={tech}>{tech}</option>)}
              </select>
              {errors.technician && <span className="error-message">{errors.technician}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={`form-input ${errors.status ? "input-error" : ""}`}>
                <option value="">Select Status</option>
                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              {errors.status && <span className="error-message">{errors.status}</span>}
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
              <label className="form-label">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className={`form-input ${errors.date ? "input-error" : ""}`} />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} className="form-input" />
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
            <textarea name="notes" value={form.notes} onChange={handleChange} rows="3" className="form-input" placeholder="Add any notes here..." />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="edit-form-footer">
          <button type="button" onClick={handleSubmit} className="btn-submit">Save Changes</button>
          <button type="button" onClick={() => navigate("/appointments")} className="btn-cancel">Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default EditAppointment;