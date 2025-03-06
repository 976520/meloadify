import { JWT, Session } from "next-auth";

import NextAuth from "next-auth";
import { SPOTIFY_CONFIG } from "@/shared/config/spotify";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from "spotify-web-api-node";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

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
      } else if (token.expiresAt && Date.now() >= Number(token.expiresAt) * 1000) {
        try {
          const spotify = new SpotifyWebApi({
            clientId: SPOTIFY_CONFIG.clientId,
            clientSecret: SPOTIFY_CONFIG.clientSecret,
            refreshToken: token.refreshToken as string,
          });

          const refreshedTokens = await spotify.refreshAccessToken();

          token.accessToken = refreshedTokens.body.access_token;
          token.expiresAt = Math.floor(Date.now() / 1000 + refreshedTokens.body.expires_in);
        } catch (error) {
          console.error(error);
          return token;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
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
