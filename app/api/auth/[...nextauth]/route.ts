import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          // Validate the presence of credentials
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Username and password are required.");
          }

          // Call your custom API for authentication
          const response = await fetch(
            "https://apim.admedika.co.id/dev/auth-service/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials.username.trim(),
                password: credentials.password.trim(),
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to authenticate.");
          }

          // Return user data on successful authentication
          return data;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null; // Return null to indicate authentication failure
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add user-specific data to the token
        token.user_code = user.data.user_code?.trim() || "";
        token.user_name = user.data.user_name?.trim() || "";
        token.payor_code = user.data.payor_code?.trim() || "";
        token.access_level = user.data.access_level?.trim() || "";
      }
      console.log("token & user", token, user);

      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      console.log("token", token, session);

      session.user = {
        ...session.user,
        user_code: token.user_code,
        user_name: token.user_name,
        payor_code: token.payor_code,
        access_level: token.access_level,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env file
  session: {
    strategy: "jwt", // Use JWT for session storage
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
