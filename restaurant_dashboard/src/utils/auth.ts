import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        token.phone = user.phone as string;
        token.address = user.address as string;
        token.latitude = user.latitude as string;
        token.longitude = user.longitude as string;
        token.openingHours = user.openingHours;
        token.closingHours = user.closingHours;
        token.accessToken = user.token!;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
    }): Promise<
      DefaultSession & { user: { id: string /* other properties */ } }
    > {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          phone: token.phone as string,
          address: token.address as string,
          latitude: token.latitude as string,
          longitude: token.longitude as string,
          openingHours: token.openingHours as string | null,
          closingHours: token.closingHours as string | null,
          token: token.accessToken,
        };
      }
      return session as DefaultSession & {
        user: { id: string /* other properties */ };
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});


