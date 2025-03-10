import { LoginPageClient } from "./LoginPageClient";
import { authOptions } from "@/shared/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return <LoginPageClient />;
}
