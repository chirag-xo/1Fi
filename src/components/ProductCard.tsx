"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { formatINR } from "@/lib/types";

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    mrp: number;
    price: number;
    imageUrl: string | null;
    description: string | null;
    index: number;
    _count: { emiPlans: number; variants: number };
}

const brandAccents: Record<string, string> = {
    Apple: "from-slate-100 to-slate-200 border-slate-200",
    Samsung: "from-blue-50 to-blue-100 border-blue-200",
    Google: "from-emerald-50 to-emerald-100 border-emerald-200",
};

const brandLabels: Record<string, string> = {
    Apple: "text-slate-800 bg-slate-200 border-slate-300",
    Samsung: "text-blue-800 bg-blue-100 border-blue-200",
    Google: "text-emerald-800 bg-emerald-100 border-emerald-200",
};

export function ProductCard({
    name,
    slug,
    brand,
    mrp,
    price,
    imageUrl,
    index,
    _count,
}: ProductCardProps) {
    const discount = Math.round(((mrp - price) / mrp) * 100);
    const brandKey = brand ?? "";
    const gradient = brandAccents[brandKey] ?? "bg-surface-2 border-border";
    const labelClass = brandLabels[brandKey] ?? "text-text-secondary bg-gray-100 border-border";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
        >
            <Link href={`/products/${slug}`} className="group block h-full">
                <div
                    className={`h-full flex flex-col relative rounded-[2rem] border ${gradient} bg-gradient-to-br overflow-hidden transition-all duration-300 group-hover:border-accent/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-10px_rgba(21,94,239,0.15)] group-hover:-translate-y-1 bg-white`}
                >
                    {/* Image */}
                    <div className="relative h-56 pt-6 px-6 overflow-hidden flex items-center justify-center bg-white/50 backdrop-blur-sm">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-contain object-center scale-90 transition-transform duration-500 group-hover:scale-100 p-8 drop-shadow-xl"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                📱
                            </div>
                        )}

                        {/* Slight bottom gradient to blend image area into content */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />

                        {/* Brand badge */}
                        <div className="absolute top-4 left-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded border shadow-sm ${labelClass}`}>
                                {brand}
                            </span>
                        </div>

                        {/* Discount badge */}
                        {discount > 0 && (
                            <div className="absolute top-4 right-4">
                                <span className="flex items-center gap-0.5 text-[10px] font-extrabold px-2 py-1 rounded bg-[#FFC107] text-yellow-900 shadow-sm">
                                    {discount}% OFF
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-8 flex flex-col justify-between bg-white border-t border-gray-100 z-10">
                        <div className="mb-4">
                            <h3 className="font-extrabold text-lg text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                                {name}
                            </h3>
                        </div>

                        {/* Price row */}
                        <div className="space-y-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-text-primary tracking-tight">
                                    {formatINR(price)}
                                </span>
                                {mrp > price && (
                                    <span className="text-sm font-bold text-text-secondary line-through">
                                        {formatINR(mrp)}
                                    </span>
                                )}
                            </div>

                            {/* EMI count + CTA */}
                            <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-2">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
                                    <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                                        <Zap className="w-3 h-3 text-accent" />
                                    </span>
                                    {_count.emiPlans} EMI Plans
                                </div>
                                <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-accent group-hover:bg-accent group-hover:text-white px-3 py-1.5 rounded-full transition-all duration-300">
                                    View
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
