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


function HeaderDropdown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger >
            <HeaderAvatar/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
            <DropdownMenuLabel>
               <HeaderUserInfo/>
            </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderDropdown;
