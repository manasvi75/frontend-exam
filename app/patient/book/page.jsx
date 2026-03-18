"use client";
import React, { useState } from 'react';
import api from '../../../src/api';

const PatientBook = () => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('10:30-10:45');
  const [loading, setLoading] = useState(false);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date.");

    setLoading(true);
    try {
      await api.post('/appointments', { appointmentDate: date, timeSlot: slot });
      alert("Appointment Booked Successfully!");
      setDate('');
    } catch (err) {
      console.error("Booking Error:", err.response?.data);
      alert("Error booking: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>Book an Appointment</h2>
      </div>
      <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', borderRadius: '50%', marginBottom: '12px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
          </div>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Select an available date and time slot for your next visit.</p>
        </div>

        <form onSubmit={handleBook}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Appointment Date</label>
            <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          
          <div style={{ marginTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Preferred Time Slot</label>
            <select className="input-field" value={slot} onChange={(e) => setSlot(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="10:30-10:45">Morning: 10:30 - 10:45 AM</option>
              <option value="11:00-11:15">Morning: 11:00 - 11:15 AM</option>
              <option value="15:45-16:00">Afternoon: 03:45 - 04:00 PM</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '16px', padding: '12px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? (
              <span className="flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Processing...
              </span>
            ) : (
              'Confirm Appointment'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default PatientBook;
