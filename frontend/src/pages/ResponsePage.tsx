import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import API from '../api/axios';
import { type FormBlock } from '../types/form';
import MadeWithFormBuddy from '../components/MadeWithFormBuddy';




interface FullForm {
  id: string;
  title: string;
  slug: string;
  description?: string;
  blocks: FormBlock[];

}


type ResponsesState = Record<string, string | string[] | number | null>;



const ResponsePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();


  const [form, setForm] = useState<FullForm | null>(null);
  const [responses, setResponses] = useState<ResponsesState>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) {
      setError("No form identifier provided.");
      setLoading(false);
      return;
    }


    const fetchForm = async () => {
      try {
        setLoading(true);

        const response = await API.get(`/forms/${slug}`);
        setForm(response.data);

        const initialResponses: ResponsesState = {};
        response.data.blocks.forEach((block: FormBlock) => {
          initialResponses[block.id] = block.type === 'CHECKBOXES' ? [] : '';
        });
        setResponses(initialResponses);
      } catch (err) {
        console.error("Failed to fetch form:", err);
        setError("Form not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [slug]);

  const handleInputChange = (blockId: string, value: string | string[]) => {
    setResponses((prev) => ({
      ...prev,
      [blockId]: value,
    }));
  };

  const handleCheckboxChange = (blockId: string, option: string, checked: boolean) => {
    const currentValues = (responses[blockId] as string[]) || [];
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter((item) => item !== option);
    handleInputChange(blockId, newValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);



    const payload = {
      formId: form?.id,
      items: Object.entries(responses).map(([blockId, value]) => ({
        blockId,
        value: Array.isArray(value) ? value.join(', ') : String(value || ''),
      })),
    };

    try {
      await API.post('/response', payload);
      alert("Form submitted successfully!");

      window.location.reload();
    } catch (err: any) {
      console.error("Failed to submit responses:", err);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading form...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!form) {
    return null;
  }


  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen font-inter flex flex-col items-center py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Header */}
          <div className="bg-gray-50/50 dark:bg-gray-800/50 p-8 sm:p-12 border-b border-gray-100 dark:border-gray-800">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">{form.title}</h1>
            {form.description && <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{form.description}</p>}
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-8">
            {form.blocks.map((block) => {
              const { id, type, label, placeholder, required, options } = block;
              const inputId = `block-${id}`;

              const fieldWrapper = (content: React.ReactNode) => (
                <div key={id} className="group">
                  <label htmlFor={inputId} className="block text-lg font-medium text-gray-900 dark:text-gray-100 mb-2.5 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {label}
                    {required && <span className="text-red-500 ml-1" title="Required">*</span>}
                  </label>
                  {content}
                </div>
              );

              const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm";

              switch (type) {
                case 'SHORT_ANS':
                case 'EMAIL':
                case 'NUM':
                case 'PHONE_NUM':
                case 'LINK':
                case 'DATE':
                  const inputType = {
                    SHORT_ANS: 'text', EMAIL: 'email', NUM: 'number',
                    PHONE_NUM: 'tel', LINK: 'url', DATE: 'date',
                  }[type];
                  return fieldWrapper(
                    <input
                      id={inputId}
                      type={inputType}
                      value={(responses[id] as string) || ''}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      placeholder={placeholder || 'Your answer...'}
                      required={required}
                      className={inputClasses}
                    />
                  );

                case 'LONG_ANS':
                  return fieldWrapper(
                    <textarea
                      id={inputId}
                      value={(responses[id] as string) || ''}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      placeholder={placeholder || 'Your answer...'}
                      required={required}
                      rows={4}
                      className={inputClasses}
                    />
                  );

                case 'MULT_CHOICE':
                  return fieldWrapper(
                    <div className="space-y-3">
                      {options?.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-indigo-100 dark:hover:border-gray-700 cursor-pointer transition-all">
                          <input
                            type="radio"
                            id={`${inputId}-${opt}`}
                            name={inputId}
                            value={opt}
                            checked={responses[id] === opt}
                            onChange={(e) => handleInputChange(id, e.target.value)}
                            required={required}
                            className="w-5 h-5 accent-indigo-600 border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                  );

                case 'CHECKBOXES':
                  return fieldWrapper(
                    <div className="space-y-3">
                      {options?.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-indigo-100 dark:hover:border-gray-700 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            id={`${inputId}-${opt}`}
                            value={opt}
                            checked={(responses[id] as string[])?.includes(opt)}
                            onChange={(e) => handleCheckboxChange(id, opt, e.target.checked)}
                            className="w-5 h-5 accent-indigo-600 rounded border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                  );

                case 'DROPDOWN':
                  return fieldWrapper(
                    <div className="relative">
                      <select
                        id={inputId}
                        value={(responses[id] as string) || ''}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        required={required}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select an option...</option>
                        {options?.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  );

                case 'RATING':
                  return fieldWrapper(
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleInputChange(id, star.toString())}
                          className="group/star p-1 focus:outline-none transition-transform active:scale-95"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill={(responses[id] as number) >= star ? "#fbbf24" : "none"} // amber-400
                            stroke={(responses[id] as number) >= star ? "#fbbf24" : "currentColor"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-colors ${(responses[id] as number) >= star ? '' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400'}`}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  );

                case 'H3':
                  return <h3 key={id} className="text-2xl font-bold text-gray-900 dark:text-white pt-6 pb-2 border-b-2 border-gray-100 dark:border-gray-800">{label}</h3>;

                case 'DIVIDER':
                  return <hr key={id} className="my-8 border-t border-gray-100 dark:border-gray-800" />;

                case 'FILE_UPLOAD':
                  return fieldWrapper(
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <input
                        id={inputId}
                        type="file"
                        onChange={(e) => handleInputChange(id, e.target.files ? e.target.files[0].name : '')}
                        required={required}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(responses[id] as string) ? (
                            <span className="text-indigo-600 font-medium">Selected: {(responses[id] as string)}</span>
                          ) : (
                            <span>Click to upload or drag and drop</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}

            <div className="pt-8">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-4 px-8 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/20 dark:shadow-none transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Submitting...
                  </span>
                ) : 'Submit Response'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 mb-12">
          <MadeWithFormBuddy />
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;