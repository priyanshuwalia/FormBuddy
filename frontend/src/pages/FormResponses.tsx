import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
            <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full">
            <header className="mb-8 mt-12 lg:mt-0 flex items-center justify-between">
                <div>
                    <Link to="/forms" className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 mb-2 text-sm">
                        <ChevronLeft size={16} /> Back to Forms
                    </Link>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">{formTitle} <span className="text-gray-400 dark:text-gray-500 font-medium text-xl">Responses</span></h1>
                </div>
            </header>

            {error ? (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">{error}</div>
            ) : responses.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                    <div className="text-gray-400 dark:text-gray-600 mb-2">No responses yet</div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Share your form link to start collecting data.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="p-4 whitespace-nowrap">Submitted At</th>
                                    { }
                                    <th className="p-4">Response Summary</th>
                                    { }
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {responses.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                        <td className="p-4 whitespace-nowrap flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(r.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {r.items.slice(0, 3).map((item: any) => (
                                                    <span key={item.id} className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded text-xs border border-indigo-100 dark:border-indigo-900/30">
                                                        {truncate(item.value, 30)}
                                                    </span>
                                                ))}
                                                {r.items.length > 3 && <span className="text-gray-400 text-xs">+{r.items.length - 3} more</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                to={`/forms/${slug}/responses/${r.id}`}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

export default FormResponses;
