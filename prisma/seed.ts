import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
    console.log("🌱 Seeding SmartEMI database...");

    // Clear existing data
    await prisma.emiPlan.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();

    // ─── Product 1: iPhone 17 Pro ─────────────────────────────────────────────
    const iphone = await prisma.product.create({
        data: {
            name: "Apple iPhone 17 Pro",
            slug: "iphone-17-pro",
            brand: "Apple",
            description:
                "The most advanced iPhone ever. Featuring a titanium design, 48MP camera system, Apple Intelligence, and the blazing-fast A19 Pro chip.",
            mrp: 159900,
            price: 149900,
            imageUrl:
                "/images/products/iphone-hero.png",
            variants: {
                create: [
                    {
                        color: "Deep Blue",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/iphone-blue-v2.png",
                    },
                    {
                        color: "Cosmic Orange",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/iphone-orange.png",
                    },
                    {
                        color: "Silver",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/iphone-silver.png",
                    }
                ],
            },
            emiPlans: {
                create: [
                    {
                        tenure: 6,
                        monthlyPayment: 26067,
                        interestRate: 12.5,
                        cashback: 2000,
                        totalPayment: 156402,
                        recommended: false,
                        tag: "Shortest Tenure",
                    },
                    {
                        tenure: 12,
                        monthlyPayment: 13910,
                        interestRate: 10.5,
                        cashback: 5000,
                        totalPayment: 166920,
                        recommended: false,
                        tag: "Most Popular",
                    },
                    {
                        tenure: 24,
                        monthlyPayment: 7450,
                        interestRate: 9.5,
                        cashback: 7500,
                        totalPayment: 178800,
                        recommended: true,
                        tag: "Best Value",
                    },
                    {
                        tenure: 36,
                        monthlyPayment: 5398,
                        interestRate: 10.0,
                        cashback: 10000,
                        totalPayment: 194328,
                        recommended: false,
                        tag: "Lowest EMI",
                    },
                ],
            },
        },
    });
    console.log("✅ Created iPhone 17 Pro:", iphone.id);

    // ─── Product 2: Samsung Galaxy S24 Ultra ──────────────────────────────────
    const samsung = await prisma.product.create({
        data: {
            name: "Samsung Galaxy S24 Ultra",
            slug: "samsung-s24-ultra",
            brand: "Samsung",
            description:
                "The ultimate Galaxy experience. Built-in S Pen, 200MP camera, Galaxy AI features, and titanium frame — engineered for power users.",
            mrp: 134999,
            price: 124999,
            imageUrl:
                "/images/products/samsung-1.png",
            variants: {
                create: [
                    {
                        color: "Titanium Black",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/titanium-black.png",
                    },
                    {
                        color: "Titanium Gray",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/titanium-gray.png",
                    },
                    {
                        color: "Titanium Orange",
                        storage: "256GB",
                        imageUrl:
                            "/images/products/titanium-orange.png",
                    },
                ],
            },
            emiPlans: {
                create: [
                    {
                        tenure: 6,
                        monthlyPayment: 21875,
                        interestRate: 11.5,
                        cashback: 1500,
                        totalPayment: 131250,
                        recommended: false,
                        tag: "Shortest Tenure",
                    },
                    {
                        tenure: 12,
                        monthlyPayment: 11458,
                        interestRate: 10.0,
                        cashback: 4000,
                        totalPayment: 137496,
                        recommended: true,
                        tag: "Best Value",
                    },
                    {
                        tenure: 18,
                        monthlyPayment: 8055,
                        interestRate: 9.5,
                        cashback: 6000,
                        totalPayment: 144990,
                        recommended: false,
                        tag: "Most Popular",
                    },
                    {
                        tenure: 24,
                        monthlyPayment: 6380,
                        interestRate: 9.0,
                        cashback: 8000,
                        totalPayment: 153120,
                        recommended: false,
                        tag: "Lowest EMI",
                    },
                ],
            },
        },
    });
    console.log("✅ Created Samsung Galaxy S24 Ultra:", samsung.id);

    // ─── Product 3: Google Pixel 9 Pro ────────────────────────────────────────
    const pixel = await prisma.product.create({
        data: {
            name: "Google Pixel 9 Pro",
            slug: "pixel-9-pro",
            brand: "Google",
            description:
                "Google's most powerful phone yet. Magic Eraser, Best Take, Real Tone, and Tensor G4 chip — the AI-powered camera phone redefined.",
            mrp: 109999,
            price: 99999,
            imageUrl:
                "https://lh3.googleusercontent.com/glG-KWvnEaijg07UZZ_x3PPUQLMkO_ExuhmtFswIv8arcETNkcjDJErXLXAwfddcpuQtdDK9A283bgzGu8gCkfUbc2UHvBb2-bo=s3000-w3000-e365-rw-v0-nu",
            variants: {
                create: [
                    {
                        color: "Obsidian",
                        storage: "256GB",
                        imageUrl:
                            "https://lh3.googleusercontent.com/glG-KWvnEaijg07UZZ_x3PPUQLMkO_ExuhmtFswIv8arcETNkcjDJErXLXAwfddcpuQtdDK9A283bgzGu8gCkfUbc2UHvBb2-bo=s3000-w3000-e365-rw-v0-nu",
                    },
                    {
                        color: "Porcelain",
                        storage: "256GB",
                        imageUrl:
                            "https://lh3.googleusercontent.com/NVYOKg2PRHZHZ8bcOhq7QAAxCKpMp23Qygt8BHif9bdFx2r5lAsHtlpaiF5o1FA_qIIDfpE1GIxMidkBB5zGlXp80utftEuEIA=s3000-w3000-e365-rw-v0-nu",
                    },
                    {
                        color: "Hazel",
                        storage: "256GB",
                        imageUrl:
                            "https://lh3.googleusercontent.com/JyUrD_j0c482Oj1AB09xmo4j4-o6bQgzoCSTuK4KISNT4OnSRTh5yRTfyOCc11imkFCC9cCdPL5tA8crR4laJIoYd-Lcb94Eug=s3000-w3000-e365-rw-v0-nu",
                    },
                ],
            },
            emiPlans: {
                create: [
                    {
                        tenure: 6,
                        monthlyPayment: 17500,
                        interestRate: 10.5,
                        cashback: 1000,
                        totalPayment: 105000,
                        recommended: false,
                        tag: "Shortest Tenure",
                    },
                    {
                        tenure: 12,
                        monthlyPayment: 9333,
                        interestRate: 9.5,
                        cashback: 3500,
                        totalPayment: 111996,
                        recommended: true,
                        tag: "Best Value",
                    },
                    {
                        tenure: 18,
                        monthlyPayment: 6750,
                        interestRate: 9.0,
                        cashback: 5000,
                        totalPayment: 121500,
                        recommended: false,
                        tag: "Most Popular",
                    },
                    {
                        tenure: 24,
                        monthlyPayment: 5350,
                        interestRate: 8.5,
                        cashback: 6500,
                        totalPayment: 128400,
                        recommended: false,
                        tag: "Lowest EMI",
                    },
                ],
            },
        },
    });
    console.log("✅ Created Google Pixel 9 Pro:", pixel.id);

    console.log("\n🎉 Seeding complete! Products created:");
    console.log(`  • iPhone 17 Pro      → /products/iphone-17-pro`);
    console.log(`  • Samsung S24 Ultra  → /products/samsung-s24-ultra`);
    console.log(`  • Google Pixel 9 Pro → /products/pixel-9-pro`);
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
