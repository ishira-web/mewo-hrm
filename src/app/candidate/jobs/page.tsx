'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CandidateJobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const res = await fetch('http://localhost:5000/api/jobs', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          // Filter out drafts if necessary, though backend should ideally handle this
          setJobs(data.filter((j: any) => j.status === 'published'));
        }
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchJobs();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 px-4 sm:px-0">Open Positions</h2>
      <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{job.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{job.department}</p>
                </div>
              </div>
              <div className="mt-4">
                  <p className="text-sm text-gray-500 line-clamp-3">{job.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{job.location}</span>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {job.employment_type}
                  </span>
              </div>
            </div>
             <div className="bg-gray-50 px-5 py-3">
                <Link href={`/candidate/jobs/${job.id}`} className="text-sm font-medium text-blue-700 hover:text-blue-900">
                    View Details &rarr;
                </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
