import { CheckCircle } from "lucide-react";

const TRUST_BADGES = [
    "0% Interest EMI",
    "No Credit Score Required",
    "Instant Eligibility Check",
    "Paperless & Secure",
    "Investments Continue Growing",
    "No Foreclosure Charges"
];

export function TrustIndicators() {
    return (
        <div className="pt-8 border-t border-border/50">
            <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm text-text-secondary font-medium">
                {TRUST_BADGES.map((badge) => (
                    <div key={badge} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{badge}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
