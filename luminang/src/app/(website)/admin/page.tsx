'use client';

import { Users, DollarSign, Activity, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, Administrator.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard title="Total Users" value="1,240" change="+12%" icon={Users} color="blue" />
                <KpiCard title="Active Players" value="843" change="+5%" icon={Activity} color="green" />
                <KpiCard title="Server Uptime" value="99.9%" change="Stable" icon={Activity} color="amber" />
                <KpiCard title="Pending Reports" value="5" change="-2" icon={AlertCircle} color="red" />
            </div>

            {/* Recent Activity Mock */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent System Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 text-sm border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-gray-400 w-32">2 mins ago</span>
                            <span className="text-gray-200">User <span className="text-amber-400">Player_{900 + i}</span> completed "Barasoain Origin"</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, change, icon: Icon, color }: any) {
    const colors = {
        blue: "text-blue-400 bg-blue-400/10",
        green: "text-green-400 bg-green-400/10",
        amber: "text-amber-400 bg-amber-400/10",
        red: "text-red-400 bg-red-400/10",
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${colors[color as keyof typeof colors]}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {change}
                </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-gray-500">{title}</div>
        </div>
    );
}
