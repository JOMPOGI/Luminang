
import { Header, Footer } from "@/components/layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold-500 text-black px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-gold-600"
            >
                Skip to main content
            </a>
            <ErrorBoundary>
                <Header />
                <main id="main-content" className="pt-16 min-h-screen">
                    {children}
                </main>
                <Footer />
            </ErrorBoundary>
        </>
    );
}
