import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import SidebarWorkspace from "./SidebarWorkspace";

function Sidebar() {
  return (
    <aside className="  w-64 h-[calc(100vh-80px)] flex sticky top-20 flex-col border-r bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <SidebarNav />
        <SidebarWorkspace />
      </div>

      <div className="border-t p-4">
        <SidebarFooter />
      </div>
    </aside>
  );
}

export default Sidebar;