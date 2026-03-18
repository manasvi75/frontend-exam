"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function PatientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData') || '{}'));
  }, []);

  const handleLogout = () => { 
    localStorage.clear(); 
    router.push('/'); 
  };

  return (
    <div className="page-container">
      <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', minHeight: '80vh', overflow: 'hidden' }}>
        
        {/* Top Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--card-border)', background: 'white' }}>
          <div className="flex-row">
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>{user.clinicName || 'Clinic CMS'}</h2>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Patient Portal</p>
            </div>
          </div>
          <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 16px' }}>
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar Navigation */}
          <div style={{ width: '220px', borderRight: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.4)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/patient" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: pathname === '/patient' ? 'white' : 'transparent', boxShadow: pathname === '/patient' ? 'var(--shadow-sm)' : 'none' }}>
              Dashboard
            </Link>
            <Link href="/patient/book" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: pathname === '/patient/book' ? 'white' : 'transparent', boxShadow: pathname === '/patient/book' ? 'var(--shadow-sm)' : 'none' }}>
              Book Appointment
            </Link>
            <Link href="/patient/appointments" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: pathname === '/patient/appointments' ? 'white' : 'transparent', boxShadow: pathname === '/patient/appointments' ? 'var(--shadow-sm)' : 'none' }}>
              My Appointments
            </Link>
            <Link href="/patient/prescriptions" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: pathname.includes('/patient/prescriptions') ? 'white' : 'transparent', boxShadow: pathname.includes('/patient/prescriptions') ? 'var(--shadow-sm)' : 'none' }}>
              Prescriptions
            </Link>
            <Link href="/patient/reports" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: pathname.includes('/patient/reports') ? 'white' : 'transparent', boxShadow: pathname.includes('/patient/reports') ? 'var(--shadow-sm)' : 'none' }}>
              Lab Reports
            </Link>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, padding: '32px', background: 'rgba(255,255,255,0.1)' }}>
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
