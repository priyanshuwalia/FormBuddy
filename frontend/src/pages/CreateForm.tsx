import { useEffect, useRef, useState } from "react";
import SlashCommand from "../components/formBuilder/SlashCommand";
import { type BlockType, type FormBlock } from "../types/form";
import { v4 as uuid } from "uuid";
import { Badge, File, Palette } from "lucide-react";
import Sidebar from "../components/Sidebar";
import BlockRenderer from "../components/formBuilder/BlockRenderer";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";


const blockOptions: { label: string; type: BlockType }[] = [
  { label: "Short Answer", type: "SHORT_ANS" },
  { label: "Long Answer", type: "LONG_ANS" },
  { label: "Email", type: "EMAIL" },
  { label: "Number", type: "NUM" },
  { label: "Checkboxes", type: "CHECKBOXES" },
  { label: "Multiple Choice", type: "MULT_CHOICE" },
  { label: "Dropdown", type: "DROPDOWN" },
  { label: "Phone Number", type: "PHONE_NUM" },
  { label: "Link", type: "LINK" },
  { label: "File Upload", type: "FILE_UPLOAD" },
  { label: "Date", type: "DATE" },
  { label: "Rating", type: "RATING" },
];

const presetColors: string[] = [
  "#6E829B", "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#D27C2C", "#845EC2", "#2C3E50"
];

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: User } = useAuth();
  const [formTitle, setFormTitle] = useState<string>("");
  const [inputBlocks, setInputBlocks] = useState<FormBlock[]>([]);
  const [showSlashCommand, setShowSlashCommand] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [coverColor, setCoverColor] = useState<string>("#6E829B");
  const [hoveringCover, setHoveringCover] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  // Load template from navigation state
  useEffect(() => {
    if (location.state && location.state.blocks) {
      // Regenerate IDs to avoid conflicts if needed, but uuid is handled in UserHome
      setInputBlocks(location.state.blocks);
    }
  }, [location.state]);

  const filteredOptions = blockOptions.filter((option) =>
    option.label.toLowerCase().includes(activeQuery.toLowerCase())
  );

  const activeBlock = inputBlocks.find(
    (block) => block.value?.startsWith("/") && showSlashCommand
  );

  const publishForm = async () => {
    if (formTitle.trim() === "") return;
    if (!User) {
      alert("You must be logged in to publish a form.");
      return;
    }
    console.log('Publish was clicked');

    const payload = {
      title: formTitle,
      description: "",
      //@ts-ignore
      userId: User?.id,
    };

    try {
      console.log("Sending form creation payload:", payload);
      const formRes = await API.post("/forms", payload);
      const form = formRes.data;
      console.log("Form created:", form);
      const cleanedBlocks = inputBlocks.map((block) => ({
        // omit id to let backend generate it
        type: block.type,
        label: block.label,
        required: block.required,
        placeholder: block.placeholder,
        options: block.options,
        order: block.order,
        formId: form.id,
      }));

      if (cleanedBlocks.length > 0) {
        console.log("Sending form blocks:", cleanedBlocks);
        await Promise.all(
          cleanedBlocks.map((block) => API.post("/form-blocks", block))
        );
      }

      if (form.slug) {
        navigate(`/forms/${form.slug}/published`);
      } else {
        console.log("No slug found");
        alert("Form created, but could not get the shareable link.");
      }
    } catch (error: any) {
      console.log("Error publishing form:", error);
      alert(`Failed to publish form: ${error.response?.data?.details || error.message || "Unknown error"}`);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newBlock: FormBlock = {
        id: uuid(),
        label: "",
        value: "",
        required: false,
        order: inputBlocks.length,
      };
      setInputBlocks((prev) => [...prev, newBlock]);
      setTimeout(() => {
        inputRefs.current[newBlock.id]?.focus();
      }, 0);
    }
  };

  const handleBlockKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    const block = inputBlocks[index];
    const isSlashActive = block.value?.startsWith("/") && showSlashCommand;

    if (isSlashActive) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev + 1) % filteredOptions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredOptions[selectedIdx];
        if (selected) {
          handleSelectBlock(block.id, selected.type);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowSlashCommand(false);
        return;
      }
    }

    const isDivider = block.value.trim() === "---";
    if ((e.key === "Enter" || e.key === " ") && isDivider) {
      e.preventDefault();
      const updated = [...inputBlocks];
      updated[index] = {
        id: block.id, type: "DIVIDER", label: "", value: "", required: false, order: inputBlocks.length,
      };
      const newBlock: FormBlock = {
        id: uuid(), label: "", value: "", required: false, order: inputBlocks.length,
      };
      updated.splice(index + 1, 0, newBlock);
      setInputBlocks(updated);
      setTimeout(() => {
        inputRefs.current[newBlock.id]?.focus();
      }, 0);
      return;
    }

    const isH3 = block.value.trim() === "###";
    if ((e.key === "Enter" || e.key === " ") && isH3) {
      e.preventDefault();
      const updated = [...inputBlocks];
      updated[index] = {
        id: block.id, type: "H3", label: "", value: "", required: false, order: inputBlocks.length,
      };
      const newBlock: FormBlock = {
        id: uuid(), label: "", value: "", required: false, order: inputBlocks.length,
      };
      updated.splice(index + 1, 0, newBlock);
      setInputBlocks(updated);
      setTimeout(() => {
        inputRefs.current[newBlock.id]?.focus();
      }, 0);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const newBlock: FormBlock = {
        id: uuid(), label: "", value: "", required: false, order: inputBlocks.length,
      };
      const updated = [...inputBlocks];
      updated.splice(index + 1, 0, newBlock);
      setInputBlocks(updated);
      setTimeout(() => {
        inputRefs.current[newBlock.id]?.focus();
      }, 0);
      return;
    }

    if (e.key === "Backspace" && block.value === "") {
      e.preventDefault();
      const updated = [...inputBlocks];
      updated.splice(index, 1);
      setInputBlocks(updated);
      setTimeout(() => {
        if (updated.length === 0) {
          titleInputRef.current?.focus();
        } else {
          const prevBlock = updated[index - 1];
          if (prevBlock) inputRefs.current[prevBlock.id]?.focus();
        }
      }, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value;
    const updated = [...inputBlocks];
    updated[index].value = value;
    setInputBlocks(updated);

    if (value.startsWith("/")) {
      setShowSlashCommand(true);
      setActiveQuery(value.slice(1));
    } else {
      setShowSlashCommand(false);
    }
  };

  const handleCreateBlock = (index: number): void => {
    const newBlock: FormBlock = {
      id: uuid(), label: "", value: "", required: false, order: inputBlocks.length,
    };
    const updated = [...inputBlocks];
    updated.splice(index + 1, 0, newBlock);
    setInputBlocks(updated);
    setTimeout(() => {
      inputRefs.current[newBlock.id]?.focus();
    }, 0);
  };

  const handleSelectBlock = (blockId: string, type: BlockType): void => {
    const updated = [...inputBlocks];
    const blockIndex = updated.findIndex((block) => block.id === blockId);
    if (blockIndex !== -1) {
      updated[blockIndex] = {
        ...updated[blockIndex], type, label: "", value: "", required: false, order: inputBlocks.length,
      };
      setInputBlocks(updated);
      setShowSlashCommand(false);
    }
  };

  const handleBlockUpdate = (id: string, updatedData: Partial<FormBlock>): void => {
    setInputBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updatedData } : block))
    );
  };

  const handleBlockDelete = (id: string): void => {
    setInputBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  return (
    // FIX: Use flexbox for the main layout to correctly position the sidebar and content.
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-950 font-inter transition-colors duration-300">
      <Sidebar />

      {/* FIX: This wrapper takes up the remaining space and allows its content to scroll. */}
      <div className="flex-1 overflow-y-auto">
        {/* Cover Image */}
        <div
          className="relative h-48 transition-colors duration-300"
          style={{ backgroundColor: coverColor }}
          onMouseEnter={() => setHoveringCover(true)}
          onMouseLeave={() => {
            setHoveringCover(false);
            setShowColorPicker(false);
          }}
        >
          {formTitle.trim() !== "" ? (
            <button onClick={publishForm} className="bg-[#0668bd] absolute z-10 text-white py-2 px-4 rounded-xl font-semibold hover:bg-[#005BAB] transition top-4 right-4 shadow-sm">
              Publish
            </button>
          ) : ""}

          {hoveringCover && (
            <div className="absolute bottom-2 right-3 flex gap-2 bg-white/70 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 backdrop-blur-md p-1.5 rounded-xl shadow-md z-10 transition">
              <button
                onClick={() => setShowColorPicker((prev) => !prev)}
                className="p-1 rounded flex items-center gap-1 text-sm text-gray-800 dark:text-white"
              >
                <Palette size={18} />
                <span className="font-medium">Change cover</span>
              </button>
            </div>
          )}

          {showColorPicker && (
            <div className="absolute bottom-14 right-3 flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-20">
              {presetColors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {/* FIX: Positioned relative to anchor the Badge. Negative margin pulls it up over the cover. */}
        <div className="relative max-w-3xl mx-auto px-12 -mt-12">
          {/* FIX: The Badge is positioned relative to this container now, not the whole page. */}
          <div className="z-20">
            <Badge size={96} className="rounded-full bg-black dark:bg-white text-white dark:text-black p-4 shadow-xl" />
          </div>

          <main className="pb-16">
            {/* Title */}
            {/* FIX: Added top margin to push it below the badge. bg-transparent makes it seamless. */}
            <input
              type="text"
              placeholder="Form title"
              value={formTitle}
              ref={titleInputRef}
              onChange={(e) => setFormTitle(e.target.value)}
              onKeyDown={handleTitleKeyDown}
              className="text-4xl font-extrabold w-full focus:outline-none bg-transparent text-[#37352f] dark:text-gray-50 placeholder-gray-300 dark:placeholder-gray-600 mt-4 transition-colors"
            />

            {/* Blocks */}
            <div className="mt-10 space-y-6">
              {inputBlocks.map((block, idx) => (
                <div key={block.id} className="relative group">
                  {block.type ? (
                    <BlockRenderer
                      block={block}
                      onEnter={() => handleCreateBlock(idx)}
                      onChange={handleBlockUpdate}
                      onDelete={handleBlockDelete}
                    />
                  ) : (
                    <input
                      //@ts-ignore
                      ref={(el) => (inputRefs.current[block.id] = el)}
                      value={block.value}
                      onChange={(e) => handleInputChange(e, idx)}
                      onKeyDown={(e) => handleBlockKeyDown(e, idx)}
                      placeholder="Type '/' to insert blocks"
                      className="w-full p-2 rounded-md text-lg focus:outline-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors"
                    />
                  )}

                  {/* Slash Command Popup */}
                  {showSlashCommand &&
                    block.value?.startsWith("/") &&
                    activeBlock?.id === block.id && (
                      <div className="absolute top-full mt-1 left-0 w-full z-30">
                        <SlashCommand
                          blockId={block.id}
                          query={activeQuery}
                          onSelect={handleSelectBlock}
                          onClose={() => setShowSlashCommand(false)}
                          selectedIdx={selectedIdx}
                          setSelectedIdx={setSelectedIdx}
                          filteredOptions={filteredOptions}
                        />
                      </div>
                    )}
                </div>
              ))}

              {/* Empty State */}
              {inputBlocks.length === 0 ? (
                <div
                  onClick={() => {
                    const newBlock: FormBlock = { id: uuid(), label: "", value: "", required: false, order: 0 };
                    setInputBlocks([newBlock]);
                    setTimeout(() => inputRefs.current[newBlock.id]?.focus(), 0);
                  }}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-16 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-2xl max-w-fit py-2 px-3 cursor-pointer transition"
                >
                  <File size={20} />
                  <span>Press Enter to start from scratch</span>
                </div>
              ) : (
                <div className="pt-6">
                  <button onClick={publishForm} className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-xl font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;