"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    Star,
    TrendingDown,
    Award,
    Zap,
    ChevronRight,
    Info,
    BarChart3,
    TableProperties,
} from "lucide-react";
import { EmiPlan, formatINR, effectiveCost } from "@/lib/types";
import { EmiComparisonChart } from "./EmiComparisonChart";
import { useRouter } from "next/navigation";

interface EmiPlansSectionProps {
    plans: EmiPlan[];
    productSlug: string;
    productName: string;
    mrp: number;
    productPrice: number;
}

const tagConfig: Record<string, { icon: React.ReactNode; className: string; color: string }> = {
    "Best Value": {
        icon: <Star className="w-3 h-3" fill="currentColor" />,
        className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
        color: "text-yellow-400",
    },
    "Lowest EMI": {
        icon: <TrendingDown className="w-3 h-3" />,
        className: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        color: "text-blue-400",
    },
    "Most Popular": {
        icon: <Zap className="w-3 h-3" />,
        className: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
        color: "text-purple-400",
    },
    "Shortest Tenure": {
        icon: <Award className="w-3 h-3" />,
        className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        color: "text-emerald-400",
    },
};

function EmiScheduleTable({ plan, productPrice }: { plan: EmiPlan; productPrice: number }) {
    const schedule = useMemo(() => {
        const rows = [];
        const principal = productPrice;
        let balance = principal;

        for (let i = 1; i <= plan.tenure; i++) {
            const interestForMonth = 0; // Forced 0% Interest
            const principalForMonth = plan.monthlyPayment;
            balance = Math.max(0, balance - principalForMonth);

            rows.push({
                month: i,
                emi: plan.monthlyPayment,
                principal: principalForMonth,
                interest: interestForMonth,
                balance,
            });
        }
        return rows;
    }, [plan, productPrice]);

    return (
        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-xs">
                <thead>
                    <tr className="bg-gray-50 border-b border-border">
                        <th className="text-left px-4 py-4 text-text-secondary font-bold uppercase tracking-wider text-[10px]">Month</th>
                        <th className="text-right px-4 py-4 text-text-secondary font-bold uppercase tracking-wider text-[10px]">EMI</th>
                        <th className="text-right px-4 py-4 text-text-secondary font-bold uppercase tracking-wider text-[10px]">Principal</th>
                        <th className="text-right px-4 py-4 text-text-secondary font-bold uppercase tracking-wider text-[10px]">Interest</th>
                        <th className="text-right px-4 py-4 text-text-secondary font-bold uppercase tracking-wider text-[10px]">Balance</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {schedule.map((row, i) => (
                        <tr
                            key={row.month}
                            className={`border-b border-border transition-colors hover:bg-gray-50 ${i === schedule.length - 1 ? "border-transparent" : ""
                                }`}
                        >
                            <td className="px-4 py-3 text-text-secondary">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-text-primary">
                                    {row.month}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right font-black text-text-primary">
                                {formatINR(row.emi)}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600">
                                {formatINR(row.principal)}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-orange-500">
                                {formatINR(row.interest)}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-text-secondary">
                                {formatINR(row.balance)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function EmiPlansSection({
    plans: originalPlans,
    productSlug,
    productName,
    mrp,
    productPrice,
}: EmiPlansSectionProps) {
    const plans = useMemo(() => originalPlans.map(p => ({
        ...p,
        monthlyPayment: Math.round(productPrice / p.tenure),
        totalPayment: productPrice,
    })), [originalPlans, productPrice]);
    const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(
        plans.find((p) => p.recommended) ?? null
    );
    const [activeTab, setActiveTab] = useState<"chart" | "schedule">("chart");
    const router = useRouter();

    const handleProceed = () => {
        if (!selectedPlan) return;
        const query = new URLSearchParams({
            plan: selectedPlan.id,
            tenure: selectedPlan.tenure.toString(),
            monthly: selectedPlan.monthlyPayment.toString(),
            total: selectedPlan.totalPayment.toString(),
            cashback: selectedPlan.cashback.toString(),
            interest: "0", // Forced 0% policy
            productName,
        });
        router.push(`/products/${productSlug}/confirm?${query}`);
    };

    const totalInterest = 0;
    const netSavings = selectedPlan
        ? (mrp > productPrice ? mrp - productPrice : 0) + selectedPlan.cashback
        : 0;

    return (
        <div className="space-y-6">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-xs">
                            💳
                        </span>
                        Choose EMI Tenure
                    </h2>
                    <p className="text-text-secondary text-xs mt-1">
                        {plans.length} plans available · No hidden fees
                    </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    <Zap className="w-3 h-3" />
                    Instant approval
                </div>
            </div>

            {/* Plan list — Premium Fintech Cards */}
            <div className="space-y-3">
                {plans.map((plan, i) => {
                    const isSelected = selectedPlan?.id === plan.id;
                    const tagCfg = plan.tag ? tagConfig[plan.tag] : null;
                    const effective = effectiveCost(plan);

                    return (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => setSelectedPlan(plan)}
                                className={`w-full text-left p-5 flex items-center gap-4 transition-all duration-300 rounded-[1.5rem] border-2 cursor-pointer shadow-sm ${isSelected
                                    ? "bg-accent/[0.02] border-accent shadow-accent/10 shadow-md transform scale-[1.01]"
                                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:shadow-md"
                                    }`}
                            >
                                {/* Radio circle */}
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all bg-white ${isSelected
                                        ? "border-accent shadow-[0_0_10px_rgba(21,94,239,0.3)]"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                    )}
                                </div>

                                {/* Plan info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className={`text-lg font-extrabold ${isSelected ? "text-accent" : "text-gray-900"}`}>
                                            {formatINR(plan.monthlyPayment)}{" "}
                                            <span className="text-sm font-semibold text-gray-500">
                                                / mo
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className="text-sm font-medium text-gray-600">
                                            For {plan.tenure} months • Total: {formatINR(effective)} • Powered by your investments
                                        </span>
                                        {plan.cashback > 0 && (
                                            <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 rounded-md">
                                                🎁 +{formatINR(plan.cashback)} cashback
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <span className="text-xs font-bold px-3 py-1 rounded-[0.5rem] border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm whitespace-nowrap">
                                        0% Interest EMI
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        {tagCfg && plan.tag && (
                                            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm whitespace-nowrap ${tagCfg.className}`}>
                                                {tagCfg.icon}
                                                {plan.tag}
                                            </span>
                                        )}
                                        {plan.recommended && !plan.tag && (
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-accent text-white shadow-sm whitespace-nowrap">
                                                ⭐ Recommended
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* EMI start note */}
            <p className="text-xs text-text-secondary flex items-center gap-1.5 px-1">
                <Info className="w-3.5 h-3.5 text-text-secondary" />
                EMIs starting 3rd of next month · *Total extra payment per month/order value
            </p>

            {/* Selected plan breakdown */}
            <AnimatePresence mode="wait">
                {selectedPlan && (
                    <motion.div
                        key={selectedPlan.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        {/* Financial summary grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                {
                                    label: "Monthly EMI",
                                    value: formatINR(selectedPlan.monthlyPayment),
                                    sub: `× ${selectedPlan.tenure} months`,
                                    color: "text-accent",
                                    bg: "bg-blue-50 border-blue-100",
                                },
                                {
                                    label: "0% Interest",
                                    value: formatINR(0),
                                    sub: "Powered by your mutual funds",
                                    color: "text-orange-600",
                                    bg: "bg-orange-50 border-orange-100",
                                },
                                {
                                    label: "Cashback",
                                    value: formatINR(selectedPlan.cashback),
                                    sub: "On completion",
                                    color: "text-emerald-600",
                                    bg: "bg-emerald-50 border-emerald-100",
                                },
                                {
                                    label: "You Save",
                                    value: formatINR(netSavings > 0 ? netSavings : 0),
                                    sub: netSavings > 0 ? "vs MRP" : "No extra cost with 0% EMI",
                                    color: "text-purple-600",
                                    bg: "bg-purple-50 border-purple-100",
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`rounded-2xl p-4 border shadow-sm ${stat.bg}`}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                                    <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                                    <p className="text-[10px] font-bold text-text-secondary mt-0.5">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tab switcher: Chart vs Schedule */}
                        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit shadow-inner border border-gray-200">
                            <button
                                onClick={() => setActiveTab("chart")}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "chart"
                                    ? "bg-white text-text-primary shadow border border-gray-200/50"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                <BarChart3 className="w-3.5 h-3.5" />
                                Comparison Chart
                            </button>
                            <button
                                onClick={() => setActiveTab("schedule")}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "schedule"
                                    ? "bg-white text-text-primary shadow border border-gray-200/50"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                <TableProperties className="w-3.5 h-3.5" />
                                EMI Schedule
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "chart" ? (
                                <motion.div
                                    key="chart"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <EmiComparisonChart plans={plans} selectedPlanId={selectedPlan.id} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="schedule"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <EmiScheduleTable plan={selectedPlan} productPrice={productPrice} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky CTA */}
            <div className="sticky bottom-6 z-20 mt-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-border shadow-[0_8px_40px_-10px_rgba(5,10,48,0.15)]"
                >
                    <div className="min-w-0">
                        {selectedPlan ? (
                            <>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-0.5">Selected plan</p>
                                <p className="font-black text-text-primary text-sm sm:text-base truncate">
                                    {formatINR(selectedPlan.monthlyPayment)}/mo × {selectedPlan.tenure} months
                                    {selectedPlan.cashback > 0 && (
                                        <span className="text-emerald-600 text-xs font-bold ml-2">
                                            +{formatINR(selectedPlan.cashback)} cashback
                                        </span>
                                    )}
                                </p>
                            </>
                        ) : (
                            <p className="text-text-secondary font-bold text-sm">Select a plan above to proceed</p>
                        )}
                    </div>

                    <button
                        onClick={handleProceed}
                        disabled={!selectedPlan}
                        className={`flex items-center gap-2 px-5 sm:px-7 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 flex-shrink-0 uppercase tracking-wide border-b-2 border-transparent ${selectedPlan
                            ? "bg-text-primary text-white hover:bg-black hover:scale-105 shadow-xl hover:shadow-[0_12px_24px_-8px_rgba(5,10,48,0.4)]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Buy on {selectedPlan?.tenure ?? "—"} months EMI
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
