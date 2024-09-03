'use client';

import {
  UserIcon,
  VideoIcon,
  InfoIcon,
  GithubIcon,
  EditIcon,
  TrashIcon,
  XIcon,
  BarChart2Icon,
  ActivityIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState({});
  const [tabs, setTabs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();

  const [userActivity, setUserActivity] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [pageVisits, setPageVisits] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

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
        const fetchedData = await response.json();
        setData(fetchedData);
        setUserActivity(fetchedData.user_activity || []);
        setAnalytics(fetchedData.analytics || null);
        setPageVisits(fetchedData.analytics?.page_visits || []);
        const newTabs = Object.keys(fetchedData).map(key => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          icon: key === 'users' ? UserIcon : VideoIcon,
        }));
        setTabs(newTabs);
        if (newTabs.length > 0 && !newTabs.some(tab => tab.id === activeTab)) {
          setActiveTab(newTabs[0].id);
        }
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

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const access = localStorage.getItem('access');
      try {
        const response = await fetch(`https://creatorgiveaways.world/api/admin/${activeTab === 'user' ? 'user' : activeTab}/delete/${id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });
  
        if (response.ok) {
          fetchAdminData();
        } else {
          alert('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    const access = localStorage.getItem('access');
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch(`https://creatorgiveaways.world/api/admin/${activeTab === 'user' ? 'user' : activeTab}/update/${editItem.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        setEditItem(null);
        fetchAdminData();
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const pageVisitsData = {
    labels: pageVisits.map(item => item.page),
    datasets: [
      {
        label: 'Page Visits',
        data: pageVisits.map(item => item.visits),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pageVisitsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Page Visits (Last 7 Days)',
      },
    },
  };

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
          <button
            className="flex items-center px-4 py-2 mt-2 text-gray-600 w-full hover:bg-gray-100"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart2Icon className="w-5 h-5 mr-2" />
            Analytics
          </button>
          <button
            className="flex items-center px-4 py-2 mt-2 text-gray-600 w-full hover:bg-gray-100"
            onClick={() => setActiveTab("user_activity")}
          >
            <ActivityIcon className="w-5 h-5 mr-2" />
            User Activity
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {activeTab !== "more" && activeTab !== "analytics" && activeTab !== "user_activity" && data[activeTab] && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  {Object.keys(data[activeTab][0]).map(key => (
                    <th key={key} className="py-3 px-4 text-left">{key}</th>
                  ))}
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data[activeTab].map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    {Object.entries(item).map(([key, value]) => (
                      <td key={key} className="py-3 px-4">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
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
        {activeTab === "analytics" && analytics && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-3xl font-bold">{analytics.total_users}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Active Users (Last 7 Days)</h3>
                <p className="text-3xl font-bold">{analytics.active_users_last_7_days}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Total Videos</h3>
                <p className="text-3xl font-bold">{analytics.total_videos}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Videos Uploaded (Last 7 Days)</h3>
                <p className="text-3xl font-bold">{analytics.videos_uploaded_last_7_days}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Bar data={pageVisitsData} options={pageVisitsOptions} />
            </div>
          </div>
        )}
        {activeTab === "user_activity" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Activity Type</th>
                  <th className="py-3 px-4 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {userActivity.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{activity.username}</td>
                    <td className="py-3 px-4">{activity.activity_type}</td>
                    <td className="py-3 px-4">{new Date(activity.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-4">{JSON.stringify(activity.details)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Item</h3>
              <button onClick={() => setEditItem(null)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              {Object.entries(editItem).map(([key, value]) => (
                key !== 'id' && (
                  <div key={key} className="mb-4">
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type={typeof value === 'boolean' ? 'checkbox' : 'text'}
                      id={key}
                      name={key}
                      defaultValue={value}
                      defaultChecked={typeof value === 'boolean' ? value : undefined}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                )
              ))}
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;