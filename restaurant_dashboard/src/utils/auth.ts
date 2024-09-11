import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: string;
      session?: any;
    }): Promise<JWT> {
      if (user) {
        // Initial sign in
        token = {
          id: user.id as string,
          name: user.name as string,
          email: user.email as string,
          phone: user.phone as string,
          address: user.address as string,
          latitude: user.latitude as string,
          longitude: user.longitude as string,
          image: user.image as string,
          openingHours: user.openingHours as string | null,
          closingHours: user.closingHours as string | null,
          accessToken: user.token,
        };
      }

      if (trigger === "update" && session) {
        return {
          ...token,
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          phone: session.user.phone,
          address: session.user.address,
          latitude: session.user.latitude,
          longitude: session.user.longitude,
          openingHours: session.user.openingHours,
          closingHours: session.user.closingHours,
          image: session.user.image,
          accessToken: session.user.token,
        };
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
    }): Promise<DefaultSession & { user: User }> {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          address: token.address,
          latitude: token.latitude,
          longitude: token.longitude,
          openingHours: token.openingHours,
          closingHours: token.closingHours,
          token: token.accessToken,
          image: token.image,
        };
      }
      return session as DefaultSession & { user: User };
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});
