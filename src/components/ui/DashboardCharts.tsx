"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DashboardChartsProps {
  transactionsChartData: { date: string; count: number }[];
  revenueChartData: { date: string; amount: number }[];
  transactionsByStatus: {
    approved: number;
    failed: number;
    processing: number;
  };
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function DashboardCharts({
  transactionsChartData,
  revenueChartData,
  transactionsByStatus,
}: DashboardChartsProps) {
  const statusData = [
    { name: "Aprovadas", value: transactionsByStatus.approved },
    { name: "Processando", value: transactionsByStatus.processing },
    { name: "Falhas", value: transactionsByStatus.failed },
  ];

  return (
    <div className="space-y-6">
      {/* Dois gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transações por dia */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-medium mb-6">Transações por Dia</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#94a3b8" }}
              />
              <Bar
                dataKey="count"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                name="Transações"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita por dia */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-medium mb-6">Receita por Dia (R$)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#94a3b8" }}
                formatter={(value) =>
                  value != null
                    ? [`R$ ${Number(value).toFixed(2)}`, "Receita"]
                    : ["", ""]
                }
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
                name="Receita"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pizza por status */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-medium mb-6">Distribuição por Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                percent != null
                  ? `${name} ${(percent * 100).toFixed(0)}%`
                  : name
              }
              labelLine={false}
            >
              {statusData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#94a3b8" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
