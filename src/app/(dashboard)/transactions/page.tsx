import { getServerApi } from "@/lib/serverApi";
import { Payment, PageResult } from "@/types";

const statusColors: Record<string, string> = {
  APPROVED: "bg-emerald-500/20 text-emerald-400",
  PROCESSING: "bg-yellow-500/20 text-yellow-400",
  FAILED: "bg-red-500/20 text-red-400",
};

export default async function TransactionsPage() {
  const api = await getServerApi();
  const res = await api.get<PageResult<Payment>>(
    "/api/payments?page=0&size=10",
  );
  const data = res.data;

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                ID
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Email
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Valor
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Status
              </th>
              <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4 text-slate-300 text-sm font-mono">
                  {payment.id}
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm">
                  {payment.payerEmail}
                </td>
                <td className="px-6 py-4 text-white font-medium">
                  R$ {payment.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[payment.status]}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(payment.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">
          Total: {data.totalElements} transações
        </p>
      </div>
    </div>
  );
}
