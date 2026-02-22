import Link from "next/link";

export default function NotFound() {
    return (
        <div className="pt-24 pb-20 flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-md">
                <div className="text-7xl mb-6">🔍</div>
                <h1 className="text-4xl font-bold gradient-text mb-3">404</h1>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                    Product Not Found
                </h2>
                <p className="text-text-secondary mb-8">
                    The product you are looking for does not exist or has been removed.
                </p>
                <Link href="/" className="btn-primary text-white">
                    Back to Products
                </Link>
            </div>
        </div>
    );
}
