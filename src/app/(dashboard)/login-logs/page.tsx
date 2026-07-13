import { getServerApi } from "@/lib/serverApi";
import { LoginLog } from "@/types";

export default async function LoginLogPage() {
  const api = await getServerApi();
  const res = await api.get<LoginLog[]>("/api/users/login-logs");
  const logs = res.data;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
              Email
            </th>
            <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
              IP
            </th>
            <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
              Status
            </th>
            <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
              Motivo
            </th>
            <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
              Data/Hora
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
            >
              <td className="px-6 py-4 text-slate-300 text-sm">{log.email}</td>
              <td className="px-6 py-4 text-slate-300 text-sm font-mono">
                {log.ip}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    log.success
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {log.success ? "Sucesso" : "Falha"}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-400 text-sm">
                {log.failureReason || "-"}
              </td>
              <td className="px-6 py-4 text-slate-400 text-sm">
                {new Date(log.createdAt).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
