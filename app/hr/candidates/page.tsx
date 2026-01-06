'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HRCandidatesList() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const router = useRouter();

  // For MVP, if we don't have a direct "list all candidates" endpoint easily securable
  // without fetching massive data, we might display "Select a Job to view Candidates".
  // Assuming we implement a general fetch or use the one from candidate_pipelines if needed.
  // Let's assume we want to guide them to Jobs for context.
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 px-4 sm:px-0">Candidate Pipeline</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <p className="text-gray-500">
          Please go to <a href="/hr/jobs" className="text-blue-600 hover:text-blue-900">Active Jobs</a> to view candidates for a specific position.
        </p>
      </div>
    </div>
  );
}
