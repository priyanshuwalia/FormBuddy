import logo from "/logo1.svg"
import {
  BarChart,
  List,
  Settings,
  Home,

  Plus,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  LifeBuoy,
  HelpCircle,
  MessageCircle,
  User as UserIcon,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react"
import SidebarItem from "./SidebarItem"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(false);
  const { user: User, logout } = useAuth()
  const { theme, toggleTheme } = useTheme();
  const location = useLocation()
  const navigate = useNavigate()

  
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between transition-all duration-300
          ${collapsed ? "lg:w-16" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {}
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            {(!collapsed || mobileOpen) && (
              <div className="flex items-center gap-3 pl-2 lg:pl-0">
                <img src={logo} alt="logo" className="w-6 h-6" />
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">FormBuddy</div>
              </div>
            )}

            {}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-gray-600 dark:text-gray-400 ml-2.5 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <X size={20} />
            </button>
          </div>

          {}
          <nav className="space-y-4">
            <SidebarItem icon={<Home />} label="Home" to="/home" collapsed={collapsed && !mobileOpen} active={location.pathname === "/home"} />
            <SidebarItem icon={<List />} label="All Forms" to="/forms" collapsed={collapsed && !mobileOpen} active={location.pathname === "/forms"} />
            <SidebarItem icon={<BarChart />} label="Analytics" to="/analytics" collapsed={collapsed && !mobileOpen} active={location.pathname === "/analytics"} />
            <SidebarItem icon={<Settings />} label="Settings" to="/settings" collapsed={collapsed && !mobileOpen} active={location.pathname === "/settings"} />

            {}
            <div className={`${(collapsed && !mobileOpen) ? "hidden" : "block"} mt-4`}>
              <div className="text-sm mb-3 text-gray-600 dark:text-gray-400 font-normal px-2">Workspaces</div>
              <div
                className="flex items-center text-gray-700 dark:text-gray-300 gap-2 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <ChevronRight className="text-gray-500 dark:text-gray-400" size={18} />
                <span className="truncate">My Workspace</span>
                {hovered && <Plus size={18} className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 ml-auto" />}
              </div>
            </div>
          </nav>
        </div>

        {}
        <div>
          {}
          {(!collapsed || mobileOpen) && (
            <div className="p-3 space-y-2 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-800">
              {}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer text-left"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <div className="text-gray-600 dark:text-gray-400 mb-1 px-2 mt-4">Help</div>
              <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                <BookOpen size={16} /> Get started
              </div>
              <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                <LifeBuoy size={16} /> How-to guides
              </div>
              <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                <HelpCircle size={16} /> Help center
              </div>
              <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                <MessageCircle size={16} /> Contact support
              </div>
            </div>
          )}

          {}
          {(!collapsed || mobileOpen) && (
            <div className="p-4 border-t border-gray-300 dark:border-gray-800 flex items-center gap-3">
              <UserIcon size={24} className="text-indigo-600 dark:text-indigo-400" />
              <div className="text-sm overflow-hidden text-gray-900 dark:text-white">
                <div className="font-medium truncate">{User?.email}</div>
                <button onClick={handleLogout} className="text-xs text-gray-500 dark:text-gray-400 hover:underline">Logout</button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
