"use client";
import React, { useEffect, useState } from 'react';
import api from '../../src/api';

const CreateUserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', formData);
      alert("User created!");
      setFormData({ name: '', email: '', password: '', role: 'patient' });
      onUserCreated();
    } catch (err) { 
      const errorMessage = err.response?.data?.error || err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
      alert("Error creating user: " + errorMessage); 
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '24px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>Add New User</h3>
      <form onSubmit={handleSubmit} className="dashboard-grid" style={{ alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Name</label>
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Email</label>
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="email@example.com" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Password</label>
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="Password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-main)' }}>Role</label>
          <select className="input-field" style={{ marginBottom: 0, cursor: 'pointer' }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
            <option value="patient">Patient</option>
            <option value="receptionist">Receptionist</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [clinicInfo, setClinicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadAllData = async () => {
    try {
      const [uRes, cRes] = await Promise.all([api.get('/admin/users'), api.get('/admin/clinic')]);
      setUsers(uRes.data);
      setClinicInfo(cRes.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadAllData(); }, []);

  // --- LOGOUT FUNCTION ---
  const handleLogout = () => {
    localStorage.clear(); // Clears token and user data
    window.location.href = '/'; // Redirects to login page
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="flex-row">
          <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{clinicInfo?.name || 'Loading...'} Admin</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Manage clinic users and access</p>
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Logout
        </button>
      </div>
      
      <CreateUserForm onUserCreated={loadAllData} />

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>User Directory</h3>
          <div style={{ position: 'relative', width: '300px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            <input 
              className="input-field"
              placeholder="Search users..." 
              style={{ margin: 0, paddingLeft: '36px', background: 'white' }} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>User Details</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' }}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 500 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 500,
                      background: u.role === 'admin' ? 'rgba(236, 72, 153, 0.1)' : u.role === 'doctor' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: u.role === 'admin' ? 'var(--secondary-color)' : u.role === 'doctor' ? 'var(--primary-color)' : 'var(--success-color)',
                      textTransform: 'capitalize' 
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-color)' }}></span> Active
                    </span>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
