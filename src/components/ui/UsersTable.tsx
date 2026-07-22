"use client";

import { useState } from "react";
import { User } from "@/types";
import { UserPlus, Check, X } from "lucide-react";
import NewUserModal from "@/components/ui/NewUserModal";
import axios from "axios";
import toast from "react-hot-toast";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoading(id);
    try {
      await axios.patch(`/api/users/${id}/approve`);
      setUsers(
        users.map((u) =>
          u.id === id ? { ...u, approvalStatus: "APPROVED", active: true } : u,
        ),
      );
      toast.success("Usuário Aprovado");
    } catch {
      toast.error("Erro ao aprovar usuario");
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setLoading(id);
    try {
      await axios.patch(`/api/users/${id}/reject`);
      setUsers(
        users.map((u) =>
          u.id === id ? { ...u, approvalStatus: "REJECTED", active: true } : u,
        ),
      );
      toast.success("Usuário rejeitado");
    } catch {
      toast.error("Erro ao rejeitar usuario");
    } finally {
      setLoading(null);
    }
  };

  const approvalColors = {
    APPROVED: "bg-emerald-500/20 text-emerald-400",
    PENDING: "bg-yellow-500/20 text-yellow-400",
    REJECTED: "bg-red-500/20 text-red-400",
  };

  const approvalLabels = {
    APPROVED: "Aprovado",
    PENDING: "Pendente",
    REJECTED: "Rejeitado",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <UserPlus size={16} />
          Novo Usuário
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Email
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Role
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Status
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Criado em
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Aprovação
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4 text-slate-300 text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.active
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${approvalColors[user.approvalStatus]}`}
                  >
                    {approvalLabels[user.approvalStatus]}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.approvalStatus === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(user.id)}
                        disabled={loading === user.id}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        title="Aprovar"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        disabled={loading === user.id}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        title="Rejeitar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <NewUserModal
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
