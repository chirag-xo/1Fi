export interface Variant {
    id: string;
    productId: string;
    color: string;
    storage: string;
    imageUrl: string | null;
}

export interface EmiPlan {
    id: string;
    productId: string;
    tenure: number;
    monthlyPayment: number;
    /** @deprecated Enforced 0% interest policy. Do not use. */
    interestRate?: number;
    cashback: number;
    totalPayment: number;
    recommended: boolean;
    label?: "BEST_VALUE" | "MOST_POPULAR" | "LOWEST_EMI" | "SHORTEST_TENURE";
    tag: string | null;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    brand: string;
    mrp: number;
    price: number;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductWithDetails extends Product {
    variants: Variant[];
    emiPlans: EmiPlan[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

/** Returns the effective cost after cashback */
export function effectiveCost(plan: EmiPlan): number {
    return plan.totalPayment - plan.cashback;
}

/** Savings vs MRP */
export function savings(plan: EmiPlan, mrp: number): number {
    return mrp - effectiveCost(plan);
}

/** Format currency to INR */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}
