"use client";
import React, { useEffect, useState } from 'react';
import api from '../../../src/api';
import { useRouter } from 'next/navigation';

const MyAppointments = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get('/appointments/my')
      .then(res => setList(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>My Appointments</h2>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <p>Loading your appointments...</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Schedule</th>
                  <th style={{ textAlign: 'center' }}>Token</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div className="flex-row">
                        <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', borderRadius: '8px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{a.date}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{a.timeSlot}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', background: '#f3f4f6', borderRadius: '16px', fontWeight: 'bold' }}>
                        {a.token || '-'}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 500,
                        background: a.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : a.status === 'in_progress' ? 'rgba(99, 102, 241, 0.1)' : a.status === 'skipped' ? 'rgba(107, 114, 128, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: a.status === 'done' ? 'var(--success-color)' : a.status === 'in_progress' ? 'var(--primary-color)' : a.status === 'skipped' ? 'var(--text-muted)' : '#d97706',
                        textTransform: 'capitalize' 
                      }}>
                        {a.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                        {(a.status === 'done' || a.status === 'in_progress') && (
                          <>
                            <button className="btn btn-outline" onClick={() => router.push(`/patient/prescriptions/${a.id}`)} style={{ padding: '6px 12px', fontSize: '12px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                              Rx
                            </button>
                            <button className="btn btn-outline" onClick={() => router.push(`/patient/reports/${a.id}`)} style={{ padding: '6px 12px', fontSize: '12px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="m14 2-4 4-4-4"/><path d="M10 18v-4a2 2 0 1 1 4 0v4"/><path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M6 10h12"/></svg>
                              Report
                            </button>
                          </>
                        )}
                        {a.status === 'waiting' && <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>Please wait...</span>}
                      </div>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No appointments booked yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppointments;
