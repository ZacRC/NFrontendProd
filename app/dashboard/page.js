'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkAndRefreshToken } from '../../utils/auth';
import {
    SettingsIcon,
    LogOutIcon,
    SendIcon,
    GlobeIcon,
    EditIcon,
    CodeIcon,
} from "lucide-react";

const Dashboard = () => {
    const [messages, setMessages] = useState([
        {
            text: "Hello! How can I assist you today?",
            isUser: false,
        },
    ]);
    const [input, setInput] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                console.log('Authentication failed, redirecting to login');
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([
                ...messages,
                {
                    text: input,
                    isUser: true,
                },
            ]);
            setInput("");

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch('https://creatorgiveaways.world/api/generate-code/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ prompt: input }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setGeneratedCode(data.generated_code);
                    setMessages(prev => [...prev, {
                        text: "I've generated the code based on your prompt. You can see it in the preview panel.",
                        isUser: false,
                    }]);
                } else {
                    throw new Error('Failed to generate code');
                }
            } catch (error) {
                console.error('Error generating code:', error);
                setMessages(prev => [...prev, {
                    text: "I'm sorry, there was an error generating the code. Please try again.",
                    isUser: false,
                }]);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch('https://creatorgiveaways.world/api/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                console.error('Logout failed');
                // If the token is invalid, we should still clear local storage and redirect
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Even if there's an error, clear local storage and redirect
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-full bg-black text-white">
            <header className="bg-black shadow-sm p-4 flex justify-between items-center border-b border-white">
                <h1 className="text-xl font-semibold text-white">
                    Dashboard
                </h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.push('/Settings')}
                        className="p-2 rounded-full hover:bg-white hover:text-black border border-white"
                    >
                        <SettingsIcon className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-white hover:text-black border border-white"
                    >
                        <LogOutIcon className="w-6 h-6 text-white" />
                    </button>
                </div>
            </header>
            <main className="flex-grow p-4 overflow-auto flex">
                <div className="w-1/2 pr-4">
                    <div className="bg-black rounded-lg shadow-md border border-white">
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs p-3 rounded-lg ${message.isUser ? "bg-white text-black" : "bg-black text-white border border-white"}`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white p-4 flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow px-4 py-2 bg-black text-white border rounded-l-lg border-white focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <div className="bg-black rounded-lg shadow-md h-full flex flex-col border border-white">
                        <div className="p-4 border-b border-white flex items-center justify-between">
                            <GlobeIcon className="w-6 h-6 text-white mr-2" />
                            <div className="flex space-x-2">
                                <button className="flex items-center px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white">
                                    <EditIcon className="w-5 h-5 mr-2" />
                                    Click to edit
                                </button>
                                <button className="flex items-center px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white border border-white focus:outline-none focus:ring-2 focus:ring-white">
                                    <CodeIcon className="w-5 h-5 mr-2" />
                                    Code
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow p-4 overflow-auto">
                            <pre className="text-white whitespace-pre-wrap">
                                {generatedCode}
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
