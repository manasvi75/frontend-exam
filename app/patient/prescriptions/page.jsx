"use client";
import React, { useEffect, useState } from 'react';
import api from '../../../src/api';

const MyPrescriptions = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/prescriptions/my')
      .then(res => setList(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>My Prescriptions</h2>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <p>Loading your prescriptions...</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Visit Details</th>
                  <th>Doctor's Notes</th>
                  <th>Medicines & Dosage</th>
                </tr>
              </thead>
              <tbody>
                {list.map(p => (
                  <tr key={p.id}>
                    <td style={{ verticalAlign: 'top' }}>
                      <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                        <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderRadius: '8px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{p.appointment?.date || '-'}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.appointment?.timeSlot || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                      <p style={{ margin: 0, lineHeight: 1.5, color: 'var(--text-main)' }}>{p.notes || '-'}</p>
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                      {p.medicines && p.medicines.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {p.medicines.map((m, idx) => (
                            <div key={idx} style={{ background: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', fontSize: '13px' }}>
                              <div style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{m.name}</div>
                              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                                {m.dosage && <span style={{ marginRight: '8px' }}>{m.dosage}</span>}
                                {m.duration && <span>&#x2022; {m.duration}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No medicines prescribed</span>
                      )}
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr><td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No prescriptions found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPrescriptions;
