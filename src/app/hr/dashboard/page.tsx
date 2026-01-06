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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">HR Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Hello, {user.full_name}</span>
              <button
                onClick={() => {
                  localStorage.clear();
                  router.push('/auth/login');
                }}
                className="text-sm text-red-600 hover:text-red-500"
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
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Post a Job</h3>
                    <p className="mt-1 text-sm text-gray-500">Create new listing</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/jobs/create" className="text-blue-600 hover:text-blue-900 font-medium">
                    Create Now &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Candidates */}
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Candidates</h3>
                    <p className="mt-1 text-sm text-gray-500">View pipeline</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/candidates" className="text-green-600 hover:text-green-900 font-medium">
                    Manage &rarr;
                  </Link>
                </div>
              </div>
            </div>

             {/* Card 3: Jobs */}
             <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Active Jobs</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage listings</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/jobs" className="text-yellow-600 hover:text-yellow-900 font-medium">
                    View All &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Analytics */}
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-500">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Analytics</h3>
                    <p className="mt-1 text-sm text-gray-500">Hiring metrics</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/hr/analytics" className="text-purple-600 hover:text-purple-900 font-medium">
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
