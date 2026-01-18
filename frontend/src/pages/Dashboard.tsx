import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserForms } from "../api/forms";
import type { Form } from "../types/form";

const Dashboard = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data: any = await getUserForms();

        if (Array.isArray(data)) {
          setForms(data);

        } else if (data && Array.isArray(data.forms)) {
          setForms(data.forms);
        } else {

          console.warn("Unexpected data structure", data);
        }
      } catch (err) {
        setError("Failed to load forms.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-indigo-600">{user?.email}</span>
            </p>
          </div>
          <Link
            to="/create-form"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Form
          </Link>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {forms.length === 0 && !error ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-4">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No forms yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Create your first form to start collecting responses from your users.</p>
            <Link
              to="/create-form"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
              Start creating →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forms.map((form) => (
              <div
                key={form.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full hover:border-indigo-100 transform hover:-translate-y-1"
              >
                <div className={`h-3 w-full ${form.theme || 'bg-indigo-500'}`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Link to={`/forms/${form.slug}`} className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-1" title={form.title}>
                      {form.title}
                    </Link>
                    {form.isPublished && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                    {form.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {/* @ts-ignore */}
                      <span>{form._count?.responses || 0} responses</span>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/forms/${form.slug}/responses`} className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-50 transition">
                        View Results
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;