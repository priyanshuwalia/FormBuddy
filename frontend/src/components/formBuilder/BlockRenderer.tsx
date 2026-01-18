import { useState, useRef, useEffect } from "react";
import { type FormBlock } from "../../types/form";
import {
  Trash,
  Calendar,
  Star,
  X,
  GripVertical
} from "lucide-react";

interface BlockRendererProps {
  block: FormBlock;
  onChange: (id: string, updated: Partial<FormBlock>) => void;
  onDelete: (id: string) => void;
  onEnter: () => void;
}

const BlockRenderer = ({ block, onChange, onDelete, onEnter }: BlockRendererProps) => {
  if (block.type === "DIVIDER") {
    return <hr className="my-6 border-t border-gray-200 dark:border-gray-800" />;
  }
  if (block.type === "H3") {
    return (
      <input
        type="text"
        value={block.label}
        onChange={(e) => onChange(block.id, { label: e.target.value })}
        className="text-2xl font-bold w-full bg-transparent border-none focus:ring-0 focus:outline-none placeholder-gray-300 dark:placeholder-gray-600 text-gray-900 dark:text-white mb-2"
        placeholder="Heading 3"
      />
    );
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

  // Modern input styles: clean border, subtle shadow, ring on focus
  const sharedInputClasses = "transition-all duration-200 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800/50 placeholder:text-gray-400 dark:placeholder:text-gray-500 w-full";

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
            className={`${sharedInputClasses} ${block.type === "PHONE_NUM" || block.type === "LINK" ? "max-w-md" : "w-full"} ${block.type === "LONG_ANS" ? "h-24" : ""} ${block.type === "EMAIL" || block.type === "NUM" ? "max-w-sm" : ""}`}
            value={block.placeholder || ""}
            onChange={(e) => onChange(block.id, { placeholder: e.target.value })}
            placeholder={block.type === "EMAIL" ? "example@email.com" : "Placeholder text..."}
          />
        );
      case "DATE":
        return (
          <div className="relative max-w-sm">
            <input type="date" disabled className={sharedInputClasses} />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        );
      case "RATING":
        return (
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className="cursor-pointer transition-all hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setSelectedRating(star)}
                fill={star <= (hoverRating || selectedRating) ? "#fbbf24" : "none"} // amber-400
                color={star <= (hoverRating || selectedRating) ? "#fbbf24" : "#d1d5db"}
              />
            ))}
          </div>
        );
      case "CHECKBOXES":
      case "MULT_CHOICE":
        return (
          <div className="space-y-3 pl-1">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className={`w-4 h-4 rounded border ${block.type === "CHECKBOXES" ? "rounded-md" : "rounded-full"} border-gray-300 dark:border-gray-600 flex-shrink-0`} />
                <input
                  type="text"
                  className="bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none text-gray-700 dark:text-gray-300 w-full py-1 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                />
                <button onClick={() => deleteOption(i)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1">
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
            >
              + Add Option
            </button>
          </div>
        );
      case "DROPDOWN":
        return (
          <div className="space-y-2 max-w-md">
            <div className="relative">
              <div className={sharedInputClasses + " text-gray-400 flex items-center justify-between"}>
                <span>Select an option...</span>
                <div className="h-4 w-4 border-l-2 border-b-2 border-gray-400 transform -rotate-45 translate-y-[-2px] ml-2"></div>
              </div>
            </div>

            <div className="pl-2 space-y-2 mt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Options</p>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <span className="text-gray-400 text-xs">{i + 1}.</span>
                  <input
                    type="text"
                    className="bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none text-sm text-gray-700 dark:text-gray-300 flex-1 py-1"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                  />
                  <button onClick={() => deleteOption(i)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button onClick={addOption} className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">+ Add Option</button>
            </div>
          </div>
        );
      case "FILE_UPLOAD":
        return (
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center bg-gray-50 dark:bg-gray-800/30">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
            </div>
            <p className="text-sm text-gray-500">File upload enabled</p>
          </div>
        );
      default:
        return <div className="text-gray-400 text-sm italic">Block type not supported yet</div>;
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="group/block relative -mx-4 px-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-200">

      {/* Drag Handle (Visual only for now) */}
      <div className="absolute left-0 top-6 opacity-0 group-hover/block:opacity-100 text-gray-300 cursor-grab active:cursor-grabbing transition-opacity">
        <GripVertical size={16} />
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={block.label}
            onChange={(e) => onChange(block.id, { label: e.target.value })}
            className="text-lg font-medium bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 w-full leading-tight"
            placeholder="Type a Question"
            onKeyDown={handleKeyDown}
            style={{ minWidth: '120px' }}
          />
          <span
            ref={spanRef}
            className="invisible absolute whitespace-pre font-medium text-lg"
          >
            {block.label || "Type a Question"}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <input
              type="checkbox"
              checked={block.required}
              onChange={(e) => onChange(block.id, { required: e.target.checked })}
              className="accent-indigo-600 w-3.5 h-3.5"
            />
            Required
          </label>
          {onDelete && (
            <button
              onClick={() => onDelete(block.id)}
              className="text-gray-400 hover:text-red-500 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete block"
            >
              <Trash size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="pl-1">
        {rendererInput()}
      </div>
    </div>
  );
};

export default BlockRenderer;
