import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                brand: true,
                mrp: true,
                price: true,
                imageUrl: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { emiPlans: true, variants: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ data: products });
    } catch (error) {
        console.error("[GET /api/products] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
