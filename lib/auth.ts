import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Import the necessary module or type declaration for 'NextAuthOptions'
import { db } from "../model/database";
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";
// import

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Iniciar Sesión",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "ejemplo@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Buscamos el usuario en la base de datos
        const existUser = await db.users.findUnique({
          where: { email: credentials?.email + "" },
        });

        if (!existUser) {
          return null;
        }

        // Validamos la contraseña del usuario
        const passwordValid = await compare(
          credentials.password,
          existUser.password
        );

        if (!passwordValid) {
          return null;
        }

        // Si todo es correcto, devolvemos el usuario
        return {
          id: existUser.uuid,
          favorite: existUser.save_pokemon,
          username: existUser.username,
          email: existUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          uuid: user.id,
          favorite: user.favorite,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          uuid: token.uuid,
          favorite: token.favorite,
        },
      };
    },
  },
};
