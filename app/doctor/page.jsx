"use client";
import React, { useEffect, useState } from 'react';
import api from '../../src/api';
import { useRouter } from 'next/navigation';

const DoctorDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [clinicInfo, setClinicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Modals state
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedApptId, setSelectedApptId] = useState(null);

  // Form states
  const [prescriptionForm, setPrescriptionForm] = useState({ medicines: [{name: '', dosage: '', duration: ''}], notes: '' });
  const [reportForm, setReportForm] = useState({ diagnosis: '', tests: '', remarks: '' });

  const loadQueue = async () => {
    setLoading(true);
    try {
      const qRes = await api.get('/doctor/queue');
      setQueue(qRes.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    setClinicInfo({ name: user.clinicName || 'Clinic' });
    loadQueue(); 
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/prescriptions/${selectedApptId}`, prescriptionForm);
      alert("Prescription added!");
      setShowPrescriptionModal(false);
      setPrescriptionForm({ medicines: [{name: '', dosage: '', duration: ''}], notes: '' });
    } catch (err) { alert("Error adding prescription"); console.error(err); }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reports/${selectedApptId}`, reportForm);
      alert("Report added!");
      setShowReportModal(false);
      setReportForm({ diagnosis: '', tests: '', remarks: '' });
    } catch (err) { alert("Error adding report"); console.error(err); }
  };

  const openPrescription = (apptId) => {
    setSelectedApptId(apptId);
    setShowPrescriptionModal(true);
  };

  const openReport = (apptId) => {
    setSelectedApptId(apptId);
    setShowReportModal(true);
  };

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="flex-row">
          <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{clinicInfo?.name || 'Clinic'} - Doctor Panel</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Manage today's patient queue</p>
          </div>
        </div>
        <div className="flex-row">
          <button className="btn btn-primary" onClick={loadQueue}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Refresh Queue
          </button>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.3)' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Current Queue</h3>
        </div>
        
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            <p>Loading patient queue...</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '80px' }}>Token</th>
                  <th>Patient Name</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((q, idx) => (
                  <tr key={q.id || idx}>
                    <td>
                      <div style={{ background: 'var(--primary-color)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto' }}>
                        {q.token}
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{q.patient?.name || q.appointment?.patient?.name || 'Patient'}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 500,
                        background: q.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: q.status === 'completed' ? 'var(--success-color)' : '#d97706',
                        textTransform: 'capitalize' 
                      }}>
                        {q.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => openPrescription(q.appointmentId || q.appointment?.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                          Rx
                        </button>
                        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => openReport(q.appointmentId || q.appointment?.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="m14 2-4 4-4-4"/><path d="M10 18v-4a2 2 0 1 1 4 0v4"/><path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M6 10h12"/></svg>
                          Report
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {queue.length === 0 && (
                  <tr><td colSpan="4" style={{padding: '40px', textAlign: 'center', color: 'var(--text-muted)'}}>No patients in queue today. Take a break!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add Prescription</h3>
            <form onSubmit={handleAddPrescription}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Medicine Name</label>
                <input className="input-field" placeholder="e.g. Paracetamol" value={prescriptionForm.medicines[0].name} onChange={e => setPrescriptionForm({...prescriptionForm, medicines: [{...prescriptionForm.medicines[0], name: e.target.value}]})} required />
              </div>
              <div className="flex-row" style={{ gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Dosage</label>
                  <input className="input-field" placeholder="1 tablet" value={prescriptionForm.medicines[0].dosage} onChange={e => setPrescriptionForm({...prescriptionForm, medicines: [{...prescriptionForm.medicines[0], dosage: e.target.value}]})} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Duration</label>
                  <input className="input-field" placeholder="3 days" value={prescriptionForm.medicines[0].duration} onChange={e => setPrescriptionForm({...prescriptionForm, medicines: [{...prescriptionForm.medicines[0], duration: e.target.value}]})} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>General Notes / Instructions</label>
                <textarea className="input-field" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Take after meals..." value={prescriptionForm.notes} onChange={e => setPrescriptionForm({...prescriptionForm, notes: e.target.value})} required/>
              </div>
              <div className="flex-row" style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowPrescriptionModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Prescription</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add Report</h3>
            <form onSubmit={handleAddReport}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Diagnosis</label>
                <input className="input-field" placeholder="e.g. Viral Fever" value={reportForm.diagnosis} onChange={e => setReportForm({...reportForm, diagnosis: e.target.value})} required/>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Recommended Tests</label>
                <input className="input-field" placeholder="e.g. CBC" value={reportForm.tests} onChange={e => setReportForm({...reportForm, tests: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Additional Remarks</label>
                <textarea className="input-field" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Rest for 3 days" value={reportForm.remarks} onChange={e => setReportForm({...reportForm, remarks: e.target.value})} />
              </div>
              <div className="flex-row" style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
