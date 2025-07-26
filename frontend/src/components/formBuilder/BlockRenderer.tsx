import { useState, useRef, useEffect } from "react";
import { type FormBlock } from "../../types/form";
import {
  Trash,
  Asterisk,
  
  Calendar,
  Star,
  

  
  X
} from "lucide-react";

interface BlockRendererProps {
  block: FormBlock;
  onChange: (id: string, updated: Partial<FormBlock>) => void;
  onDelete: (id: string) => void;
  onEnter: () => void;
}

const BlockRenderer = ({ block, onChange, onDelete, onEnter }: BlockRendererProps) => {
    if (block.type === "DIVIDER") {
      return <hr className="my-4 border-t border-gray-300" />;
    }
    if (block.type === "H3") {
      return <h3 className="text-xl font-bold">{block.label}</h3>;
    }
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [options, setOptions] = useState(block.options || ["Option 1"]);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${Math.max(spanWidth + 16, 120)}px`;
    }
  }, [block.label]);

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    onChange(block.id, { options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...options, `Option ${options.length + 1}`];
    setOptions(updatedOptions);
    onChange(block.id, { options: updatedOptions });
  };

  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    onChange(block.id, { options: updatedOptions });
  };

  const sharedInputClasses = "rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400 border-l-[#4A2C6B] border-4";

  const rendererInput = () => {
  
    switch (block.type) {
      case "SHORT_ANS":
      case "LONG_ANS":
      case "EMAIL":
      case "NUM":
      case "PHONE_NUM":
      case "LINK":
        return (
          <input
            type={block.type === "EMAIL" ? "email" : block.type === "NUM" ? "number" : block.type === "PHONE_NUM" ? "tel" : block.type === "LINK" ? "url" : "text"}
            className={`${sharedInputClasses} ${block.type === "PHONE_NUM" || block.type === "LINK" ? "w-[240px]" : "w-full"} ${!block.placeholder ? "italic text-gray-400" : ""}  ${block.type === "LONG_ANS"? "h-24" : ""} ${block.type==="EMAIL" || "NUM"? "max-w-64": ""} `}
            value={block.placeholder || ""}
            onFocus={(e) => {
              if (!block.placeholder) {
                e.currentTarget.placeholder = "";
              }
            }}
            onBlur={(e) => {
              if (!block.placeholder) {
                e.currentTarget.placeholder = "Type placeholder text";
              }
            }}
            placeholder={block.type === "EMAIL" ? "Email" : "Type placeholder text"}
            onChange={(e) => onChange(block.id, { placeholder: e.target.value })}
          />
        );
      case "DATE":
        return (
          <div className="relative w-full">
            <input type="date" disabled className={sharedInputClasses + " pr-10 w-full"} />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        );
      case "RATING":
        return (
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className="cursor-pointer transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setSelectedRating(star)}
                fill={star <= (hoverRating || selectedRating) ? "#facc15" : "none"}
                color={star <= (hoverRating || selectedRating) ? "#facc15" : "#d1d5db"}
              />
            ))}
          </div>
        );
      case "CHECKBOXES":
      case "MULT_CHOICE":
        return (
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type={block.type === "CHECKBOXES" ? "checkbox" : "radio"}
                  disabled
                  name={`option-${block.id}`}
                  className="accent-indigo-500"
                />
                <input
                  type="text"
                  className="border-b border-[#6BC8AF] focus:border-indigo-500 focus:outline-none text-gray-700"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
                <button onClick={() => deleteOption(i)} className="text-gray-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-indigo-600 hover:underline"
            >
              + Add Option
            </button>
          </div>
        );
      case "DROPDOWN":
        return (
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  className="border-b border-[#6BC8AF] focus:border-indigo-500 focus:outline-none text-gray-700"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
                <button onClick={() => deleteOption(i)} className="text-gray-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-indigo-600 hover:underline"
            >
              + Add Option
            </button>
          </div>
        );
      case "FILE_UPLOAD":
        return (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Upload a file</label>
            <input type="file" disabled className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
        );
      default:
        return <div className="text-gray-500">Unknown block type</div>;
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="mb-3 mt-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={block.label}
            onChange={(e) => onChange(block.id, { label: e.target.value })}
            className="text-lg font-medium mb-2 focus:outline-none text-[#37352f]"
            placeholder="Type a Question"
            onKeyDown={handleKeyDown}
            style={{ transition: "width 0.2s" }}
          />
          <span
            ref={spanRef}
            className="invisible absolute whitespace-pre font-medium text-lg"
          >
            {block.label || "Type a Question"}
          </span>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={block.required}
            onChange={(e) => onChange(block.id, { required: e.target.checked })}
            className="accent-indigo-500"
          />
          <Asterisk size={18} color="gray" />
        </label>
      </div>

      {rendererInput()}

      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
        {onDelete && (
          <button onClick={() => onDelete(block.id)}>
            <Trash size={18} className="hover:text-red-500 hover:size-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlockRenderer;
