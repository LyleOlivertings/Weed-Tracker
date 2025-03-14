'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Wrap the component in Suspense
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-4">
          {error || 'An unknown error occurred'}
        </p>
        <a
          href="/login"
          className="text-green-600 hover:underline"
        >
          Return to Login
        </a>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}

// Add this to prevent static generation
export const dynamic = 'force-dynamic';