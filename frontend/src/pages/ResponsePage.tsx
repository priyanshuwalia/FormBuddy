import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

// Type for the state that holds user's answers
type ResponsesState = Record<string, string | string[] | number | null>;

// --- Component ---

const ResponsePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const navigate = useNavigate();

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

    // Fetch the form structure from the backend
    const fetchForm = async () => {
      try {
        setLoading(true);
        // This endpoint should return the form and its blocks ordered correctly
        const response = await API.get(`/forms/${slug}`); 
        setForm(response.data);
        // Initialize responses state with default values
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
    
    // Structure the payload for submission
    const payload = {
      formId: form?.id,
      answers: Object.entries(responses).map(([blockId, value]) => ({
        blockId,
        value,
      })),
    };
    
    try {
      console.log("Submitting responses:", payload);
      // await API.post('/responses', payload); // Endpoint to save responses
      alert("Form submitted successfully!");
      navigate('/'); // Redirect after submission
    } catch (err) {
      console.error("Failed to submit responses:", err);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Render Loading/Error States ---
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading form...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }
  
  if (!form) {
    return null; // Should not happen if loading/error are handled
  }
  
  // --- Render The Form ---
  return (
    <div className="bg-gray-50 min-h-screen font-inter p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-[#37352f] mb-2">{form.title}</h1>
          {form.description && <p className="text-gray-600 mb-8">{form.description}</p>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {form.blocks.map((block) => {
              const { id, type, label, placeholder, required, options } = block;
              const inputId = `block-${id}`;

              // Common field wrapper
              const fieldWrapper = (content: React.ReactNode) => (
                <div key={id}>
                  <label htmlFor={inputId} className="block text-lg font-semibold text-gray-800 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {content}
                </div>
              );

              // Render block based on its type
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
                      placeholder={placeholder || ''}
                      required={required}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  );

                case 'LONG_ANS':
                  return fieldWrapper(
                    <textarea
                      id={inputId}
                      value={(responses[id] as string) || ''}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      placeholder={placeholder || ''}
                      required={required}
                      rows={4}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  );

                case 'MULT_CHOICE':
                  return fieldWrapper(
                    <div className="space-y-2">
                      {options?.map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`${inputId}-${opt}`}
                            name={inputId}
                            value={opt}
                            checked={responses[id] === opt}
                            onChange={(e) => handleInputChange(id, e.target.value)}
                            required={required}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`${inputId}-${opt}`}>{opt}</label>
                        </div>
                      ))}
                    </div>
                  );
                  
                case 'CHECKBOXES':
                  return fieldWrapper(
                    <div className="space-y-2">
                      {options?.map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`${inputId}-${opt}`}
                            value={opt}
                            checked={(responses[id] as string[])?.includes(opt)}
                            onChange={(e) => handleCheckboxChange(id, opt, e.target.checked)}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`${inputId}-${opt}`}>{opt}</label>
                        </div>
                      ))}
                    </div>
                  );

                case 'DROPDOWN':
                  return fieldWrapper(
                    <select
                      id={inputId}
                      value={(responses[id] as string) || ''}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      required={required}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>{placeholder || 'Select an option'}</option>
                      {options?.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  );

                case 'RATING':
                   // Simple 1-5 star rating
                  return fieldWrapper(
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleInputChange(id, star.toString())}
                          className={`text-2xl ${
                            (responses[id] as number) >= star ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  );

                case 'H3':
                  return <h3 key={id} className="text-2xl font-bold text-[#37352f] pt-4 pb-2 border-b">{label}</h3>;

                case 'DIVIDER':
                  return <hr key={id} className="my-4" />;

                case 'FILE_UPLOAD':
                    return fieldWrapper(
                        <input
                            id={inputId}
                            type="file"
                            onChange={(e) => handleInputChange(id, e.target.files ? e.target.files[0].name : '')} // Simplified for example
                            required={required}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    );

                default:
                  return null; // Don't render unknown block types
              }
            })}

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition w-full sm:w-auto disabled:bg-gray-400"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          <MadeWithFormBuddy />
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;