"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function PatientDashboard() {
  const router = useRouter();
  
  return (
    <>
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)' }}>
        <h2 style={{ margin: 0 }}>Overview</h2>
      </div>
      <div className="glass-card" style={{ padding: '30px' }}>
        <h4 style={{ marginTop: 0, fontSize: '20px', marginBottom: '12px' }}>Welcome to your Digital Health Hub</h4>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
          Access your medical records, check past prescriptions, view your lab reports, and seamlessly book your next appointment from this centralized, secure dashboard.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary" onClick={() => router.push('/patient/book')} style={{ padding: '12px 20px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M16 2v4"/><path d="M8 2v4"/><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M12 14v4"/><path d="M10 16h4"/></svg>
            Book New Appointment
          </button>
          <button className="btn btn-outline" onClick={() => router.push('/patient/appointments')} style={{ padding: '12px 20px', background: 'white' }}>
            View Past Sessions
          </button>
        </div>
      </div>
    </>
  );
}
