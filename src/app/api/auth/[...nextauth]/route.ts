import NextAuth from "next-auth";
import { SPOTIFY_CONFIG } from "@/shared/config/spotify";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: SPOTIFY_CONFIG.clientId,
      clientSecret: SPOTIFY_CONFIG.clientSecret,
      authorization: {
        params: {
          scope: SPOTIFY_CONFIG.scopes,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
