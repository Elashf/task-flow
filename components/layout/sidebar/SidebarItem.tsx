"use client"
import { cn } from '@/lib/utils'
import {  LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


type Props={
  title:string,
  href:string,
  icon:LucideIcon
}

function SidebarItem({title , href, icon:Icon}:Props) {
  const pathname = usePathname()
  const isActive = pathname === href
  console.log(href);
  
  return(
<Link href={href}
 className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" , 
  isActive ? "bg-primary text-primary-foreground"
    : "text-muted-foreground hover:bg-accent hover:text-foreground"
 )}
>
<Icon className="size-5"/>
<span>{title}</span>
</Link>
  )
}

export default SidebarItem