import ApiKeyManager from '@/components/ui/ApiKeyManager'
import { getServerApi, getTokenPayload } from '@/lib/serverApi'
import { Shield, User, Mail, Calendar, Key } from 'lucide-react'

export default async function SettingPage() {
  const payload = await getTokenPayload()
  const api = await getServerApi()

  let currentApiKey = ''
  try {
    const res = await api.get('/api/keys')
    currentApiKey = res.data.apiKey || ''
  } catch {
    currentApiKey = ''
  }
return (
    <div className="space-y-6">

      {/* Informações da conta */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-white font-medium text-lg mb-6 flex items-center gap-2">
          <User size={18} className="text-indigo-400" />
          Informações da Conta
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-slate-400" />
              <span className="text-slate-400 text-sm">Email</span>
            </div>
            <span className="text-white text-sm">{payload?.sub || '-'}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-slate-400" />
              <span className="text-slate-400 text-sm">Perfil</span>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              payload?.role === 'ADMIN'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {payload?.role || '-'}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-slate-400 text-sm">ID do usuário</span>
            </div>
            <span className="text-slate-400 text-sm font-mono">{payload?.userId || '-'}</span>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-white font-medium text-lg mb-6 flex items-center gap-2">
          <Shield size={18} className="text-indigo-400" />
          Segurança
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">Senha</p>
            <p className="text-slate-400 text-xs mt-1">Altere sua senha de acesso</p>
          </div>
          <a
            href="/profile"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Alterar senha
          </a>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
          <Key size={18} className="text-indigo-400" />
          API Key
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Use esta chave para integrar o IronVault ao seu e-commerce
        </p>
        <ApiKeyManager initialKey={currentApiKey} />
      </div>
    </div>
  )
}