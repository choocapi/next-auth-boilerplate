import { PrismaClient } from "@prisma/client";

// When nextjs hot-reloads, it can create new instances of PrismaClient.
// This global helps to maintain a single instance.

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
