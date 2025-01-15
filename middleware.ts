import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Redirect to sign-in page if not authenticated
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Add paths to protect here
};
