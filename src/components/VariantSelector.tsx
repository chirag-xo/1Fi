"use client";

import { useState } from "react";

interface Variant {
    id: string;
    color: string;
    storage: string;
    imageUrl: string | null;
}

export function VariantSelector({ variants }: { variants: Variant[] }) {
    const [selected, setSelected] = useState(variants[0]?.id ?? "");

    return (
        <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
                <button
                    key={v.id}
                    onClick={() => setSelected(v.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${selected === v.id
                            ? "border-accent bg-accent/15 text-accent"
                            : "border-white/10 bg-white/4 text-text-secondary hover:border-white/20 hover:text-text-primary"
                        }`}
                >
                    {v.color} · {v.storage}
                </button>
            ))}
        </div>
    );
}
