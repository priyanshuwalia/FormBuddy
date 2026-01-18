import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
    log: ["error", "warn"],
});
// Test connection
export default prisma;
