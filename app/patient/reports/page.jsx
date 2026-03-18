"use client";
import React, { useEffect, useState } from 'react';
import api from '../../../src/api';

const MyReports = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports/my')
      .then(res => setList(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>Lab Reports</h2>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <p>Loading your reports...</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Visit Details</th>
                  <th>Diagnosis</th>
                  <th>Tests Advised</th>
                  <th>Physician Remarks</th>
                </tr>
              </thead>
              <tbody>
                {list.map(r => (
                  <tr key={r.id}>
                    <td style={{ verticalAlign: 'top' }}>
                      <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                        <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.1)', color: '#0284c7', borderRadius: '8px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 2-4 4-4-4"/><path d="M10 18v-4a2 2 0 1 1 4 0v4"/><path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M6 10h12"/></svg>
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{r.appointment?.date || '-'}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{r.appointment?.timeSlot || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', fontWeight: 500, color: 'var(--text-main)' }}>{r.diagnosis || '-'}</td>
                    <td style={{ verticalAlign: 'top' }}>
                      <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f3f4f6', borderRadius: '4px', fontSize: '13px' }}>
                        {r.tests || '-'}
                      </span>
                    </td>
                    <td style={{ verticalAlign: 'top', color: 'var(--text-muted)', lineHeight: 1.5 }}>{r.remarks || '-'}</td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No reports found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyReports;
