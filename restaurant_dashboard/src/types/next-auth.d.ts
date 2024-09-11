import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      image: string;
      latitude: string;
      longitude: string;
      openingHours: string | null;
      closingHours: string | null;
      token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    phone: string;
    address: string;
    latitude: string;
    longitude: string;
    image: string;
    openingHours: string | null;
    closingHours: string | null;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude: string;
    longitude: string;
    openingHours: string | null;
    closingHours: string | null;
    image: string;
    accessToken: string;
  }
}
