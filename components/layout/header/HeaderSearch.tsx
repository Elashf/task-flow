import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'


function HeaderSearch() {
  return (
    <div className='relative'>
        <Input className='pl-10'
        placeholder='search'
        />
        <Search className='size-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none' />
       <kbd className='absolute right-3 top-1/2 -translate-y-1/2
hidden md:flex
items-center
rounded-md
border
bg-muted
px-2
py-1
text-xs
text-muted-foreground
"'>ctrl k</kbd> 
    </div>
    
  )
}

export default HeaderSearch