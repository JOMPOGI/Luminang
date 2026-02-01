'use client';

import { Button } from '@/components/ui';
import { Edit2, Upload, Trash2, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function ContentPage() {
    // Regions State
    const [regions, setRegions] = useState([
        { id: 1, name: "Barasoain Origin" },
        { id: 2, name: "Intramuros Walls" },
        { id: 3, name: "Banaue Terraces" }
    ]);

    // Announcements State
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: "Weekend Event", content: "2x EXP for all players this weekend!", active: true }
    ]);

    const [newRegion, setNewRegion] = useState('');
    const [isAddingRegion, setIsAddingRegion] = useState(false);

    // Handlers
    const addRegion = () => {
        if (!newRegion.trim()) return;
        setRegions([...regions, { id: Date.now(), name: newRegion }]);
        setNewRegion('');
        setIsAddingRegion(false);
    };

    const deleteRegion = (id: number) => {
        setRegions(regions.filter(r => r.id !== id));
    };

    const addAnnouncement = () => {
        const newAnn = {
            id: Date.now(),
            title: "New Update",
            content: "Maintenance scheduled.",
            active: true
        };
        setAnnouncements([newAnn, ...announcements]);
    };

    const deleteAnnouncement = (id: number) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Game Content</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Active Regions */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-amber-400">Active Regions</h2>
                        <button
                            onClick={() => setIsAddingRegion(!isAddingRegion)}
                            className="p-1 hover:bg-zinc-800 rounded text-amber-500"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    {isAddingRegion && (
                        <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-2">
                            <input
                                value={newRegion}
                                onChange={(e) => setNewRegion(e.target.value)}
                                className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-1 text-sm text-white"
                                placeholder="Region Name..."
                                autoFocus
                            />
                            <button onClick={addRegion} className="text-green-400 font-bold px-2">OK</button>
                        </div>
                    )}

                    <div className="space-y-3">
                        {regions.map((region) => (
                            <div key={region.id} className="flex items-center justify-between bg-zinc-950 p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <span className="text-white font-medium">{region.name}</span>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-zinc-800 rounded text-blue-400 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteRegion(region.id)}
                                        className="p-2 hover:bg-zinc-800 rounded text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-amber-400">Live Announcements</h2>
                        <button onClick={addAnnouncement} className="p-1 hover:bg-zinc-800 rounded text-amber-500">
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {announcements.map(ann => (
                            <div key={ann.id} className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-lg relative group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-amber-200">{ann.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded">Active</span>
                                        <button
                                            onClick={() => deleteAnnouncement(ann.id)}
                                            className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">{ann.content}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="secondary" className="w-full text-xs mt-4">View Archive</Button>
                </div>
            </div>
        </div>
    );
}
