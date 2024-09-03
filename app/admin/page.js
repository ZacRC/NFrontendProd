'use client';

import {
  UserIcon,
  VideoIcon,
  InfoIcon,
  GithubIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      const access = localStorage.getItem('access');
      if (!access) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('https://creatorgiveaways.world/api/admin/dashboard/', {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setVideos(data.videos);
        } else if (response.status === 403) {
          alert('You do not have permission to access this page');
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleCreateUser = async (userData) => {
    // Implement user creation logic
  };

  const handleUpdateUser = async (userId, userData) => {
    // Implement user update logic
  };

  const handleDeleteUser = async (userId) => {
    // Implement user deletion logic
  };

  const tabs = [
    {
      id: "users",
      label: "User Information",
      icon: UserIcon,
    },
    {
      id: "videos",
      label: "Video",
      icon: VideoIcon,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 w-full ${activeTab === tab.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
          <button
            className="flex items-center px-4 py-2 mt-2 text-gray-600 w-full hover:bg-gray-100"
            onClick={() => setActiveTab("more")}
          >
            <InfoIcon className="w-5 h-5 mr-2" />
            More Information
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              User Information
            </h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Is Staff</th>
                  <th className="py-3 px-4 text-left">Date Joined</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.is_staff ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-4">{new Date(user.date_joined).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleUpdateUser(user.id)}
                      >
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "videos" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Video Management
            </h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Video File</th>
                  <th className="py-3 px-4 text-left">Uploaded At</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{video.user}</td>
                    <td className="py-3 px-4">{video.video_file}</td>
                    <td className="py-3 px-4">{new Date(video.uploaded_at).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "more" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              More Information
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                GitHub Links
              </h3>
              <div className="flex flex-col space-y-4">
                <a
                  href="https://github.com/yourusername/frontend-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <GithubIcon className="w-5 h-5 mr-2" />
                  Frontend Repository
                </a>
                <a
                  href="https://github.com/yourusername/backend-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <GithubIcon className="w-5 h-5 mr-2" />
                  Backend Repository
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;