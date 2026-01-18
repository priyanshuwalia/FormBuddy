import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar } from "lucide-react";
import { getFormResponseDetails } from "../api/forms";

const ResponseDetails: React.FC = () => {
    const { responseId } = useParams<{ responseId: string }>();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!responseId) return;
                const res = await getFormResponseDetails(responseId);
                setData(res);
            } catch (err) {
                console.error(err);
                setError("Failed to load response details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [responseId]);

    if (loading) {
        return (
            <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !data) {
        return <div className="p-8 text-red-500">{error || "Response not found"}</div>;
    }

    const { form, items, createdAt } = data;
    const blocks = form.blocks;

    const getAnswer = (blockId: string) => {
        const item = items.find((i: any) => i.blockId === blockId);
        return item ? item.value : "No answer";
    };

    return (
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full bg-gray-50 dark:bg-black min-h-screen">
            <header className="mb-8 mt-4">
                <Link
                    to={`/forms/${form.slug}/responses`}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 mb-4 text-sm transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Responses
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Response Details
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
                        <Calendar size={14} />
                        <span>Submitted on {new Date(createdAt).toLocaleString()}</span>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto space-y-6">
                {blocks.map((block: any) => {
                    if (['H3', 'DIVIDER'].includes(block.type)) {
                        // Render separators or headers if needed, or skip purely visual elements if admin view is strictly Q&A.
                        // Let's render headers for context.
                        if (block.type === 'H3') return <h3 key={block.id} className="text-xl font-bold mt-8 mb-4 border-b pb-2 dark:border-gray-800 dark:text-white">{block.label}</h3>;
                        return <hr key={block.id} className="my-6 border-gray-200 dark:border-gray-800" />;
                    }
                    if (['IMAGE', 'VIDEO'].includes(block.type)) return null; // Skip static media for now

                    return (
                        <div key={block.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                {block.label}
                            </label>
                            <div className="text-gray-900 dark:text-gray-100 text-lg">
                                {(getAnswer(block.id)) ? (
                                    <div className="whitespace-pre-wrap">{getAnswer(block.id)}</div>
                                ) : (
                                    <span className="text-gray-400 italic">No answer provided</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResponseDetails;
