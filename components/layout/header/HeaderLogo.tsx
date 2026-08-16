import { Kanban } from 'lucide-react'
import Link from 'next/link'


function HeaderLogo() {
  return (
   <Link href="/" className='inline-flex items-center gap-2 font-semibold text-lg tracking-tight select-none text-primary'>
    <Kanban className='size-5'/>
  <span className='hidden sm:block'>TaskFlow</span>
</Link>
  )
}

export default HeaderLogo