import { useEffect, useRef } from "react";
import { type BlockType } from "../../types/form";



interface SlashCommandProps {
  blockId: string;
  query: string;
  onSelect: (blockId: string, type: BlockType) => void;
  onClose: () => void;
  selectedIdx: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
  filteredOptions: { label: string; type: BlockType }[];
}

export default function SlashCommand({
  blockId,

  onSelect,
  onClose,
  selectedIdx,

  filteredOptions,
}: SlashCommandProps) {
  const menuRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="w-full h-full bg-transparent"
    >
      <ul className="max-h-64 overflow-y-auto py-2">
        <li className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Basic Blocks
        </li>
        {filteredOptions.map((option, idx) => (
          <li
            key={option.type}
            onClick={() => onSelect(blockId, option.type)}
            className={`px-3 py-2 mx-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm transition-colors ${idx === selectedIdx
                ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {option.label}
          </li>
        ))}
        {filteredOptions.length === 0 && (
          <li className="p-3 text-sm text-gray-400 text-center">No blocks found</li>
        )}
      </ul>
    </div>
  );
}
