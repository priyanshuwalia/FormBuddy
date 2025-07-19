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
  query,
  onSelect,
  onClose,
  selectedIdx,
  setSelectedIdx,
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
      
      className="rounded-md bg-white shadow-md max-w-sm mt-2 w-48 z-10 absolute focus:outline-none"
    >
      <ul className="text-sm max-h-64 overflow-y-auto">
        {filteredOptions.map((option, idx) => (
          <li
            key={option.type}
            onClick={() => onSelect(blockId, option.type)}
            className={`p-3 cursor-pointer ${
              idx === selectedIdx
                ? "bg-blue-100 text-blue-800"
                : "hover:bg-gray-100"
            }`}
          >
            {option.label}
          </li>
        ))}
        {filteredOptions.length === 0 && (
          <li className="p-3 text-gray-400">No block types found.</li>
        )}
      </ul>
    </div>
  );
}
