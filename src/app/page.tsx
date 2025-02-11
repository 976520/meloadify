import { HomePageClient } from "./HomePageClient";
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

  return <HomePageClient user={session.user} accessToken={session.accessToken} />;
}
