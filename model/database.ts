import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

//Si estamos en desarrollo, asignamos prisma a globalThis. Evitamos crear multiples instancias de prisma
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = prisma;
