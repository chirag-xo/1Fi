"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TrendingUp, Menu, X } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    if (pathname.startsWith("/products/")) return null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-lg group-hover:shadow-accent/40 transition-shadow">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-extrabold text-lg tracking-tight text-text-primary">
                            digipay
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { href: "/", label: "CREDIT & LOANS" },
                            { href: "#features", label: "INSURANCE SERVICES" },
                            { href: "#invest", label: "INVESTMENT & LOANS" },
                            { href: "#business", label: "BUSINESS SERVICES" },
                            { href: "#enterprise", label: "ENTERPRISE SERVICES" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[10px] font-bold tracking-wider transition-all duration-200 uppercase ${pathname === link.href
                                    ? "text-accent"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                <span className="block">{link.label.split(" ")[0]}</span>
                                {link.label.split(" ").slice(1).join(" ")}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/" className="btn-secondary px-4 py-2 border border-border bg-white hover:bg-gray-50 text-xs text-text-primary">
                            SIGN UP <br /><span className="text-text-secondary font-medium">LOG IN</span>
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-b border-border px-4 pb-4 pt-2 shadow-lg">
                    <nav className="flex flex-col gap-1">
                        {[
                            { href: "/", label: "CREDIT & LOANS" },
                            { href: "#features", label: "INSURANCE SERVICES" },
                            { href: "#invest", label: "INVESTMENT & LOANS" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-gray-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
