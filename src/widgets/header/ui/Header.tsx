"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-zinc-900/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-green-500">Meloadify</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user.image && (
              <Image src={user.image} alt={user.name || "User"} width={32} height={32} className="rounded-full" />
            )}
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
