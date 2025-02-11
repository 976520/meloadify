interface StatCardProps {
  title: string;
  value: string | number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
      <h3 className="text-lg font-medium text-zinc-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
