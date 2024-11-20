import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";



 const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        try {
          await connect();
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error authorizing user:", err.message);
          } else {
            console.error("Unknown error occurred:", err);
          }
          throw err;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "github") {
        await connect();
        try {
          if (account) {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
              const newUser = new User({
                email: user.email,
              });
              await newUser.save();
              console.log("Created new user:", newUser);
            }
            return true;
          } else {
            return false;
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error saving user:", err.message);
          } else {
            console.error("Unknown error occurred:", err);
          }
          return false;
        }
      }

      return false;
    },
  },
};

export { handler as GET, handler as POST };
export const handler = NextAuth(authOptions);