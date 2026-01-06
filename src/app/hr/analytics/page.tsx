'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stats {
    total: number;
    averageMatchScore: number;
    stages: { stage: string; count: number }[];
}

export default function HRAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const res = await fetch('http://localhost:5000/api/applications/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [router]);

  if (!stats) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 px-4 sm:px-0">Recruitment Analytics</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.total}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Avg Match Score</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{Math.round(stats.averageMatchScore)}%</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Pipeline</dt>
            <dd className="mt-1 text-3xl font-semibold text-purple-600">
                {stats.stages.filter(s => ['screening', 'interview'].includes(s.stage)).reduce((a, b) => a + b.count, 0)}
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Application Funnel</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {stats.stages.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{stage.stage}</span>
                  <span className="text-sm font-medium text-gray-700">{stage.count} ({Math.round((stage.count / stats.total) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(stage.count / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
