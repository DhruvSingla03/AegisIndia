import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            {children}
            <Toaster position="top-center" theme="light" className="bg-slate-800"/>
        </div>
    );
  }