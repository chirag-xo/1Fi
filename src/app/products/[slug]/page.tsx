import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { EmiPlansSection } from "@/components/EmiPlansSection";
import { formatINR } from "@/lib/types";
import { ChevronLeft, Shield, Truck, RotateCcw, Star, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { ProductGallery } from "@/components/ProductGallery";

export const revalidate = 60;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const products = await prisma.product.findMany({ select: { slug: true } });
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug },
        select: { name: true, description: true, brand: true, price: true },
    });

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} — EMI Plans | SmartEMI`,
        description:
            product.description ??
            `Buy ${product.name} on EMI starting from ${formatINR(product.price)}`,
        openGraph: {
            title: `${product.name} | SmartEMI`,
            description: product.description ?? "",
        },
    };
}

async function getProduct(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            variants: true,
            emiPlans: { orderBy: { tenure: "asc" } },
        },
    });
}

const brandColors: Record<string, string> = {
    Apple: "text-slate-300",
    Samsung: "text-blue-400",
    Google: "text-emerald-400",
};

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) notFound();

    // 1Fi 0% Interest Policy Enforcement:
    // Override the DB EMI values to match exact 0% logic where Total = Price.
    product.emiPlans = product.emiPlans.map(p => ({
        ...p,
        monthlyPayment: Math.round(product.price / p.tenure),
        totalPayment: product.price,
    }));

    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const brandColor = product.brand ? (brandColors[product.brand] ?? "text-accent") : "text-accent";
    const lowestEmi = Math.min(...product.emiPlans.map((p) => p.monthlyPayment));
    const savings = product.mrp - product.price;

    return (
        <div className="min-h-screen bg-background">
            {/* Sticky top breadcrumb */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-text-secondary hover:text-accent transition-colors group tracking-wide"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        All Products
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* ─── Product Hero: 3-column on desktop ─────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 mb-10">
                    {/* LEFT: Image + thumbnails */}
                    <div className="space-y-4">
                        <ProductGallery
                            productName={product.name}
                            productImageUrl={product.imageUrl}
                            variants={product.variants}
                            discount={discount}
                            brand={product.brand}
                        />

                        {/* Product details section */}
                        <div className="rounded-3xl border border-border bg-white shadow-sm p-6 space-y-4">
                            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                                Product Details
                            </h3>
                            <p className="text-text-primary text-sm font-medium leading-relaxed">
                                {product.description}
                            </p>
                            {/* Variant details */}
                            <div className="space-y-2">
                                {product.variants.map((v) => (
                                    <div key={v.id} className="flex items-center gap-3 text-sm">
                                        <div
                                            className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0 shadow-inner"
                                            style={{
                                                backgroundColor:
                                                    v.color?.toLowerCase().includes("black") ? "#1a1a2e" :
                                                        v.color?.toLowerCase().includes("silver") ||
                                                            v.color?.toLowerCase().includes("natural") ? "#c0c0c0" :
                                                            v.color?.toLowerCase().includes("gold") ||
                                                                v.color?.toLowerCase().includes("desert") ? "#d4a96a" :
                                                                v.color?.toLowerCase().includes("blue") ? "#4a90d9" :
                                                                    v.color?.toLowerCase().includes("white") ||
                                                                        v.color?.toLowerCase().includes("porcelain") ? "#f5f5f5" :
                                                                        v.color?.toLowerCase().includes("obsidian") ? "#1c1c1e" :
                                                                            v.color?.toLowerCase().includes("hazel") ? "#7c6f47" :
                                                                                v.color?.toLowerCase().includes("orange") ? "#ff6b35" :
                                                                                    v.color?.toLowerCase().includes("gray") ? "#808080" : "#6b7280"
                                            }}
                                        />
                                        <span className="text-text-secondary">
                                            {v.color} · <span className="text-text-primary font-medium">{v.storage}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Sticky product info + EMI card */}
                    <div className="space-y-5">
                        {/* Product title + price */}
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${brandColor}`}>
                                {product.brand}
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-snug mb-4">
                                {product.name}
                            </h1>

                            {/* Rating row */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-xs text-text-secondary">4.9 · 2,847 reviews</span>
                                <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    Verified Seller
                                </span>
                            </div>

                            {/* Price block */}
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold text-text-primary">
                                    {formatINR(product.price)}
                                </span>
                                {product.mrp > product.price && (
                                    <span className="text-lg text-muted line-through">
                                        {formatINR(product.mrp)}
                                    </span>
                                )}
                                {discount > 0 && (
                                    <span className="text-sm font-semibold text-emerald-400">
                                        Save {formatINR(savings)}
                                    </span>
                                )}
                            </div>

                            {/* EMI starting from pill */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent font-medium">
                                <span>EMI from</span>
                                <span className="font-bold">{formatINR(lowestEmi)}/mo</span>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { icon: <Truck className="w-4 h-4" />, text: "Free Delivery", sub: "2-3 days" },
                                { icon: <Shield className="w-4 h-4" />, text: "Secured EMI", sub: "256-bit SSL" },
                                { icon: <RotateCcw className="w-4 h-4" />, text: "7-Day Return", sub: "No hassle" },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-border shadow-sm text-center"
                                >
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold text-text-primary mt-1">{item.text}</span>
                                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{item.sub}</span>
                                </div>
                            ))}
                        </div>

                        {/* EMI plans inline card */}
                        <div className="rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-border bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-text-primary">
                                        💳 Pay Now: <span className="text-emerald-600">₹{Math.round(product.price * 0.01).toLocaleString("en-IN")} Downpayment</span>
                                    </p>
                                    <span className="text-[10px] font-bold uppercase text-text-secondary tracking-wider">{product.emiPlans.length} plans</span>
                                </div>
                            </div>
                            <div className="px-5 py-4 space-y-4">
                                {product.emiPlans.map((plan) => (
                                    <div key={plan.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full border-2 border-border flex-shrink-0" />
                                            <span className="text-text-primary font-bold">
                                                {formatINR(plan.monthlyPayment)} × {plan.tenure} months
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                                0% EMI
                                            </span>
                                            {plan.recommended && (
                                                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                                                    Best Value
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 py-3 text-[10px] font-bold text-text-secondary bg-gray-50/50 uppercase tracking-widest text-center border-t border-border flex flex-col gap-0.5">
                                <span>EMIs starting 3rd of next month</span>
                                <span className="text-accent">Powered by your investments</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── EMI Section (Full Width) ─────────────────────────────────── */}
                <div id="emi-section">
                    <EmiPlansSection
                        plans={product.emiPlans}
                        productSlug={product.slug}
                        productName={product.name}
                        mrp={product.mrp}
                        productPrice={product.price}
                    />
                </div>
            </div>
        </div>
    );
}
