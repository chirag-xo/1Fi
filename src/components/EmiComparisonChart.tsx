"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { EmiPlan, formatINR } from "@/lib/types";
import { BarChart2 } from "lucide-react";

interface EmiComparisonChartProps {
    plans: EmiPlan[];
    selectedPlanId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-3 text-xs space-y-1 border border-border">
                <p className="font-bold text-text-primary mb-2">{label} months</p>
                {payload.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (entry: any) => (
                        <p key={entry.name} style={{ color: entry.color }} className="font-semibold">
                            {entry.name}: {formatINR(entry.value)}
                        </p>
                    )
                )}
            </div>
        );
    }
    return null;
};

export function EmiComparisonChart({
    plans,
    selectedPlanId,
}: EmiComparisonChartProps) {
    const data = useMemo(
        () =>
            plans.map((p) => ({
                tenure: p.tenure,
                "Monthly EMI": p.monthlyPayment,
                "Total Payment": p.totalPayment,
                "After Cashback": p.totalPayment - p.cashback,
                id: p.id,
            })),
        [plans]
    );

    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
                <BarChart2 className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-text-primary">Plan Comparison</h3>
                <span className="text-xs text-text-secondary ml-auto">
                    Select a bar to compare
                </span>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 4, right: 4, left: 0, bottom: 4 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="tenure"
                            tickFormatter={(v) => `${v}m`}
                            tick={{ fill: "#64748b", fontSize: 11, fontWeight: "bold" }}
                            axisLine={{ stroke: "#e2e8f0" }}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                            tick={{ fill: "#6b7280", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={52}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ fontSize: 11, color: "#6b7280" }}
                        />
                        <Bar dataKey="Monthly EMI" fill="#4f8ef7" radius={[4, 4, 0, 0]}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.id}
                                    fill={
                                        entry.id === selectedPlanId ? "#4f8ef7" : "rgba(79,142,247,0.4)"
                                    }
                                />
                            ))}
                        </Bar>
                        <Bar dataKey="After Cashback" fill="#7c3aed" radius={[4, 4, 0, 0]}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.id}
                                    fill={
                                        entry.id === selectedPlanId ? "#7c3aed" : "rgba(124,58,237,0.35)"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
