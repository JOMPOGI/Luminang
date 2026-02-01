'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md">
                {/* Clear, non-technical heading */}
                <h1 className="text-3xl font-serif text-amber-400 mb-4">
                    Something Went Wrong
                </h1>

                {/* User-friendly explanation */}
                <p className="text-gray-300 mb-2 text-lg">
                    We encountered an unexpected problem while loading this page.
                </p>

                <p className="text-gray-400 mb-8 text-sm">
                    Don't worry—your progress is safe. Try one of the options below to continue.
                </p>

                {/* Clear recovery options */}
                <div className="space-y-4">
                    <Button
                        variant="primary"
                        onClick={reset}
                        className="w-full"
                        aria-label="Try loading this page again"
                    >
                        Try Again
                    </Button>

                    <Link href="/" className="block">
                        <Button
                            variant="secondary"
                            className="w-full"
                            aria-label="Return to home page"
                        >
                            Return to Home
                        </Button>
                    </Link>
                </div>

                {/* Additional help */}
                <p className="text-gray-500 text-xs mt-8">
                    If this problem continues, please contact support or try refreshing your browser.
                </p>
            </div>
        </div>
    );
}
