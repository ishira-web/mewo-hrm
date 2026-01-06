'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Redirect based on role
      if (userData.role === 'hr' || userData.role === 'admin') {
        router.push('/hr/dashboard');
      } else {
        router.push('/candidate/dashboard');
      }
    } else {
      // Not logged in, go to login
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">AI-Powered HR System</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
