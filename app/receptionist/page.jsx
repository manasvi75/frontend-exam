"use client";
import React, { useEffect, useState } from 'react';
import api from '../../src/api';

const ReceptionistDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [clinicInfo, setClinicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  const loadQueue = async () => {
    if (!date) return;
    setLoading(true);
    try {
      const qRes = await api.get(`/queue?date=${date}`);
      setQueue(qRes.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { 
    if (!date) return;
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    setClinicInfo({ name: user.clinicName || 'Clinic' });
    loadQueue(); 
  }, [date]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/queue/${id}`, { status });
      loadQueue();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="flex-row">
          <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{clinicInfo?.name || 'Clinic'} - Reception</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Manage appointments and patient flow</p>
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Logout
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
        <div className="flex-row" style={{ flex: 1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          <div style={{ flex: 1, maxWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '4px' }}>Filter by Date</label>
            <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} style={{ margin: 0, padding: '8px 12px' }} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={loadQueue}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Refresh Queue
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <p>Loading queue...</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '80px' }}>Token</th>
                  <th>Patient Info</th>
                  <th>Schedule</th>
                  <th>Current Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queue.map(q => (
                  <tr key={q.id}>
                    <td>
                      <div style={{ background: 'var(--primary-color)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto' }}>
                        {q.token}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{q.appointment?.patient?.name || 'Patient'}</div>
                    </td>
                    <td>
                      <div className="flex-row" style={{ color: 'var(--text-muted)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {q.appointment?.timeSlot || '-'}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 500,
                        background: q.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : q.status === 'in_progress' ? 'rgba(99, 102, 241, 0.1)' : q.status === 'skipped' ? 'rgba(107, 114, 128, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: q.status === 'done' ? 'var(--success-color)' : q.status === 'in_progress' ? 'var(--primary-color)' : q.status === 'skipped' ? 'var(--text-muted)' : '#d97706',
                        textTransform: 'capitalize' 
                      }}>
                        {q.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                        {q.status === 'waiting' && (
                          <>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => updateStatus(q.id, 'in_progress')}>
                              Start
                            </button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => updateStatus(q.id, 'skipped')}>
                              Skip
                            </button>
                          </>
                        )}
                        {q.status === 'in_progress' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--success-color)' }} onClick={() => updateStatus(q.id, 'done')}>
                            Mark Done
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {queue.length === 0 && (
                  <tr><td colSpan="5" style={{padding: '40px', textAlign: 'center', color: 'var(--text-muted)'}}>No queue available for this date.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
