import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { TrendingUp, Users, Clock, Globe, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { getAnalyticsFn } from "../api/analytics";

const Analytics: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnalyticsFn();
                setData(result);
            } catch (error) {
                console.error("Failed to load analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const iconMap: any = {
        Users: Users,
        Globe: Globe,
        Clock: Clock,
        TrendingUp: TrendingUp,
        FileText: FileText
    };

    if (loading) {
        return (
            <div className="flex w-full min-h-screen bg-gray-50 font-inter">
                <Sidebar />
                <div className="flex-1 p-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    // Calculate chart heights
    const maxTrend = Math.max(...data.trends, 1); // Avoid div by zero

    return (
        <div className="flex w-full min-h-screen bg-gray-50 font-inter">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-2">Overview of your form performance and insights.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {data.stats.map((stat: any, idx: number) => {
                        const Icon = iconMap[stat.icon] || Users;
                        return (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <Icon size={24} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-indigo-600'}`}>
                                        {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area - Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Chart Area Placeholder */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Response Trends</h3>
                            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Last 7 days</option>
                            </select>
                        </div>

                        {/* CSS Based Bar Chart Visualization */}
                        <div className="h-64 flex items-end justify-between gap-2 mt-8">
                            {data.trends.map((count: number, i: number) => {
                                const height = (count / maxTrend) * 100;
                                return (
                                    <div key={i} className="w-full bg-indigo-50 rounded-t-sm relative group cursor-pointer transition-all hover:bg-indigo-100">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm transition-all duration-500 group-hover:bg-indigo-600"
                                            style={{ height: `${height === 0 ? 2 : height}%` }} // Min height for visibility
                                        ></div>
                                        {/* Tooltip on hover */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {count} Responses
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
                            {/* Simple labels for last 7 days */}
                            {Array.from({ length: 7 }).map((_, i) => {
                                const d = new Date();
                                d.setDate(d.getDate() - (6 - i));
                                return <span key={i}>{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            })}
                        </div>
                    </div>

                    {/* Top Performing Forms */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performing Forms</h3>
                        <div className="space-y-6">
                            {data.topForms.length > 0 ? (
                                data.topForms.map((form: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-semibold text-gray-800 mb-1 truncate max-w-[150px]">{form.name}</div>
                                            <div className="text-xs text-gray-500">{form.responses.toLocaleString()} responses</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-indigo-600">{form.conversion}</div>
                                            <div className="text-xs text-gray-400">Conv. Rate</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">No forms yet</div>
                            )}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition">
                            View All Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
