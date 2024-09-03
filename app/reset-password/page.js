'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackPageVisit } from '../../utils/trackPageVisit';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    trackPageVisit('reset-password');
    setToken(searchParams.get('token') || '');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch('https://creatorgiveaways.world/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      if (res.ok) {
        alert('Password reset successful. Please login with your new password.');
        router.push('/login');
      } else {
        const errorData = await res.json();
        alert('Password reset failed: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Password reset error: ' + error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Reset Password</h1>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Reset Password
        </button>
      </form>
      <button
        onClick={() => router.push('/login')}
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        Back to Login
      </button>
    </main>
  );
}