'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
         if (!token) {
          router.push('/auth/login');
          return;
        }
        const res = await fetch(`http://localhost:5000/api/jobs/${params.id}`, {
             headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [params.id, router]);

  const handleApply = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ job_id: params.id }),
      });

      if (res.ok) {
        alert('Application submitted successfully!');
        router.push('/candidate/applications');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to apply');
      }
    } catch (error) {
       console.error(error);
       alert('Error submitting application');
    } finally {
        setLoading(false);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.department} - {job.location}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Employment Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{job.employment_type}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Experience Level</dt>
              <dd className="mt-1 text-sm text-gray-900">{job.experience_level}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{job.description}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Requirements</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{job.requirements}</dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
             <button
                onClick={handleApply}
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {loading ? 'Applying...' : 'Apply Now'}
              </button>
        </div>
      </div>
    </div>
  );
}
