import HeaderActions from "./HeaderActions"
import HeaderLogo from "./HeaderLogo"
import HeaderMobileMenu from "./HeaderMobileMenu"
import HeaderSearch from "./HeaderSearch"


function Header() {
  return (
    <header className='w-full h-20 sticky top-0 z-50 border-b bg-background'>
<div className='h-full flex justify-between items-center px-6'>
  <HeaderMobileMenu/>
<HeaderLogo />
<div className='flex-1 flex justify-center'>
<HeaderSearch />
</div>
<div>
  <HeaderActions />
</div>
</div>
    </header>
  )
}

export default Header