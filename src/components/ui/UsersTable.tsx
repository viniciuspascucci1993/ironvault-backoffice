'use client'

import { useState } from 'react'
import { User } from '@/types'
import { UserPlus } from 'lucide-react'
import NewUserModal from '@/components/ui/NewUserModal'

interface UsersTableProps {
  users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
  const [showModal, setShowModal] = useState(false)

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
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Email</th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Role</th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Email Confirmado</th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 text-slate-300 text-sm">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {user.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.emailConfirmed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.emailConfirmed ? 'Confirmado' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
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
  )
}