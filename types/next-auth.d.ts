import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    id: string;
    favorite: number[];
  }

  interface Session {
    user: User & {
      username: string;
      uuid: string;
      favorite: number[];
    };
    token: {
      username: string;
      id: string;
      favorite: number[];
    };
  }
}
