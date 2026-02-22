"use client";

import { motion } from "framer-motion";
import {
    Banknote,
    TrendingUp,
    Gift,
    Target,
    IndianRupee,
} from "lucide-react";
import { EmiPlan, formatINR, effectiveCost, savings } from "@/lib/types";

interface EmiBreakdownPanelProps {
    plan: EmiPlan;
    mrp: number;
}

export function EmiBreakdownPanel({ plan, mrp }: EmiBreakdownPanelProps) {
    const principal = mrp > plan.totalPayment ? mrp : plan.totalPayment;
    const interest = 0; // Forced to 0 per 1Fi policy
    const effective = effectiveCost(plan);
    const saved = savings(plan, mrp);

    const items = [
        {
            icon: <Banknote className="w-4 h-4" />,
            label: "Principal Amount",
            value: formatINR(principal),
            description: "Base product price",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
        },
        {
            icon: <TrendingUp className="w-4 h-4" />,
            label: "0% Interest EMI",
            value: formatINR(0),
            description: "Powered by your mutual funds",
            color: "text-orange-400",
            bg: "bg-orange-400/10",
        },
        {
            icon: <Gift className="w-4 h-4" />,
            label: "Cashback",
            value: `− ${formatINR(plan.cashback)}`,
            description: "Applied after completion",
            color: "text-green-400",
            bg: "bg-green-400/10",
        },
        {
            icon: <Target className="w-4 h-4" />,
            label: "Effective Cost",
            value: formatINR(effective),
            description: "Total − Cashback",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            highlight: true,
        },
    ];

    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
                <IndianRupee className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-text-primary">Financial Breakdown</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {items.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className={`rounded-xl p-4 ${item.highlight ? "border border-purple-500/30 bg-purple-500/10" : "bg-white/[0.03] border border-white/5"}`}
                    >
                        <div className={`inline-flex p-1.5 rounded-lg ${item.bg} ${item.color} mb-2`}>
                            {item.icon}
                        </div>
                        <p className="text-xs text-text-secondary mb-1">{item.label}</p>
                        <p className={`font-bold text-sm ${item.highlight ? "text-purple-300" : "text-text-primary"}`}>
                            {item.value}
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5 opacity-70">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Savings highlight */}
            {saved > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
                >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Gift className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-sm">
                        <span className="text-green-400 font-bold">{formatINR(saved)}</span>
                        <span className="text-text-secondary ml-1">
                            total savings vs MRP with this plan
                        </span>
                    </p>
                </motion.div>
            )}
        </div>
    );
}
