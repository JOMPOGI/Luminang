import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-9xl font-serif text-amber-500/20 font-bold mb-4">404</h1>
            <h2 className="text-3xl font-serif text-amber-500 mb-2">Lost in the Mists?</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                The region you are looking for does not exist on our maps. It may have been lost to time, or simply never existed.
            </p>
            <Link href="/">
                <Button variant="primary">
                    Return to Civilization
                </Button>
            </Link>
        </div>
    );
}
