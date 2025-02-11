import { Header } from "@/widgets/header";
import { StatsContainer } from "@/widgets/stats-display/ui/StatsContainer";
import { authOptions } from "@/shared/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.accessToken) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <Header user={session.user} />
      <StatsContainer accessToken={session.accessToken} />
    </main>
  );
}
