"use client";
import React, { useEffect, useState } from 'react';
import api from '../../../../src/api';
import { useParams, useRouter } from 'next/navigation';

export default function ReportDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/appointments/${id}`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching detail:", err);
        alert("Could not load details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const record = data?.report;

  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>Medical Report</h2>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-outline" onClick={() => router.push('/patient/appointments')} style={{ padding: '8px 16px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="m15 18-6-6 6-6"/></svg>
          Back to Appointments
        </button>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <p>Loading document details...</p>
        </div>
      ) : !data ? (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--danger-color)' }}>
          <p>Appointment record not found.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '30px' }}>
          <div className="flex-row" style={{ marginBottom: '24px' }}>
            <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', borderRadius: '12px', marginRight: '16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 2-4 4-4-4"/><path d="M10 18v-4a2 2 0 1 1 4 0v4"/><path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M6 10h12"/></svg>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '18px' }}>Consultation Info</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Date: {data.date} at {data.timeSlot} | Token: <strong>{data.queue?.token || '-'}</strong></p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '24px 0' }} />

          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Report Analysis</h4>
          
          {!record ? (
            <div style={{ padding: '20px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '8px', border: '1px dashed rgba(245, 158, 11, 0.3)' }}>
              The doctor has not uploaded a report yet for this consultation.
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Primary Diagnosis</span>
                  <strong style={{ fontSize: '16px', color: 'var(--primary-color)' }}>{record.diagnosis}</strong>
                </div>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Recommended Tests</span>
                  <span style={{ display: 'inline-block', background: 'white', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--card-border)', fontSize: '14px' }}>{record.tests || 'None'}</span>
                </div>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Additional Remarks</span>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>{record.remarks || 'No additional remarks.'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
