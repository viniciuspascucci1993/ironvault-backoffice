import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TokenRefresher from "@/components/TokenRefresher";

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
      </div>
    </div>
  );
}
