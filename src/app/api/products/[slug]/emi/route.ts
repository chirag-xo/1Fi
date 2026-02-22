import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            select: { id: true, name: true, slug: true },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        const emiPlans = await prisma.emiPlan.findMany({
            where: { productId: product.id },
            orderBy: { tenure: "asc" },
        });

        return NextResponse.json({
            data: {
                product: { name: product.name, slug: product.slug },
                emiPlans,
            },
        });
    } catch (error) {
        console.error("[GET /api/products/:slug/emi] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch EMI plans" },
            { status: 500 }
        );
    }
}
