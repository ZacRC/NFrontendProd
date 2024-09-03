'use client';

import {
  UserIcon,
  VideoIcon,
  InfoIcon,
  GithubIcon,
  EditIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState({});
  const [tabs, setTabs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();

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
        {activeTab !== "more" && data[activeTab] && (
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