'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing Google sign-in...');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error) {
      setStatus('error');
      setMessage(`Google sign-in error: ${error}`);
      return;
    }

    if (!code) {
      setStatus('error');
      setMessage('No authorization code received from Google.');
      return;
    }

    // Exchange the code for tokens via your backend API
    const exchangeCode = async () => {
      try {
        const response = await fetch('/api/auth/google/exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, state }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setMessage(data.error || 'Failed to exchange authorization code.');
          return;
        }

        setStatus('success');
        setMessage('Sign-in successful! Redirecting...');

        // Store tokens (the API response should include user info or tokens)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }

        // Redirect to dashboard or home after a brief delay
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setMessage('Failed to exchange code: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    exchangeCode();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Google Sign-In</h1>

        {status === 'loading' && (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <p className="text-red-600 font-semibold">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-6 btn-primary text-lg py-2 px-4"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
