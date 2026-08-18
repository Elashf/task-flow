"use client"
import { FolderKanban, House, SquareCheckBig } from 'lucide-react'
import SidebarItem from './SidebarItem'



  const navigation = [
    {
      title: "Dashboard",
    href: "/dashboard",
    icon: House,
    },
    {
      title: "Boards",
    href: "/dashboard/boards",
    icon: FolderKanban,
    },
    {
      title: "My Tasks",
    href: "/dashboard/tasks",
    icon: SquareCheckBig,
    },
   
  ]
function SidebarNav() {

  return (
   <nav className="space-y-1">
    {navigation.map((item)=>(
      <SidebarItem 
      key={item.href}
      title={item.title}
      href={item.href}
      icon={item.icon}
      />
    ))}
   </nav>
  )
}

export default SidebarNav