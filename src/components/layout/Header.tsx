"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transactions": "Transações",
  "/users": "Usuários",
};

export default function Header() {
  const pathName = usePathname();
  const title = pageTitles[pathName] || "IronVault";

  return (
    <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-6">
      <h2 className="text-white font-medium">{title}</h2>
    </header>
  );
}
