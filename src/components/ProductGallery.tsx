"use client";

import { useState } from "react";
import Image from "next/image";

interface Variant {
    id: string;
    color: string | null;
    imageUrl: string | null;
}

interface ProductGalleryProps {
    productName: string;
    productImageUrl: string | null;
    variants: Variant[];
    discount: number;
    brand: string | null;
}

export function ProductGallery({ productName, productImageUrl, variants, discount, brand }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(productImageUrl);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-border aspect-[4/3] lg:aspect-[16/10] shadow-sm flex items-center justify-center p-8">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={productName}
                        fill
                        className="object-contain object-center scale-90 transition-opacity duration-300"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl">
                        📱
                    </div>
                )}

                {/* Discount badge */}
                {discount > 0 && (
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#FFC107] text-[10px] font-extrabold text-yellow-900 shadow-sm">
                            {discount}% OFF
                        </span>
                    </div>
                )}

                {/* Brand badge */}
                {brand && (
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-[10px] font-bold bg-gray-100 border border-border text-text-secondary uppercase">
                            {brand}
                        </span>
                    </div>
                )}
            </div>

            {/* Thumbnail strip */}
            {variants.length > 0 && (
                <div className="flex gap-3">
                    {variants.slice(0, 4).map((v) => (
                        <div
                            key={v.id}
                            onClick={() => {
                                if (v.imageUrl) setSelectedImage(v.imageUrl);
                            }}
                            className={`relative w-16 h-16 rounded-xl overflow-hidden border bg-white shadow-sm flex-shrink-0 cursor-pointer transition-colors p-2 ${selectedImage === v.imageUrl ? "border-accent ring-2 ring-accent/20" : "border-border hover:border-accent"
                                }`}
                        >
                            {v.imageUrl ? (
                                <Image
                                    src={v.imageUrl}
                                    alt={v.color ?? "Variant"}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">📱</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
