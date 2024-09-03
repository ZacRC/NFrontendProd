"use client";

import {
  UploadIcon,
  LogOutIcon,
  PlayIcon,
  MoonIcon,
  DropletIcon,
  SettingsIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (!access) {
      router.push('/login');
    } else {
      trackUserActivity('page_visit', { page: 'dashboard' });
    }
  }, []);

  const trackUserActivity = async (activityType, details = {}) => {
    const access = localStorage.getItem('access');
    try {
      await fetch('https://creatorgiveaways.world/api/track_activity/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify({ activity_type: activityType, details }),
      });
    } catch (error) {
      console.error('Error tracking user activity:', error);
    }
  };

  const handleLogout = async () => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    
    const res = await fetch('https://creatorgiveaways.world/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
      body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      router.push('/login');
    } else {
      alert('Logout failed');
    }
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video_file", videoFile);

    const res = await fetch('https://creatorgiveaways.world/api/upload_video/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setTranscription(data.transcription);
      setShowPopup(true);
      trackUserActivity('video_upload', { video_id: data.id });
    } else {
      alert('Video upload failed');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => router.push('/Settings')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <SettingsIcon className="mr-2" size={16} />
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Video Transcription Dashboard
        </h1>
        <div className="flex space-x-4">
          <MoonIcon size={24} className="text-blue-400" />
          <DropletIcon size={24} className="text-blue-400" />
        </div>
      </header>

      <main className="max-w-lg mx-auto relative z-10">
        <div className="bg-gray-900/80 rounded-2xl p-8 mb-12 shadow-2xl shadow-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Upload Video
          </h2>
          <div className="border-2 border-dashed border-blue-500/50 rounded-xl p-10 text-center bg-gradient-to-b from-gray-900/50 to-black/50 hover:from-gray-800/50 hover:to-gray-900/50 transition-all duration-300">
            <UploadIcon size={64} className="mx-auto mb-6 text-blue-400 animate-pulse" />
            <p className="mb-6 text-lg text-blue-300/80">
              Drag and drop your video here or
            </p>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button
              className="bg-blue-600/80 hover:bg-blue-700/80 text-white py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-blue-600/50 text-lg font-semibold backdrop-blur-sm"
              onClick={handleUpload}
            >
              Choose File
            </button>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600/80 to-blue-800/80 hover:from-blue-700/80 hover:to-blue-900/80 text-white py-4 px-8 rounded-full text-xl font-bold transition duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-600/50 backdrop-blur-sm relative overflow-hidden group"
          onClick={handleUpload}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform rotate-45 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <PlayIcon size={28} className="mr-3 relative z-10" />
          <span className="relative z-10">Start</span>
        </button>
      </main>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Transcription</h2>
            <p>{transcription}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}