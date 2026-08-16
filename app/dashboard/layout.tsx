
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <>
        <Header />
        <div className="flex">
          <div className="hidden md:block">
          <Sidebar />
          </div>
       
        <main className="flex-1 p-6">
        {children}
        </main>
        </div>
        </>
    
  );
}
