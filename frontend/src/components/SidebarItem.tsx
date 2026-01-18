interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  collapsed?: boolean
  active?: boolean
}

const SidebarItem = ({ icon, label, to, collapsed, active }: SidebarItemProps) => {
  return (
    <a href={to} className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${active ? "bg-indigo-50 text-indigo-600 font-medium" : "text-white-700 hover:bg-gray-100 text-gray-800"}`}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </a>
  )
}

export default SidebarItem
