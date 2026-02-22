import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString || connectionString.includes("johndoe")) {
        console.warn(
            "⚠️  DATABASE_URL is not configured. Set it in .env file. Database queries will fail."
        );
        // Return a client that will fail gracefully on queries
        const pool = new Pool({ connectionString: "postgresql://localhost/smartemi" });
        const adapter = new PrismaPg(pool);
        return new PrismaClient({ adapter });
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
