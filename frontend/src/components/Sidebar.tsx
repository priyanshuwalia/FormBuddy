import logo from "/logo1.svg"
import {
  BarChart,
  List,
  Home,
  Settings,


  Plus,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  LifeBuoy,
  HelpCircle,
  MessageCircle,
  User as UserIcon,
} from "lucide-react"
import SidebarItem from "./SidebarItem"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState(false);
  const { user: User } = useAuth()

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"
        } transition-all duration-200 h-screen bg-white border-r rounded-md border-gray-200 flex flex-col justify-between sticky left-0 top-0 z-50`}
    >
      {/* Top toggle + logo */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="w-6 h-6" />
              <div className="text-2xl font-bold text-indigo-600">FormBuddy</div>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600 ml-2.5 hover:text-indigo-600">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-4">
          <SidebarItem icon={<Home />} label="Home" to="/home" collapsed={collapsed} />
          <SidebarItem icon={<List />} label="All Forms" to="/forms" collapsed={collapsed} />
          <SidebarItem icon={<BarChart />} label="Analytics" to="/analytics" collapsed={collapsed} />
          <SidebarItem icon={<Settings />} label="Settings" to="/settings" collapsed={collapsed} />

          {/* Workspaces */}
          <div className={`${collapsed ? "hidden" : "block"} mt-4`}>
            <div className="text-sm mb-3 text-gray-600 font-normal">Workspaces</div>
            <div className="flex items-center text-gray-700 gap-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}><ChevronRight color="gray" size={18} /> My Workspace {hovered && <Plus size={22} className="text-gray-500 hover:text-indigo-500 pl-2 items-center " />} </div>



          </div>
        </nav>
      </div>

      {/* Help */}
      {!collapsed && (
        <div className="p-3 space-y-2 text-sm text-gray-700 border-t border-gray-300">
          <div className="text-gray-600 mb-1">Help</div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <BookOpen size={16} /> Get started
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <LifeBuoy size={16} /> How-to guides
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <HelpCircle size={16} /> Help center
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MessageCircle size={16} /> Contact support
          </div>
        </div>
      )}

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-300 flex items-center gap-3">
          <UserIcon size={24} className="text-indigo-600" />
          <div className="text-sm">
            <div className="font-medium">{User?.email}</div>
            <button className="text-xs text-gray-500 hover:underline">Logout</button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
