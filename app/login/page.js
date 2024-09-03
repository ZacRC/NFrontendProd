'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageVisit } from '../../utils/trackPageVisit';

export default function Login() {
  useEffect(() => {
    trackPageVisit('login');
  }, []);

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://creatorgiveaways.world/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://creatorgiveaways.world/api/request-password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (res.ok) {
        alert('Password reset email sent. Please check your inbox.');
        setShowResetForm(false);
      } else {
        const errorData = await res.json();
        alert('Password reset request failed: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Password reset error: ' + error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Login Page</h1>
      {!showResetForm ? (
        <>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
              autocomplete="username"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
              autocomplete="current-password"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
          <button
            onClick={() => setShowResetForm(true)}
            className="mt-4 text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Reset Password
          </button>
          <button
            onClick={() => setShowResetForm(false)}
            className="w-full p-2 bg-gray-300 text-gray-700 rounded"
          >
            Back to Login
          </button>
        </form>
      )}
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        Back to Home
      </button>
    </main>
  );
}