import {
    SettingsIcon,
    LogOutIcon,
    SendIcon,
    GlobeIcon,
    EditIcon,
    CodeIcon,
  } from "lucide-react";
  import React, { useState } from "react";
  import { render } from "react-dom";
  const Dashboard = () => {
    const [messages, setMessages] = useState([
      {
        text: "Hello! How can I assist you today?",
        isUser: false,
      },
    ]);
    const [input, setInput] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const handleSend = () => {
      if (input.trim()) {
        setMessages([
          ...messages,
          {
            text: input,
            isUser: true,
          },
        ]);
        setInput("");
        // Simulating AI response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "I'm processing your request. How else can I help you?",
              isUser: false,
            },
          ]);
        }, 1000);
      }
    };
    return (
      <div
        className="flex flex-col h-screen max-w-full bg-black text-white" >
        <header
          className="bg-black shadow-sm p-4 flex justify-between items-center border-b border-white" >
          <h1 className="text-xl font-semibold text-white">
            Dashboard
          </h1>
          <div className="flex space-x-4">
            <button
              className="p-2 rounded-full hover:bg-white hover:text-black border border-white" >
              <SettingsIcon className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-white hover:text-black border border-white" >
              <LogOutIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>
        <main className="flex-grow p-4 overflow-auto flex">
          <div className="w-1/2 pr-4">
            <div
              className="bg-black rounded-lg shadow-md border border-white" >
              <div
                className="h-96 overflow-y-auto p-4 space-y-4" >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`} >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${message.isUser ? "bg-white text-black" : "bg-black text-white border border-white"}`} >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="border-t border-white p-4 flex" >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 bg-black text-white border rounded-l-lg border-white focus:outline-none focus:ring-2 focus:ring-white" />
                <button
                  onClick={handleSend}
                  className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white" >
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div
              className="bg-black rounded-lg shadow-md h-full flex flex-col border border-white" >
              <div
                className="p-4 border-b border-white flex items-center justify-between" >
                <GlobeIcon
                  className="w-6 h-6 text-white mr-2" />
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white" >
                    <EditIcon className="w-5 h-5 mr-2" />
                    Click to edit
                  </button>
                  <button
                    className="flex items-center px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white" >
                    <CodeIcon className="w-5 h-5 mr-2" />
                    Code
                  </button>
                </div>
              </div>
              <div className="flex-grow p-4">
                {previewUrl && (
                  <iframe
                    src={previewUrl}
                    title="Web Preview"
                    className="w-full h-full border-0" />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  export default Dashboard;
  render(<Dashboard />, document.getElementById("root"));
  