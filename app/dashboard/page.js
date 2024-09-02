'use client';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    const res = await fetch('https://creatorgiveaways.world/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      router.push('/');
    } else {
      alert('Logout failed');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard!</p>
      <button
        onClick={handleLogout}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </main>
  );
}