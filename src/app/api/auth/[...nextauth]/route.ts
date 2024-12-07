import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthUser from "@/types/auth/AuthUser";
import CustomJwt from "@/types/auth/CustomJwt";
import { apiServer } from "@/utils/axios/api";
import AuthResponse from "@/types/auth/AuthResponse";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
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
            image: user.image,
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
        customJwt.picture = authResponse.image;
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
