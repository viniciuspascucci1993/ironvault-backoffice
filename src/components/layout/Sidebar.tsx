"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  LogOut,
  User,
  ScrollText,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const allNavItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "MERCHANT"],
  },
  {
    href: "/transactions",
    label: "Transações",
    icon: CreditCard,
    roles: ["ADMIN", "MERCHANT"],
  },
  { href: "/users", label: "Usuários", icon: Users, roles: ["ADMIN"] },
  {
    href: "/login-logs",
    label: "Logs de Login",
    icon: ScrollText,
    roles: ["ADMIN"],
  },
    {
    href: "/settings",
    label: "Configurações",
    icon: Settings,
    roles: ["ADMIN", "MERCHANT"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const getRole = async () => {
      const cookieRole = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userRole="))
        ?.split("=")[1];
      setRole(cookieRole || "");
    };
    void getRole();
  }, []);

  const navItems = allNavItems.filter((item) => item.roles.includes(role));

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="w-56 bg-slate-800 flex flex-col border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-white font-bold text-lg">⚡ IronVault</h1>
        <p className="text-slate-400 text-xs mt-0.5">Backoffice</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-colors w-full"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
}
