import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";
import Link from "next/link";

export const revalidate = 60;

async function getProducts() {
    return prisma.product.findMany({
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
}
export default async function HomePage() {
    const products = await getProducts();
    const iphone = products.find(p => p.slug === "iphone-17-pro") as any;

    // Use Prisma to get the full product details since getProducts truncates emiPlans
    let fullIphone = null;
    if (iphone) {
        fullIphone = await prisma.product.findUnique({
            where: { id: iphone.id },
            include: { variants: true, emiPlans: { orderBy: { tenure: "asc" } } }
        });

        if (fullIphone) {
            fullIphone.emiPlans = fullIphone.emiPlans.map(p => ({
                ...p,
                monthlyPayment: Math.round(fullIphone!.price / p.tenure),
                totalPayment: fullIphone!.price,
            }));
        }
    }

    return (
        <div className="pt-16">
            <HeroSection heroProduct={fullIphone as any} />

            {/* Products section */}
            <section id="products" className="px-4 sm:px-6 pb-24 pt-12 max-w-7xl mx-auto">
                <div className="flex flex-col mb-10 text-center sm:text-left">
                    <h2 className="text-3xl font-extrabold text-text-primary mb-2">
                        Featured Products
                    </h2>
                    <p className="text-text-secondary text-lg">
                        {products.length} product{products.length !== 1 ? "s" : ""} available with transparent EMI plans
                    </p>
                </div>
                {products.length === 0 ? (
                    <div className="glass-card p-16 text-center">
                        <div className="text-5xl mb-4">📱</div>
                        <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                        <p className="text-text-secondary text-sm">
                            Run <code className="bg-white/10 px-2 py-0.5 rounded text-xs">npm run db:seed</code> to populate the database.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product: typeof products[0], i: number) => (
                            <ProductCard key={product.id} {...product} index={i} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
