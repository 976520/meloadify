interface StatCardProps {
  title: string;
  value: string | number;
  period: "일" | "주" | "월" | "년";
}

export function StatCard({ title, value, period }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
      <h3 className="text-lg font-medium text-zinc-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-zinc-500 capitalize">{period}</p>
    </div>
  );
}
