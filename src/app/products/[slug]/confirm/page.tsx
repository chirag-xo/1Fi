"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronLeft,
    Calendar,
    Banknote,
    Gift,
    Sparkles,
    TrendingDown,
    CreditCard,
    ShieldCheck,
    Clock,
} from "lucide-react";
import { formatINR } from "@/lib/types";

function ConfirmContent({ slug }: { slug: string }) {
    const params = useSearchParams();
    const router = useRouter();

    const tenure = Number(params.get("tenure") ?? 0);
    const monthly = Number(params.get("monthly") ?? 0);
    const total = Number(params.get("total") ?? 0);
    const cashback = Number(params.get("cashback") ?? 0);
    const interest = Number(params.get("interest") ?? 0);
    const productName = params.get("productName") ?? "Product";
    const effectiveCost = total - cashback;

    const handleConfirm = () => {
        toast.success("Order placed successfully!", {
            description: "Your EMI plan is now active.",
            icon: "🎉",
        });
        router.push("/");
    };

    // Generate simplified EMI schedule (first 3 months)
    const schedulePreview = Array.from({ length: Math.min(3, tenure) }, (_, i) => ({
        month: i + 1,
        date: (() => {
            const d = new Date();
            d.setMonth(d.getMonth() + i + 1, 3);
            return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        })(),
        amount: monthly,
    }));

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                {/* Breadcrumb */}
                <Link
                    href={`/products/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Product
                </Link>

                {/* Success animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-accent flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(52,211,153,0.35)]"
                    >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-text-primary mb-1">
                        Confirm Your EMI Plan
                    </h1>
                    <p className="text-text-secondary text-sm">
                        {productName} · {tenure} Month EMI
                    </p>
                </motion.div>

                {/* Main card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-6"
                >
                    {/* Hero stat */}
                    <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8 text-center shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider uppercase text-text-secondary mb-2">Monthly Payment</p>
                        <p className="text-5xl font-black text-text-primary tracking-tight mb-2">
                            {formatINR(monthly)}
                        </p>
                        <p className="text-[12px] font-bold text-text-secondary">
                            × {tenure} months = {formatINR(total)}
                        </p>
                    </div>

                    {/* Financial breakdown */}
                    <div className="rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
                        {[
                            {
                                icon: <Calendar className="w-4 h-4" />,
                                label: "Tenure",
                                value: `${tenure} months`,
                                color: "text-blue-400",
                                bg: "bg-blue-400/10",
                            },
                            {
                                icon: <Banknote className="w-4 h-4" />,
                                label: "Total Payable",
                                value: formatINR(total),
                                color: "text-orange-400",
                                bg: "bg-orange-400/10",
                            },
                            {
                                icon: <Gift className="w-4 h-4" />,
                                label: "Cashback on Completion",
                                value: `+ ${formatINR(cashback)}`,
                                color: "text-emerald-400",
                                bg: "bg-emerald-400/10",
                            },
                            {
                                icon: <TrendingDown className="w-4 h-4" />,
                                label: "Interest Rate",
                                value: `${interest}% p.a.`,
                                color: "text-yellow-400",
                                bg: "bg-yellow-400/10",
                            },
                            {
                                icon: <Sparkles className="w-4 h-4" />,
                                label: "Effective Cost",
                                value: formatINR(effectiveCost),
                                color: "text-purple-400",
                                bg: "bg-purple-400/10",
                                highlight: true,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.06 }}
                                className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 ${item.highlight ? "bg-purple-50/50" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold text-text-secondary">{item.label}</span>
                                </div>
                                <span className={`font-black tracking-tight text-sm ${item.highlight ? "text-purple-600 text-lg" : "text-text-primary"}`}>
                                    {item.value}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* EMI schedule preview */}
                    <div className="rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-gray-50/50">
                            <p className="text-xs font-bold text-text-primary flex items-center gap-2">
                                <Clock className="w-4 h-4 text-accent" />
                                Upcoming EMI Dates
                            </p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {schedulePreview.map((item) => (
                                <div key={item.month} className="flex items-center justify-between px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-xs font-bold text-text-secondary flex items-center justify-center">
                                            {item.month}
                                        </span>
                                        <span className="text-sm font-bold text-text-secondary">{item.date}</span>
                                    </div>
                                    <span className="text-sm font-black text-text-primary">
                                        {formatINR(item.amount)}
                                    </span>
                                </div>
                            ))}
                            {tenure > 3 && (
                                <div className="px-6 py-4 text-[10px] font-bold tracking-wider uppercase text-text-secondary text-center bg-gray-50/50">
                                    + {tenure - 3} more payments of {formatINR(monthly)} each
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { icon: <ShieldCheck className="w-5 h-5" />, label: "Bank-Grade Security", color: "text-emerald-500", bg: "bg-emerald-50" },
                            { icon: <CreditCard className="w-5 h-5" />, label: "No Hidden Charges", color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: <CheckCircle2 className="w-5 h-5" />, label: "Instant Approval", color: "text-purple-500", bg: "bg-purple-50" },
                        ].map((badge) => (
                            <div key={badge.label} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border shadow-sm text-center bg-white`}>
                                <div className={`p-2 rounded-xl ${badge.bg} ${badge.color}`}>{badge.icon}</div>
                                <span className="text-[10px] font-bold text-text-primary leading-tight">{badge.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href={`/products/${slug}`}
                            className="flex-1 text-center px-6 py-4 rounded-2xl border border-border bg-white text-sm font-bold text-text-secondary hover:text-text-primary hover:border-gray-300 transition-all shadow-sm"
                        >
                            Change Plan
                        </Link>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-sm bg-text-primary text-white shadow-xl hover:bg-black hover:scale-[1.02] transition-all duration-200 uppercase tracking-wide border-b-2 border-transparent"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Confirm & Activate EMI
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default async function ConfirmPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
        }>
            <ConfirmContent slug={resolvedParams.slug} />
        </Suspense>
    );
}
