'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fbLoading, setFbLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Opens a Google OAuth popup. Requires a valid NEXT_PUBLIC_GOOGLE_CLIENT_ID
  // and a redirect route at `/auth/google/callback` that you register in
  // Google's OAuth consent screen. In production exchange the `code` server-side.
  const handleGoogleSignIn = () => {
    if (googleLoading) return;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    if (!clientId) {
      alert('Google Client ID not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local');
      return;
    }

    const scope = 'openid email profile';
    const state = Math.random().toString(36).substring(2);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&state=${state}&prompt=select_account`;

    // Optionally show a loading state — the browser will navigate away immediately.
    setGoogleLoading(true);

    // Redirect the main window to Google's OAuth page (full-page redirect)
    window.location.href = authUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? 'Login successful!' : 'Account created successfully!');
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-lg py-2 mb-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            aria-busy={googleLoading}
            className={`w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 hover:bg-gray-50 ${
              googleLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {googleLoading ? 'Signing in with Google...' : '🔷 Sign with Google'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (fbLoading) return;
              setFbLoading(true);
              // Simulate an async sign-in flow
              setTimeout(() => {
                setFbLoading(false);
                alert('Signed in with Facebook (simulated)');
              }, 1400);
            }}
            disabled={fbLoading}
            aria-busy={fbLoading}
            className={`w-full border-2 border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 mb-6 ${
              fbLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {fbLoading ? 'Signing in with Facebook...' : '📘 Sign with Facebook'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

          {isLogin && (
            <p className="text-center text-gray-600 text-sm mt-4">
              <a href="#" className="text-primary font-bold hover:underline">
                Forgot Password?
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
