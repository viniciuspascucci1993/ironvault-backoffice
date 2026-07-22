import { getServerApi, getTokenPayload } from "@/lib/serverApi";
import { DashboardSummary } from "@/types";
import { TrendingUp, Users, CreditCard, CheckCircle } from "lucide-react";
import DashboardCharts from "@/components/ui/DashboardCharts";

export default async function DashboardPage() {
  const api = await getServerApi();
  const payload = await getTokenPayload();
  const isAdmin = payload?.role === "ADMIN";

  const res = await api.get<DashboardSummary>("/api/dashboard/summary");
  const summary = res.data;

  const cards = [
    {
      label: "Total de Transações",
      value: summary.totalTransactions,
      icon: CreditCard,
      color: "text-indigo-400",
      show: true
    },
    {
      label: "Receita Total",
      value: `R$ ${summary.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-400",
      show: true
    },
    {
      label: "Aprovadas",
      value: summary.transactionsByStatus.approved,
      icon: CheckCircle,
      color: "text-emerald-400",
      show: true
    },
    {
      label: "Total de Usuários",
      value: summary.totalUsers,
      icon: Users,
      color: "text-blue-400",
      show: isAdmin,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards
          .filter((card) => card.show)
          .map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-400 text-sm">{card.label}</p>
                  <Icon size={18} className={card.color} />
                </div>
                <p className="text-white text-2xl font-bold">{card.value}</p>
              </div>
            );
          })}
      </div>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-medium mb-4">Transações por Status</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {summary.transactionsByStatus.approved}
            </p>
            <p className="text-slate-400 text-sm mt-1">Aprovadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {summary.transactionsByStatus.processing}
            </p>
            <p className="text-slate-400 text-sm mt-1">Em Processamento</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {summary.transactionsByStatus.failed}
            </p>
            <p className="text-slate-400 text-sm mt-1">Falhas</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <DashboardCharts
        transactionsChartData={summary.transactionsByChartData}
        revenueChartData={summary.revenueByChartData}
        transactionsByStatus={summary.transactionsByStatus}
      />
    </div>
  );
}
