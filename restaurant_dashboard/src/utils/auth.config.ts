import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";
import { NextAuthConfig } from "next-auth";

interface Credentials {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  openingHours: string | null;
  closingHours: string | null;
  token: string;
}

async function validateUser(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const response = await axios.post("/authentication/resturant/login", {
      email,
      password,
    });

    if (response.data && response.data.loggedInRestaurant) {
      return {
        ...response.data.loggedInRestaurant,
        token: response.data.token,
      };
    }
    return null;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
}

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ): Promise<AuthenticatedUser | null> {
        const typedCredentials = credentials as Credentials;
        if (!typedCredentials?.email || !typedCredentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const user = await validateUser(
            typedCredentials.email,
            typedCredentials.password
          );
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
