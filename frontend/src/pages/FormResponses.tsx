import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getFormResponses } from '../api/forms';
import API from '../api/axios';
import { ChevronLeft, Calendar } from 'lucide-react';

const FormResponses: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [responses, setResponses] = useState<any[]>([]);
    const [formTitle, setFormTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {

                const formRes = await API.get(`/forms/${slug}`);
                const form = formRes.data;
                setFormTitle(form.title);

                const res = await getFormResponses(form.id);
                setResponses(res);
            } catch (err) {
                console.error(err);
                setError("Failed to load responses");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

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

    return (
        <div className="flex w-full min-h-screen bg-gray-50 font-inter">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/forms" className="text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2 text-sm">
                            <ChevronLeft size={16} /> Back to Forms
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900">{formTitle} <span className="text-gray-400 font-medium text-xl">Responses</span></h1>
                    </div>
                </header>

                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
                ) : responses.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
                        <div className="text-gray-400 mb-2">No responses yet</div>
                        <p className="text-sm text-gray-500">Share your form link to start collecting data.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 whitespace-nowrap">Submitted At</th>
                                        {/* Dynamic Headers based on first response structure or just a summary */}
                                        <th className="p-4">Response Summary</th>
                                        {/* Ideally we'd parse all blocks to show columns, but for "View All" a summary or detailed JSON view is a start */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {responses.map((r) => (
                                        <tr key={r.id} className="hover:bg-gray-50 transition">
                                            <td className="p-4 whitespace-nowrap flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(r.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {r.items.slice(0, 3).map((item: any) => (
                                                        <span key={item.id} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs border border-indigo-100">
                                                            {/* We might need block label here, but response only has blockId unless we expand. 
                                                               For prompt simplicity, showing value. */}
                                                            {truncate(item.value, 30)}
                                                        </span>
                                                    ))}
                                                    {r.items.length > 3 && <span className="text-gray-400 text-xs">+{r.items.length - 3} more</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

export default FormResponses;
