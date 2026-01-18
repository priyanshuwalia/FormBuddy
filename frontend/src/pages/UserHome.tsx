import React from "react";
import Sidebar from "../components/Sidebar";
import { Plus, Clock, FileText, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserHome: React.FC = () => {
    const { user } = useAuth();

    // Mock data for recent activity
    const recentForms = [
        { title: "Customer Feedback 2024", date: "2 hours ago", responses: 12 },
        { title: "Event Registration", date: "Yesterday", responses: 45 },
        { title: "Product Survey", date: "3 days ago", responses: 8 },
    ];

    const templates = [
        { title: "Contact Form", color: "bg-blue-500" },
        { title: "Event Register", color: "bg-purple-500" },
        { title: "Feedback", color: "bg-green-500" },
    ];

    return (
        <div className="flex w-full min-h-screen bg-gray-50 font-inter">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Welcome back, <span className="text-indigo-600">{user?.email?.split('@')[0] || 'User'}</span>
                    </h1>
                    <p className="text-gray-500 mt-2">Here's what's happening with your forms today.</p>
                </header>

                {/* Quick Actions / Templates */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Quick Start</h2>
                        <Link to="/create-form" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                            View all templates <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Link to="/create-form" className="flex flex-col items-center justify-center h-32 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition cursor-pointer group">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2 group-hover:scale-110 transition">
                                <Plus size={24} />
                            </div>
                            <span className="font-semibold text-gray-700">Create Scratch</span>
                        </Link>
                        {templates.map((t, i) => (
                            <div key={i} className="relative h-32 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group">
                                <div className={`h-2 w-full ${t.color}`}></div>
                                <div className="p-4">
                                    <div className="font-semibold text-gray-800">{t.title}</div>
                                    <div className="text-xs text-gray-500 mt-1">Template</div>
                                </div>
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200">
                                        <Plus size={16} className="text-gray-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-gray-400" />
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {recentForms.map((form, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{form.title}</div>
                                        <div className="text-xs text-gray-500">Edited {form.date}</div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                        {form.responses} responses
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Helpful Resources or Tips */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Star size={24} className="text-yellow-300 fill-yellow-300" />
                            </div>
                            <button className="text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm transition">
                                Dismiss
                            </button>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Pro Tip: Logic Jumps</h3>
                        <p className="text-indigo-100 mb-6 leading-relaxed">
                            Did you know you can show or hide questions based on previous answers?
                            Try adding logic jumps to your next form to increase completion rates.
                        </p>
                        <button className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition shadow-sm">
                            Learn How
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserHome;
