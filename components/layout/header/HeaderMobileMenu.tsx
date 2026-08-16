import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "../sidebar/Sidebar";

function HeaderMobileMenu() {
  return (
  <Sheet>
  <SheetTrigger>
   <span className=" md:hidden">
      <Menu className="size-5" />
    </span>
  </SheetTrigger>

  <SheetContent side="left" className="w-64 p-0">
    <Sidebar/>
  </SheetContent>
</Sheet>
  )
}

export default HeaderMobileMenu

