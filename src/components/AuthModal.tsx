'use client';

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface Props {
  open: boolean;
  onClose: () => void;
  onGoogleSuccess: (res: any) => void;
  onGoogleError: () => void;
}

export default function AuthModal({ open, onClose, onGoogleSuccess, onGoogleError }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="text-sm font-semibold text-orange-500">LOGIN NOW</div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">Sign in to unlock a world of rewards - accumulate Rayna Tours Loyalty points or snag exclusive discounts on your booked travel experiences!</p>

          <div className="space-y-3">
            <div>
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleError}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>

            <div>
              <button
                onClick={() => {
                  // Facebook OAuth not implemented here; placeholder
                  // In production, replace with proper Facebook OAuth flow
                  window.alert('Facebook sign-in not configured.');
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg text-sm bg-white hover:bg-gray-50"
              >
                <span className="text-blue-600 text-lg">f</span>
                <span>Sign In with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
