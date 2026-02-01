'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, FileText, BarChart3, ShieldAlert, Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAdmin, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (!user || !isAdmin) {
                router.push('/dashboard'); // Kick non-admins out
            }
        }
    }, [user, isAdmin, isLoading, router]);


    if (isLoading) {
        return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-amber-500">Loading Admin Console...</div>;
    }

    if (!isAdmin) return null; // Prevent flash


    const NAV_ITEMS = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'User Management', href: '/admin/users', icon: Users },
        { name: 'Game Content', href: '/admin/content', icon: FileText },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Moderation', href: '/admin/moderation', icon: ShieldAlert },
        { name: 'Communication', href: '/admin/communication', icon: Mail },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 flex pt-16">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block fixed top-16 bottom-0 overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-amber-500 font-bold mb-6 tracking-wider text-xs uppercase">Admin Console</h2>
                    <nav className="space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-amber-900/20 text-amber-400 border border-amber-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-zinc-800'
                                        }`}>
                                        <Icon size={18} />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-zinc-800">
                        <Link href="/dashboard">
                            <Button variant="secondary" className="w-full text-xs">
                                Exit to App
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto min-h-[calc(100vh-64px)]">
                {children}
            </main>
        </div>
    );
}
