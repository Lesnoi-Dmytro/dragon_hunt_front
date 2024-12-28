import { apiServer } from "@/utils/axios/api";
import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type AuthResponse from "./authResponse";
import type CustomJwt from "./customJwt";
import type AuthUser from "./authUser";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<AuthUser | null> {
        try {
          const user = (
            await apiServer.post<AuthResponse>("/auth/signin", {
              username: credentials?.username,
              password: credentials?.password,
            })
          ).data;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            backendToken: user.token,
          };
        } catch (err) {
          console.log(err);
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, account }): Promise<CustomJwt> {
      const customJwt = token as CustomJwt;

      if (customJwt.backend_token) {
        return customJwt;
      }

      if (account?.provider === "google") {
        const authResponse = (
          await apiServer.post<AuthResponse>("/auth/google", {
            access_token: account.access_token,
          })
        ).data;

        customJwt.sub = authResponse.id;
        customJwt.email = authResponse.email;
        customJwt.name = authResponse.name;
        customJwt.backend_token = authResponse.token;
      } else {
        const authUser = user as AuthUser;

        customJwt.sub = authUser.id;
        customJwt.email = authUser.email;
        customJwt.name = authUser.name;
        customJwt.backend_token = authUser.backendToken;
      }

      return customJwt;
    },
    async session({ session, token }): Promise<Session> {
      const customJwt = token as CustomJwt;

      session.user = {
        ...session.user,
        backendToken: customJwt.backend_token,
        id: customJwt.sub || "",
      } as AuthUser;
      return session;
    },
  },
};

export default authOptions;
