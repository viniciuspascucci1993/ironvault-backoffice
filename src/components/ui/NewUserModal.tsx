"use client";

import { X } from "lucide-react";
import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";

interface NewUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewUserModal({
  onClose,
  onSuccess,
}: NewUserModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MERCHANT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/register", { email, role });
      toast.success(
        "Usuário criado! Confira seu e-mail para definir sua senha.",
      );
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Erro ao criar usuário");
      setError(error.response?.data?.message || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-medium text-lg">Novo Usuário</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2.5 border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="usuario@email.com"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2.5 border border-slate-600 focus:outline-none focus:border-indigo-500"
            >
              <option value="MERCHANT">Merchant</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}
