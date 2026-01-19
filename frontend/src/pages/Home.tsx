
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  TerminalSquare,
  BarChart3,
  Palette,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Clock,
  Activity,
  Moon,
  Sun,
  LogOut,
  Type,
  Heading1,
  List,
  GripVertical,
  Webhook,
  Share2,
  ShieldCheck,
  Globe
} from "lucide-react";
import thoughtfulGirl from "../assets/open-doodles-reading-side.gif";
import Logo from "../components/Logo";

export default function Home() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  // State for dynamic theme selector
  const [activeTheme, setActiveTheme] = useState("#8b5cf6"); // Default purple
  const [chartHeights, setChartHeights] = useState([40, 70, 45, 90, 60]);
  const [totalResponses, setTotalResponses] = useState(1284);
  const [growthRate, setGrowthRate] = useState(12);
  const [conversionRate, setConversionRate] = useState(42.8);
  const [avgTime, setAvgTime] = useState(84); // seconds
  const [activeForms, setActiveForms] = useState(8);
  const insightsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Slash Command Demo State
  const [demoInput, setDemoInput] = useState("");
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [demoHighlight, setDemoHighlight] = useState(0);
  const [demoBlocks, setDemoBlocks] = useState<{ type: string, text: string }[]>([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runAnimation = async () => {
      // 1. Reset
      await new Promise(r => timeout = setTimeout(r, 1000));
      setDemoInput("/");
      setShowDemoMenu(true);

      // 2. Select Heading
      await new Promise(r => timeout = setTimeout(r, 800));
      setDemoHighlight(1); // Heading

      await new Promise(r => timeout = setTimeout(r, 600));
      setShowDemoMenu(false);
      setDemoInput("");
      setDemoBlocks([{ type: "Heading 1", text: "Welcome to FormBuddy" }]);

      // 3. Type text
      await new Promise(r => timeout = setTimeout(r, 800));
      setDemoInput("/");
      setShowDemoMenu(true);
      setDemoHighlight(0); // Text (default)

      await new Promise(r => timeout = setTimeout(r, 800));
      setShowDemoMenu(false);
      setDemoInput("");
      setDemoBlocks(prev => [...prev, { type: "Text", text: "Please fill out the details below." }]);

      // 4. Clear after delay
      await new Promise(r => timeout = setTimeout(r, 3000));
      setDemoBlocks([]);
      setDemoHighlight(0);

      // Loop
      runAnimation();
    };

    runAnimation();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (insightsRef.current) {
      observer.observe(insightsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartHeights(prev => prev.map(() => Math.floor(Math.random() * 60) + 30));
      setTotalResponses(prev => prev + Math.floor(Math.random() * 10) + 2);
      setGrowthRate(prev => Math.floor(Math.random() * 10) + 10);
      setConversionRate(prev => 40 + Math.random() * 5);
      setAvgTime(prev => 80 + Math.floor(Math.random() * 10));
      setActiveForms(prev => 8 + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TerminalSquare,
      title: "Slash Commands",
      description: "Just type '/' to insert question blocks instantly. No dragging required."
    },
    {
      icon: Palette,
      title: "Beautiful Themes",
      description: "Customize your form's look with vetted color palettes and cover images."
    },
    {
      icon: BarChart3,
      title: "Real Analytics",
      description: "Track responses and completion rates with simple, honest charts."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Designed for speed. Create and publish forms in under a minute."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-inter selection:bg-indigo-500/20">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">FormBuddy</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-5 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-bold transition-colors text-sm shadow-md"
                  style={{ backgroundColor: "white", color: "#4F46E5" }}
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white font-medium text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-indigo-500/20"
                  style={{ backgroundColor: "#4F46E5", color: "white" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Simple. Powerful. Free.
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
            The one{" "}
            <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">
              Stylish
            </span>{" "}
            yet{" "}
            <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent">
              Simple
            </span>
            <br className="hidden md:block" /> form builder.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
            Create intelligent, conversation-style forms without the clutter.
            Focus on the content, and let FormBuddy handle the experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create-form"
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-2"
            >
              Start Building Now
              <ArrowRight size={20} />
            </Link>
            {!user && (
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* 1. Slash Commands (Large, Dark) */}
            <div className="md:col-span-2 group relative p-8 rounded-3xl bg-gray-900 border border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-indigo-400 mb-4">
                    <TerminalSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Slash Commands</h3>
                  <p className="text-gray-400 max-w-md">Just type <span className="text-indigo-400 font-mono">/</span> to access any block. No menus, no dragging.</p>
                </div>

                {/* Dynamic Demo UI */}
                <div className="w-full h-[320px] bg-gray-950 rounded-xl border border-gray-800 p-6 shadow-xl flex flex-col relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                  {/* Added Blocks */}
                  <div className="space-y-4 mb-4 flex-1">
                    {demoBlocks.map((block, i) => (
                      <div key={i} className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                        {block.type === "Heading 1" ? (
                          <h4 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-3">{block.text}</h4>
                        ) : (
                          <div className="flex items-start gap-3 text-gray-400">
                            <GripVertical size={16} className="mt-1 opacity-50" />
                            <p>{block.text}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Input Line */}
                  <div className="relative">
                    <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
                      <div className="text-gray-500 font-mono text-lg opacity-50">+</div>
                      <div className="text-white font-mono text-lg flex items-center">
                        {demoInput}
                        <span className="w-2 h-5 bg-indigo-500 ml-1 animate-pulse"></span>
                      </div>
                    </div>

                    {/* Slash Menu Popover */}
                    {showDemoMenu && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Basic Blocks</div>
                        <div className="p-1 space-y-0.5">
                          {[
                            { icon: Type, label: "Text", type: "Text" },
                            { icon: Heading1, label: "Heading 1", type: "Heading 1" },
                            { icon: List, label: "Multiple Choice", type: "Multiple Choice" }
                          ].map((opt, idx) => (
                            <div
                              key={idx}
                              className={`px-3 py-2 rounded flex items-center gap-3 text-sm transition-colors ${idx === demoHighlight
                                ? "bg-indigo-500/20 text-indigo-400"
                                : "text-gray-400"
                                }`}
                            >
                              <opt.icon size={16} />
                              {opt.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Real Analytics (Tall, White) */}
            <div className="md:col-span-1 group relative p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-50 dark:from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 w-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <BarChart3 size={24} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Metrics</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real Analytics</h3>

                {/* Extended Chart */}
                <div className="flex items-end justify-between h-48 gap-2 px-1 mt-6">
                  {[40, 70, 45, 90, 60].map((h, i) => (
                    <div key={i} className="w-full h-full bg-emerald-50 dark:bg-emerald-900/20 rounded-t-md relative overflow-hidden group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/40 transition-colors">
                      <div
                        className="absolute bottom-0 w-full bg-emerald-500 rounded-t-md transition-all duration-1000 ease-out"
                        style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                      ></div>
                    </div>
                  ))}
                </div>

                {/* New Stats Summary */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">Views</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">24.5k</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">Growth</p>
                    <div className="flex items-center justify-end gap-1 text-emerald-500">
                      <ArrowUpRight size={16} />
                      <span className="text-lg font-bold">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Themes & Reliable (Stack) + Product Showcase (Tall) */}

            {/* Left Column Stack */}
            <div className="md:col-span-1 flex flex-col gap-4">
              {/* 3. Beautiful Themes */}
              <div className="group relative p-6 rounded-3xl bg-purple-50 dark:bg-gray-900 border border-purple-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10 flex items-center justify-between h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                      <Palette size={20} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">Design</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Themes</h3>
                  </div>

                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform group-hover:-translate-x-1 transition-transform"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg relative z-10 transform group-hover:scale-110 transition-transform"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg transform group-hover:translate-x-1 transition-transform"></div>
                  </div>
                </div>
              </div>

              {/* 4. Reliable (Moved Here) */}
              <div className="group relative p-6 rounded-3xl bg-gray-900 border border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 flex-1">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-gray-900 to-gray-900 opacity-50"></div>

                <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-green-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-500 mb-1">Infrastructure</p>
                      <h3 className="text-lg font-bold text-white">Reliable</h3>
                      <p className="text-gray-400 text-xs">99.99% Uptime.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center relative my-2">
                    <div className="w-20 h-20 rounded-full border border-gray-700 flex items-center justify-center relative">
                      {/* Enhanced Shield Animation */}
                      <div className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                      <div className="absolute inset-0 rounded-full border border-green-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></div>
                      <Globe size={40} className="text-gray-500 group-hover:text-green-500 transition-colors duration-500" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Lightning Fast (Tall Right Column) - Compacted */}
            <div className="md:col-span-2 group relative p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 flex flex-col justify-between">
              <div className="absolute right-0 top-0 w-3/4 h-full bg-gradient-to-l from-orange-50 dark:from-orange-900/10 to-transparent"></div>

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                    <Zap size={24} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">Performance</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>

                </div>

                <div className="md:flex hidden bg-orange-500/10 rounded-full p-1.5 pr-4 items-center gap-2 border border-orange-500/20">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
                    <Activity size={12} className="text-orange-500 relative z-10" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Turbo</span>
                </div>
              </div>

              {/* Speed Metrics Visual */}
              <div className="relative w-full mt-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex items-center justify-between group-hover:border-orange-500/30 transition-colors">
                <div className="flex-1 pr-4 border-r border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Load Time</p>
                  <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white flex items-baseline">
                    0.2<span className="text-sm text-gray-400 ml-1">s</span>
                  </div>
                </div>
                <div className="flex-1 px-4">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Performance</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-full w-[98%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-medium text-green-600">Excellent</span>
                    <span className="text-xs font-mono text-gray-400">98/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Integrations (Span 3 / Full Width) */}
            <div className="md:col-span-3 group relative p-10 rounded-3xl bg-blue-50 dark:bg-gray-900 border border-blue-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Webhook size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Connects with Everything</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mb-12">Send data to Slack, Notion, Google Sheets, or your own API instantly. No code required.</p>

                {/* Animated Web - Horizontal Layout */}
                <div className="relative w-full max-w-3xl h-32 flex items-center justify-center">
                  {/* Lines */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-20 w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-indigo-600 mx-8">
                    <Logo size={40} />
                  </div>

                  {/* Floating Nodes */}
                  {[
                    { icon: Share2, color: "text-blue-500", label: "Webhook", x: "-translate-x-32 md:-translate-x-48" },
                    { icon: List, color: "text-green-500", label: "Sheets", x: "translate-x-32 md:translate-x-48" },
                    { icon: Activity, color: "text-purple-500", label: "Slack", x: "-translate-x-64 md:-translate-x-80 hidden md:flex" },
                    { icon: Globe, color: "text-orange-500", label: "Zapier", x: "translate-x-64 md:translate-x-80 hidden md:flex" },
                  ].map((node, i) => (
                    <div key={i} className={`absolute z-10 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-3 group-hover:scale-110 transition-transform ${node.x}`}>
                      <node.icon size={20} className={node.color} />
                      <span className="font-semibold text-gray-700 dark:text-gray-200">{node.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Overview / Demo Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Designed for <span className="text-indigo-600 dark:text-indigo-400">Flow</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              We removed the clutter found in traditional form builders.
              No dragging complex sidebars. Just type
              <code className="mx-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-indigo-600 font-bold">/</code>
              and start creating.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Standard Short & Long Answers",
                "Rating & Opinion Scales",
                "File Uploads & Dates",
                "Logic Jumps (Coming Soon)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
            <img
              src={thoughtfulGirl}
              alt="Designing interface"
              className="w-full max-w-md mx-auto drop-shadow-2xl dark:invert"
            />
          </div>
        </div>
      </section >

      {/* New Section: Instant Insights */}
      < section ref={insightsRef} className="py-24 px-6 bg-white dark:bg-gray-900/50 overflow-hidden" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold uppercase tracking-wide">
              <BarChart3 size={12} />
              Real-time Data
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Instant <span className="text-green-600 dark:text-green-400">Insights</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Stop guessing. Watch your responses roll in real-time.
              Visualize completion rates, drop-off points, and user trends without setting up complex dashboards.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">1</div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Publish in one click</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">2</div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Share the link anywhere</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">3</div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Analyze results instantly</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            {/* CSS Chart Visual */}
            <div className="relative w-full max-w-md mx-auto aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col justify-between z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-sm text-gray-400">Total Responses</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalResponses.toLocaleString()}</div>
                </div>
                <div className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold mr-12">+{growthRate}%</div>
              </div>

              <div className="flex items-end justify-between h-48 gap-2">
                {chartHeights.map((h, i) => (
                  <div key={i} className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-t-lg relative group overflow-hidden">
                    <div
                      className="absolute bottom-0 left-0 w-full bg-green-500 transition-all duration-700 ease-in-out group-hover:bg-green-400"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-xs text-gray-400 font-mono">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Floating Badge: Conversion Rate */}
            <div className={`absolute -right-4 top-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-1000 z-20 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Conversion Rate</div>
                  <div className="font-bold text-gray-900 dark:text-white">{conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Floating Badge: Avg Time */}
            <div className={`absolute -left-6 bottom-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-1000 z-20 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Avg. Completion</div>
                  <div className="font-bold text-gray-900 dark:text-white">{Math.floor(avgTime / 60)}m {avgTime % 60}s</div>
                </div>
              </div>
            </div>

            {/* Floating Badge: Active Forms */}
            <div className={`absolute -right-2 bottom-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-1000 z-20 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600">
                  <Activity size={16} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Active Forms</div>
                  <div className="font-bold text-gray-900 dark:text-white">{activeForms}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* New Section: Make It Yours */}
      < section className="py-24 px-6 overflow-hidden" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wide">
              <Palette size={12} />
              Customization
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Make it <span className="text-purple-600 dark:text-purple-400">Yours</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Your form, your brand. Choose from our curated collection of themes or define your own colors.
              Backgrounds, accents, and covers—all fully customizable.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#ef4444"].map((color, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTheme(color)}
                  className={`w-12 h-12 rounded-full border-4 shadow-lg hover:scale-110 transition-transform cursor-pointer ${activeTheme === color ? 'border-gray-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-gray-400' : 'border-white dark:border-gray-900'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6 flex flex-col">
              {/* Mock Browser/Form Header */}
              <div
                className="h-64 rounded-xl shadow-inner mb-6 transition-colors duration-500 relative group overflow-hidden"
                style={{ backgroundColor: activeTheme }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-2xl">Project Survey</div>
              </div>
              {/* Mock Input */}
              <div className="h-12 w-full bg-white dark:bg-black rounded-lg border border-transparent shadow-sm px-4 flex items-center text-gray-400 text-sm">
                Type your answer here...
              </div>
            </div>
            {/* Floating Palette Tool */}
            <div className="absolute -left-8 -bottom-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="grid grid-cols-2 gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500"></div>
                <div className="w-8 h-8 rounded-lg bg-pink-500"></div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500"></div>
                <div className="w-8 h-8 rounded-lg bg-orange-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="py-20 px-6" >
        <div className="max-w-4xl mx-auto text-center bg-indigo-600 rounded-[2.5rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl" style={{ backgroundColor: "#4F46E5" }}>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to create?</h2>
            <p className="text-indigo-100 text-lg font-medium mb-8 max-w-xl mx-auto">
              Join without a credit card. Start collecting responses in minutes.
            </p>
            <Link
              to="/create-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-xl"
              style={{ color: "#4F46E5" }}
            >
              Create a Form
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
      </section >

      {/* Footer */}
      < footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black" >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span className="font-semibold text-gray-900 dark:text-white">FormBuddy</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Created by</span>
            <a
              href="https://github.com/priyanshuwalia/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-gray-900 dark:text-gray-300"
            >
              Priyanshu Walia
            </a>
          </div>
        </div>
      </footer >
    </div >
  );
}
