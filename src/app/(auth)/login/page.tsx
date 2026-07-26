"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const hanbdleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/login", { email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string }; status?: number };
      };
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 403 && message?.includes("pendente")) {
        toast.error(
          "Sua conta está pendente de aprovação. Aguarde o contato da nossa equipe.",
        );
      } else {
        toast.error(message || "Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md">
        {/* HEADER CONTENT */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">⚡ IronVault</h1>
          <p className="text-slate-400 mt-1 text-sm">Backoffice</p>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={hanbdleLogin} className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm mb-1 block">E-mail</label>
            <input
              type="=email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2.5 border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2.5 border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Link esqueceu a senha */}
          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
