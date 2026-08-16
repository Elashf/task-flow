
import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata:Metadata= {
  title:"TaskFlow",
  description:"Modern Task Management App"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         
        <main className="flex-1 p-6">
        {children}
        </main>
        
        <Toaster position="top-center"/>
        </body>
    </html>
  );
}
