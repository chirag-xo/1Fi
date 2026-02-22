import type { Metadata } from "next";
import "./globals.css"; export const metadata: Metadata = {
    title: {
        default: "SmartEMI — Intelligent EMI Selection Platform",
        template: "%s | SmartEMI",
    },
    description:
        "Compare EMI plans intelligently. Find the lowest monthly payment, best cashback, and smartest financial decisions for your next purchase.",
    keywords: ["EMI", "buy now pay later", "smartphone EMI", "EMI calculator", "fintech"],
    authors: [{ name: "SmartEMI" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "SmartEMI",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <div className="relative z-10 min-h-screen flex flex-col">
                    <main className="flex-1">{children}</main>
                    <footer className="border-t border-border py-8 text-center text-sm text-text-secondary">
                        <p>
                            © 2026 SmartEMI — Intelligent EMI Selection Platform. Built with
                            ❤️ for 1Fi.
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
