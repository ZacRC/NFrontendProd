"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAndRefreshToken } from '../../utils/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAndRefreshToken();
      if (!isAuthenticated) {
        console.log('Authentication failed, redirecting to login');
        router.push('/login');
      } else {
        const userData = localStorage.getItem('user');
        setUser(JSON.parse(userData));
        console.log('User authenticated, staying on dashboard');
      }
    };

    checkAuth();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {user.username}!</h1>
      {/* Rest of your dashboard content */}
    </div>
  );
}