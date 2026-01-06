'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HRDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/auth/login');
      return;
    }
    const userData = JSON.parse(userStr);
    if (userData.role !== 'hr' && userData.role !== 'admin') {
       router.push('/candidate/dashboard');
       return;
    }
    setUser(userData);
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-500">HR Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-slate-300 mr-4">Hello, {user.full_name}</span>
              <button
                onClick={() => {
                  localStorage.clear();
                  router.push('/auth/login');
                }}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Post Job */}
            <div className="bg-slate-900 overflow-hidden shadow rounded-lg border-l-4 border-blue-500 border-slate-800">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-white">Post a Job</h3>
                    <p className="mt-1 text-sm text-slate-400">Create new listing</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/jobs/create" className="text-blue-400 hover:text-blue-300 font-medium">
                    Create Now &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Candidates */}
            <div className="bg-slate-900 overflow-hidden shadow rounded-lg border-l-4 border-green-500 border-slate-800">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-white">Candidates</h3>
                    <p className="mt-1 text-sm text-slate-400">View pipeline</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/candidates" className="text-green-400 hover:text-green-300 font-medium">
                    Manage &rarr;
                  </Link>
                </div>
              </div>
            </div>

             {/* Card 3: Jobs */}
             <div className="bg-slate-900 overflow-hidden shadow rounded-lg border-l-4 border-yellow-500 border-slate-800">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-white">Active Jobs</h3>
                    <p className="mt-1 text-sm text-slate-400">Manage listings</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/jobs" className="text-yellow-400 hover:text-yellow-300 font-medium">
                    View All &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Analytics */}
            <div className="bg-slate-900 overflow-hidden shadow rounded-lg border-l-4 border-purple-500 border-slate-800">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-white">Analytics</h3>
                    <p className="mt-1 text-sm text-slate-400">Hiring metrics</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/analytics" className="text-purple-400 hover:text-purple-300 font-medium">
                    View Report &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
