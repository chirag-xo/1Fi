"use client";

import { ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatINR, ProductWithDetails } from "@/lib/types";

export function HeroEMIPreviewCard({ product }: { product?: ProductWithDetails }) {
    const defaultProduct = {
        name: "Apple iPhone 15 Pro",
        price: 134900,
        imageUrl: null as string | null,
    };

    const displayProduct = product || defaultProduct;
    // Map existing plans if present, else create 3 static fallback plans
    const emiPlans = product?.emiPlans || [
        { id: "1", tenure: 3, monthlyPayment: 44966, recommended: false },
        { id: "2", tenure: 6, monthlyPayment: 22483, recommended: true },
        { id: "3", tenure: 9, monthlyPayment: 14988, recommended: false },
    ];

    const [selectedPlanId, setSelectedPlanId] = useState<string>(
        emiPlans.find(p => p.recommended)?.id || emiPlans[0]?.id || ""
    );
    return (
        <div className="relative w-full max-w-md mx-auto animate-fade-left">
            {/* Outer Subtle Glow Behind Card */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-400/20 blur-3xl rounded-[3rem] -z-10" />

            {/* Main Card Container */}
            <div className="bg-white/80 backdrop-blur-xl border border-white max-w-sm rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 mx-auto">
                {/* Product Header */}
                <div className="p-6 pb-4 border-b border-gray-100 flex items-center gap-4 bg-gradient-to-b from-white to-transparent">
                    <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center border border-gray-100 shadow-sm relative overflow-hidden">
                        {displayProduct.imageUrl ? (
                            <Image
                                src={displayProduct.imageUrl}
                                alt={displayProduct.name}
                                fill
                                className="object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{displayProduct.name}</h3>
                        <p className="text-gray-500 text-sm font-medium mt-0.5">{formatINR(displayProduct.price)}</p>
                    </div>
                </div>

                {/* EMI Options List */}
                <div className="p-6 space-y-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                        <span>Select Plan</span>
                        <span className="text-accent flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure
                        </span>
                    </div>

                    {/* Render EMI Options */}
                    {emiPlans.slice(0, 3).map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlanId(plan.id)}
                                className={`group relative rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300
                                ${isSelected
                                        ? "bg-[#F8FAFC] border-2 border-accent shadow-sm transform scale-[1.02]"
                                        : "bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50 opacity-90 hover:opacity-100"}`}
                            >
                                {plan.recommended && (
                                    <div className={`absolute -top-3 right-4 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm transition-colors ${isSelected ? "bg-accent" : "bg-gray-400"}`}>
                                        Recommended
                                    </div>
                                )}
                                <div>
                                    <p className={`font-bold text-lg ${isSelected ? "text-accent" : "text-gray-900"}`}>
                                        {formatINR(plan.monthlyPayment)} <span className="text-sm text-gray-500 font-medium">/ mo</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium mt-0.5 flex flex-wrap gap-1 items-center">
                                        For {plan.tenure} months
                                        {isSelected && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-accent font-bold">0% Interest</span>
                                            </>
                                        )}
                                    </p>
                                </div>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected ? "bg-accent shadow-inner border-0 w-6 h-6" : "border-2 border-gray-200 group-hover:border-gray-300"}`}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-2">
                    <Link
                        href={`/products/${(displayProduct as any).slug || "iphone-17-pro"}`}
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                        Proceed with EMI
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                    <p className="text-center text-xs text-gray-400 font-medium mt-4">Zero down payment required today</p>
                </div>
            </div>
        </div>
    );
}
