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
            include: {
                variants: true,
                emiPlans: {
                    orderBy: { tenure: "asc" },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: product });
    } catch (error) {
        console.error("[GET /api/products/:slug] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
