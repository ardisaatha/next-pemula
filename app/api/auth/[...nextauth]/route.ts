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
        // Call your custom API for authentication
        const response = await fetch(
          "https://apim.admedika.co.id/dev/auth-service/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const data = await response.json();

        // If the response includes valid user data, return it
        if (response.ok) {
          console.log("masuk pak eko");
          return data;
        }

        // Otherwise, return null to indicate failure
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional: Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Append user data to token (e.g., accessToken)
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user data in session
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env file
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
