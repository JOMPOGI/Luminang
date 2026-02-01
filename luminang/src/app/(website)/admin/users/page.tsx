

'use client';

import { Button } from '@/components/ui';
import { Search, Ban, RotateCcw, MoreHorizontal, UserPlus } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const INITIAL_USERS = [
    { id: 1, username: 'Player_001', email: 'player1@example.com', status: 'Active', joined: '2024-01-15' },
    { id: 2, username: 'Lakapati_99', email: 'lakapati@example.com', status: 'Active', joined: '2023-11-22' },
    { id: 3, username: 'BadUser_X', email: 'troll@example.com', status: 'Suspended', joined: '2024-02-10' },
    { id: 4, username: 'Newbie_Explorer', email: 'new@example.com', status: 'Active', joined: '2024-03-01' },
];

export default function UsersPage() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    // Add User Handler (Mock)
    const handleAddUser = () => {
        const id = users.length + 1;
        const newUser = {
            id,
            username: `New_User_${id}`,
            email: `user${id}@example.com`,
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        };
        setUsers([newUser, ...users]);
    };

    // Toggle Status Handler
    const toggleStatus = (id: number) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                return {
                    ...u,
                    status: u.status === 'Active' ? 'Suspended' : 'Active'
                };
            }
            return u;
        }));
    };

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || filter === 'All Status' || user.status === filter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <Button onClick={handleAddUser} variant="primary" className="text-sm gap-2">
                    <UserPlus size={16} /> Add System User
                </Button>
            </div>

            {/* Search Bar */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                        placeholder="Search username or email..."
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none"
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-950 text-gray-400">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{user.username}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400">{user.joined}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-zinc-700 rounded text-amber-500 transition-colors" title="Manage Account">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(user.id)}
                                                    className={`p-2 rounded transition-colors ${user.status === 'Active'
                                                        ? 'hover:bg-red-900/50 text-red-400'
                                                        : 'hover:bg-green-900/50 text-green-400'
                                                        }`}
                                                    title={user.status === 'Active' ? "Suspend User" : "Restore User"}
                                                >
                                                    {user.status === 'Active' ? <Ban size={18} /> : <RotateCcw size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
