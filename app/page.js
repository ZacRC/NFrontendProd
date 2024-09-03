"use client";

import {
  CheckIcon,
  DownloadIcon,
  SearchIcon,
  SunIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  PlusIcon,
  CopyIcon,
  TrashIcon,
  MoreHorizontalIcon,
  HeartIcon,
  ImageIcon,
  LayoutGridIcon,
  UserIcon,
  StarIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Promote Bento Cards v.2", completed: false },
    { id: 2, text: "Release Bento Cards for Framer", completed: false },
    { id: 3, text: "Bento Cards: UI Components", completed: false },
    { id: 4, text: "Removr Illustrations", completed: true },
    { id: 5, text: "Bento Cards v. 4", completed: false },
  ]);
  const [apiResponse, setApiResponse] = useState(null);

  const handleCheckboxChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTestAPI = async () => {
    try {
      const response = await fetch('https://creatorgiveaways.world/api/test/');
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse('Error: ' + error.message);
    }
  };

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.opacity = Math.random();
      particle.style.width = `${Math.random() * 2 + 1}px`;
      particle.style.height = `${Math.random() * 2 + 1}px`;
      document.body.appendChild(particle);
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };
    const particleInterval = setInterval(createParticle, 200);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="bg-[#1c1c1e] min-h-screen text-white relative overflow-hidden">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <CheckIcon className="w-6 h-6 mr-2 text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-300">simplelist</h1>
        </div>
        <button
          className="bg-[#2c2c2e] px-4 py-2 rounded-md text-gray-300"
          onClick={() => router.push("/login")}
        >
          Download
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-200">
          Your tasks, simplified
        </h2>
        <p className="text-center text-gray-400 mb-2">
          Create, manage, and conquer your to-do lists with ease
        </p>

        <div className="flex justify-center mb-4">
          <button
            className="bg-[#3a3a3c] text-white px-6 py-3 rounded-full font-semibold"
            onClick={() => router.push("/register")}
          >
            Get started for free
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mb-12">
          v1.0.1 - macOS 12+
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleTestAPI}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Test API
          </button>
        </div>

        {apiResponse && (
          <div className="max-w-lg mx-auto bg-[#2c2c2e] p-4 rounded-lg mb-8">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {apiResponse}
            </pre>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1c1c1e] pointer-events-none"></div>
          <div className="flex justify-center space-x-4">
            <div className="bg-[#2c2c2e] rounded-2xl p-4 w-64">
              <div className="flex items-center bg-[#3a3a3c] rounded-full px-3 py-2 mb-4">
                <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search list..."
                  className="bg-transparent text-sm focus:outline-none text-gray-300"
                />
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <SunIcon className="w-5 h-5 mr-3" />
                  Today
                </li>
                <li className="flex items-center text-gray-300">
                  <BriefcaseIcon className="w-5 h-5 mr-3" />
                  Work
                </li>
                <li className="flex items-center text-gray-300">
                  <CalendarIcon className="w-5 h-5 mr-3" />
                  Upcoming
                  <span className="ml-auto bg-[#ff9f0a] text-xs px-2 py-1 rounded-full">
                    Totoro
                  </span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="w-5 h-5 mr-3" />
                  Completed
                </li>
              </ul>
            </div>

            <div className="bg-[#2c2c2e] rounded-2xl p-4 w-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ArrowLeftIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <h3 className="font-semibold text-gray-300">Upcoming</h3>
                </div>
                <PlusIcon className="w-5 h-5 text-gray-400" />
              </div>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center p-2 ${
                      task.completed ? "line-through text-gray-500" : "bg-[#3a3a3c] rounded"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                    <span className="text-gray-300">{task.text}</span>
                    {task.id === 2 && (
                      <span className="ml-2 bg-[#0a84ff] text-xs px-2 py-1 rounded-full">
                        Kohaku
                      </span>
                    )}
                    <div className="ml-auto flex space-x-2">
                      <CopyIcon className="w-4 h-4 text-gray-400" />
                      <TrashIcon className="w-4 h-4 text-gray-400" />
                      <MoreHorizontalIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                <span>COMPLETED {tasks.filter(task => task.completed).length}/{tasks.length}</span>
                <MoreHorizontalIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-[#2c2c2e] rounded-2xl p-4 w-64">
              <div className="grid grid-cols-5 gap-2 mb-4">
                <span className="w-6 h-6 bg-[#ff453a] rounded-full"></span>
                <span className="w-6 h-6 bg-[#ff9f0a] rounded-full"></span>
                <span className="w-6 h-6 bg-[#30d158] rounded-full"></span>
                <span className="w-6 h-6 bg-[#bf5af2] rounded-full"></span>
                <span className="w-6 h-6 bg-[#0a84ff] rounded-full"></span>
              </div>
              <div className="space-y-2">
                <div className="bg-[#3a3a3c] p-2 rounded flex items-center justify-center">
                  <HeartIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-300">Like</span>
                </div>
                <div className="bg-[#3a3a3c] p-2 rounded flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-300">Image</span>
                </div>
                <div className="bg-[#3a3a3c] p-2 rounded flex items-center justify-center">
                  <LayoutGridIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-300">Grid</span>
                </div>
                <div className="bg-[#3a3a3c] p-2 rounded flex items-center justify-center">
                  <UserIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-300">User</span>
                </div>
                <div className="bg-[#3a3a3c] p-2 rounded flex items-center justify-center">
                  <StarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-300">Star</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-8">
        <p className="text-gray-500 mb-4">
          Trusted by over 50,000 designers and developers
        </p>
        <div className="flex justify-center space-x-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-[#3a3a3c] rounded-full"></div>
          ))}
        </div>
      </footer>
      <style jsx>{`
        .particle {
          position: fixed;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          animation: float 5s infinite, glow 1.5s infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
