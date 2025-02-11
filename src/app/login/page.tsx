import { LoginButton } from "@/features/auth/login-button";
import { authOptions } from "@/shared/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-8">Meloadify</h1>
        <p className="text-lg text-zinc-400 mb-8">스포티파이 api 도전...</p>
        <LoginButton />
      </div>
    </main>
  );
}
