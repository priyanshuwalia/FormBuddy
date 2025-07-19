interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  collapsed?: boolean
}





const SidebarItem = ({ icon, label, to, collapsed }: SidebarItemProps) => {
  return (
    <a href={to} className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded px-3 py-2 text-sm">
      {icon}
      {!collapsed && <span>{label}</span>}
    </a>
  )
}

export default SidebarItem
