interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  collapsed?: boolean
  active?: boolean
}

const SidebarItem = ({ icon, label, to, collapsed, active }: SidebarItemProps) => {
  return (
    <a href={to} className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${active ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-medium" : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </a>
  )
}

export default SidebarItem
