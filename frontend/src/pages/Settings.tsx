import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { User, Bell, Shield, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Settings: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState("Jane Doe");
    const [email, setEmail] = useState(user?.email || "");

    return (
        <div className="flex w-full min-h-screen bg-gray-50 font-inter">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-2">Manage your account preferences and workspace settings.</p>
                </header>

                <div className="max-w-4xl">
                    {/* Navigation Tabs (Mock) */}
                    <div className="flex items-center gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
                        <button className="pb-4 border-b-2 border-indigo-600 text-indigo-600 font-medium whitespace-nowrap">Profile</button>
                        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">Notifications</button>
                        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">Security</button>
                        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">Billing & Plans</button>
                    </div>

                    {/* Profile Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Profile Picture</h2>
                                <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                            </div>
                            <button className="ml-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                Upload New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-2.5 text-gray-400 w-5 h-5">@</div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                            <textarea
                                rows={4}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                placeholder="Tell us a little about yourself..."
                                defaultValue="Product designer based in San Francisco. I love building clean and thoughtful user experiences."
                            ></textarea>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </section>

                    {/* Preferences / Toggles */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-gray-400" />
                            Notifications
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Email Notifications</div>
                                    <div className="text-sm text-gray-500">Receive weekly digests and updates.</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">New Response Alerts</div>
                                    <div className="text-sm text-gray-500">Get notified instantly when someone fills out a form.</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="mt-8 border-t pt-8">
                        <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                            <Shield size={20} />
                            Danger Zone
                        </h3>
                        <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <div className="font-medium text-red-900">Delete Account</div>
                                <div className="text-sm text-red-700">Once you delete your account, there is no going back. Please be certain.</div>
                            </div>
                            <button className="whitespace-nowrap px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition">
                                Delete Account
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Settings;
