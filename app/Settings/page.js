'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageVisit } from '../../utils/trackPageVisit';
import { checkAndRefreshToken } from '../../utils/auth';
import {
  ArrowLeftIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
} from "lucide-react";

const Settings = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAndRefreshToken();
      if (!isAuthenticated) {
        console.log('Authentication failed, redirecting to login');
        router.push('/login');
      } else {
        fetchUserInfo();
        if (typeof window !== 'undefined') {
          trackPageVisit('settings');
        }
      }
    };

    checkAuth();
  }, [router]);

  const fetchUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://creatorgiveaways.world/api/user_info/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://creatorgiveaways.world/api/change_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ new_email: newEmail }),
      });
      if (response.ok) {
        alert('Email updated successfully');
        setUserInfo({ ...userInfo, email: newEmail });
        setNewEmail('');
      } else {
        alert('Failed to update email');
      }
    } catch (error) {
      console.error('Error changing email:', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://creatorgiveaways.world/api/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      });
      if (response.ok) {
        alert('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Error loading user information</div>;
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen w-full max-w-full p-6">
      <div className="max-w-3xl mx-auto">
        <button
          className="flex items-center text-gray-300 hover:text-white mb-8"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-8">User Settings</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <UserIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-lg">Username: {userInfo.username}</span>
          </div>
          <div className="flex items-center mb-4">
            <MailIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-lg">Email: {userInfo.email}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-lg">Date Joined: {new Date(userInfo.date_joined).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Email</h2>
          <form onSubmit={handleChangeEmail} className="space-y-4">
            <div>
              <label htmlFor="newEmail" className="block text-sm font-medium text-gray-400 mb-1">
                New Email
              </label>
              <input
                type="email"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Update Email
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;