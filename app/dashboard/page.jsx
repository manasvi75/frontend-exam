"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') router.replace('/admin');
    else if (role === 'receptionist') router.replace('/receptionist');
    else if (role === 'doctor') router.replace('/doctor');
    else if (role === 'patient') router.replace('/patient');
    else router.replace('/');
  }, [router]);

  return <div style={{ padding: '40px', textAlign: 'center' }}>Redirecting...</div>;
}
