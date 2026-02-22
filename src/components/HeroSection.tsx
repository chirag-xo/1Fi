import Link from "next/link";
import { Zap } from "lucide-react";
import { TrustIndicators } from "./TrustIndicators";
import { HeroEMIPreviewCard } from "./HeroEMIPreviewCard";
import { ProductWithDetails } from "@/lib/types";
import DotGrid from "./DotGrid";

export function HeroSection({ heroProduct }: { heroProduct?: ProductWithDetails }) {
    return (
        <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden bg-background">
            {/* GSAP Interactive Background Grid */}
            <div className="absolute inset-0 z-0 opacity-60">
                <DotGrid
                    dotSize={3}
                    gap={24}
                    baseColor="#E2E8F0"
                    activeColor="#155EEF"
                    proximity={100}
                    shockRadius={150}
                />
            </div>

            {/* Soft background gradient orbs for fintech-grade depth without distraction */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[100px] z-0 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/[0.05] rounded-full blur-[120px] z-0 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* LEFT COLUMN: Premium Copywriting */}
                    <div className="space-y-8 animate-fade-right z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 text-sm font-semibold mb-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]">
                                <Zap className="w-4 h-4 fill-accent text-accent" />
                                <span>You could save <strong className="font-bold text-accent">₹1,17,436</strong> vs upfront payment</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-text-primary leading-[1.05] mb-6">
                                <span className="text-accent">Invest Without Selling.</span><br />
                                Shop Without Interest.
                            </h1>
                            <p className="text-text-secondary text-lg sm:text-xl md:text-2xl max-w-lg leading-relaxed font-medium">
                                Unlock 0% interest EMIs using your mutual funds — no credit score required.
                            </p>
                        </div>

                        <p className="text-base sm:text-lg text-gray-600 max-w-md font-medium leading-relaxed">
                            1Fi enables smarter financing by letting you borrow against your investments while they continue to grow.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                            <Link href="#products" className="w-full sm:w-auto bg-accent hover:bg-accent-light text-white rounded-2xl px-8 py-4 text-sm font-bold tracking-wide shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all text-center">
                                EXPLORE EMI OPTIONS
                            </Link>
                            <Link href="#products" className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-8 py-4 font-bold text-sm text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all tracking-wide bg-white">
                                CHECK ELIGIBILITY
                            </Link>
                        </div>

                        <TrustIndicators />
                    </div>

                    {/* RIGHT COLUMN: Product EMI Preview */}
                    <div className="relative w-full z-10 flex justify-center lg:justify-end">
                        <HeroEMIPreviewCard product={heroProduct} />
                    </div>
                </div>
            </div>
        </section>
    );
}
