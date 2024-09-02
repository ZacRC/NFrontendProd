import {
    UploadIcon,
    LogOutIcon,
    PlayIcon,
    MoonIcon,
    DropletIcon,
  } from "lucide-react";
  import React from "react";
  import { render } from "react-dom";
  export default function Dashboard() {
    return (
      <div
        className="min-h-screen bg-black text-blue-300 p-6 bg-gradient-to-br from-gray-900 to-black overflow-hidden relative" >
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse" ></div>
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5PSIwIiB4Mj0iMCIgeTI9IjQwIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" ></div>
        <header
          className="flex justify-between items-center mb-12 relative z-10" >
          <div className="flex items-center space-x-2">
            <MoonIcon size={24} className="text-blue-400" />
          </div>
          <button
            className="flex items-center space-x-2 bg-blue-600/80 hover:bg-blue-700/80 text-white py-2 px-4 rounded-full transition duration-300 shadow-lg hover:shadow-blue-600/50 text-sm font-semibold backdrop-blur-sm" >
            <LogOutIcon size={18} />
            <span>Logout</span>
          </button>
        </header>
  
        <main className="max-w-lg mx-auto relative z-10">
          <div
            className="bg-gray-900/80 rounded-2xl p-8 mb-12 shadow-2xl shadow-blue-500/20 border border-blue-500/30 backdrop-blur-sm" >
            <h2
              className="text-3xl font-bold mb-6 text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" >
              Upload Video
            </h2>
            <div
              className="border-2 border-dashed border-blue-500/50 rounded-xl p-10 text-center bg-gradient-to-b from-gray-900/50 to-black/50 hover:from-gray-800/50 hover:to-gray-900/50 transition-all duration-300" >
              <UploadIcon
                size={64}
                className="mx-auto mb-6 text-blue-400 animate-pulse" />
              <p className="mb-6 text-lg text-blue-300/80">
                Drag and drop your video here or
              </p>
              <button
                className="bg-blue-600/80 hover:bg-blue-700/80 text-white py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-blue-600/50 text-lg font-semibold backdrop-blur-sm" >
                Choose File
              </button>
            </div>
          </div>
  
          <button
            className="w-full bg-gradient-to-r from-blue-600/80 to-blue-800/80 hover:from-blue-700/80 hover:to-blue-900/80 text-white py-4 px-8 rounded-full text-xl font-bold transition duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-600/50 backdrop-blur-sm relative overflow-hidden group" >
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform rotate-45 translate-y-full group-hover:translate-y-0 transition-transform duration-500" ></div>
            <PlayIcon
              size={28}
              className="mr-3 relative z-10" />
            <span className="relative z-10">
              Start
            </span>
          </button>
        </main>
      </div>
    );
  }
  render(<Dashboard />, document.getElementById("root"));
  