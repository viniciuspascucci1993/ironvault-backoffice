import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TokenRefresher from "@/components/TokenRefresher";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <TokenRefresher />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
            },
          }}
        />
      </div>
    </div>
  );
}
