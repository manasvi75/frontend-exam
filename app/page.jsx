"use client";
import React, { useState } from 'react';
import api from '../src/api';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('enrollment@darshan.ac.in');
  const [password, setPassword] = useState('password123');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // The API returns { token, user: { id, role, clinicId, clinicName ... } }
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userData', JSON.stringify(user));

      alert(`Logged in as ${user.role} for ${user.clinicName}`);
      
      // Redirect based on role instead of going to /dashboard
      if (user.role === 'admin') router.push('/admin');
      else if (user.role === 'receptionist') router.push('/receptionist');
      else if (user.role === 'doctor') router.push('/doctor');
      else router.push('/patient');
    } catch (error) {
      alert("Login failed! Check console for details.");
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ width: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', background: 'var(--primary-color)', color: 'white', marginBottom: '16px', boxShadow: 'var(--shadow-md)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '14px' }}>Sign in to continue to Clinic CMS</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginTop: '4px' }}>
             <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Password</label>
            <input 
              type="password" 
              className="input-field"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
