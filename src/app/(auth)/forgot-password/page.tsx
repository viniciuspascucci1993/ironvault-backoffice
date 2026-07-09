"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success('Email enviado com sucesso! Verifique sua caixa de entrada.')
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Erro ao enviar email')
      setError(error.response?.data?.message || "Erro ao enviar email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">⚡ IronVault</h1>
          <p className="text-slate-400 mt-1 text-sm">Recuperar senha</p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <p className="text-emerald-400">Email enviado com sucesso!</p>
            <p className="text-slate-400 text-sm">
              Verifique sua caixa de entrada e siga as instruções.
            </p>
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
            >
              Voltar para o login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm mb-1 block">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2.5 border border-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar email de recuperação"}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Voltar para o login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
