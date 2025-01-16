// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      user_code: string;
      user_name: string;
      payor_code: string;
      access_level: string;
      access_token: string;
      refresh_token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    data: {
      id: string;
      user_code: string;
      user_name: string;
      payor_code: string;
      access_level: string;
      access_token: string;
      refresh_token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user_code: string;
    user_name: string;
    payor_code: string;
    access_level: string;
    access_token: string;
    refresh_token: string;
  }
}
