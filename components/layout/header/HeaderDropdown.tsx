import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderAvatar from "./HeaderAvatar";
import HeaderUserInfo from "./HeaderDropdown/HeaderUserInfo";
import { getCurrentUser } from "@/lib/auth";


async function HeaderDropdown() {
  const user= await getCurrentUser()
  if(!user) return null
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger >
            <HeaderAvatar/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
            <DropdownMenuLabel>
               <HeaderUserInfo name={user.name} email={user.email}/>
            </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderDropdown;
