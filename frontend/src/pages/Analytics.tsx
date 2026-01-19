import React, { useEffect, useState } from "react";
import { TrendingUp, Users, Clock, Globe, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { getAnalyticsFn } from "../api/analytics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
            <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!data) return null;



    const chartData = data.trends.map((count: number, i: number) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            name: d.toLocaleDateString('en-US', { weekday: 'short' }),
            responses: count
        };
    });

    return (
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full">
            { }
            <header className="mb-8 mt-12 lg:mt-0"> { }
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2">Overview of your form performance and insights.</p>
            </header>

            { }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {data.stats.map((stat: any, idx: number) => {
                    const Icon = iconMap[stat.icon] || Users;
                    return (
                        <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                    {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            { }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                { }
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Response Trends</h3>
                        <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                            <option>Last 7 days</option>
                        </select>
                    </div>

                    { }
                    <div className="h-64 mt-8 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1F2937', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar
                                    dataKey="responses"
                                    fill="#6366F1"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                    activeBar={{ fill: '#4F46E5' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                { }
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Performing Forms</h3>
                    <div className="space-y-6">
                        {data.topForms.length > 0 ? (
                            data.topForms.map((form: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                                    <div className="flex-1 min-w-0 mr-4"> { }
                                        <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1 truncate">{form.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{form.responses.toLocaleString()} responses</div>
                                    </div>
                                    {/* Removed Views/Conversion layout */}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-4">No forms yet</div>
                        )}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition">
                        View All Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
