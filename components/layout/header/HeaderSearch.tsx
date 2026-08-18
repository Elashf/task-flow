"use client"
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'


function HeaderSearch() {
  const [search , setSearch] = useState("")
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className='relative'>
        <Input
        value={search}
        onChange={(e)=>{setSearch(e.target.value) 
          router.push(`${pathname}?search=${encodeURIComponent(e.target.value)}`)}
        }
        className='pl-10'
        placeholder='search'
        />
        <Search className='size-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none' />
    
    </div>
    
  )
}

export default HeaderSearch