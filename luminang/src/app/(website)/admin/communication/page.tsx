'use client';

import { Button } from '@/components/ui';
import { Mail, Bell, Send, Clock, Radio, Megaphone } from 'lucide-react';
import { useState } from 'react';

export default function CommunicationPage() {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Mock History
    const [broadcasts, setBroadcasts] = useState([
        { id: 1, title: 'Maintenance Update', time: '2 days ago', desc: 'Server maintenance scheduled for Tuesday...', type: ['Push', 'Email'] },
        { id: 2, title: 'Welcome New Players', time: '5 days ago', desc: 'A warm welcome to the 500 new players who joined...', type: ['In-Game'] }
    ]);

    const handleSend = () => {
        if (!subject || !content) return;

        setIsSending(true);

        // Simulate API
        setTimeout(() => {
            const newBroadcast = {
                id: Date.now(),
                title: subject,
                time: 'Just now',
                desc: content,
                type: ['Push', 'Email'] // simplified for demo
            };

            setBroadcasts([newBroadcast, ...broadcasts]);
            setSubject('');
            setContent('');
            setIsSending(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Communication Center</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Compose Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                        <Send size={20} /> Compose Broadcast
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Channel</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="accent-amber-500" defaultChecked /> Push Notification
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="accent-amber-500" /> Email Blast
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="accent-amber-500" /> In-Game News
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Target Audience</label>
                            <select className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white">
                                <option>All Users</option>
                                <option>Active in last 7 days</option>
                                <option>Premium Users</option>
                                <option>Inactive (&gt;30 days)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Subject / Title</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                type="text"
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                                placeholder="e.g. Special Weekend Event!"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Message Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white h-32 focus:border-amber-500 outline-none"
                                placeholder="Type your message here..."
                            />
                        </div>

                        <Button
                            onClick={handleSend}
                            disabled={isSending || !subject}
                            variant="primary"
                            className="w-full gap-2 font-bold"
                        >
                            {isSending ? 'Sending...' : <><Send size={16} /> Send Broadcast</>}
                        </Button>
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Clock size={20} /> Recent Broadcasts
                    </h2>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {broadcasts.map((item) => (
                            <div key={item.id} className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 animate-in fade-in slide-in-from-top-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-200">{item.title}</h3>
                                    <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.desc}</p>
                                <div className="flex gap-2 text-xs">
                                    {item.type.includes('Push') && (
                                        <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded flex items-center gap-1">
                                            <Bell size={10} /> Push
                                        </span>
                                    )}
                                    {item.type.includes('Email') && (
                                        <span className="bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded flex items-center gap-1">
                                            <Mail size={10} /> Email
                                        </span>
                                    )}
                                    {item.type.includes('In-Game') && (
                                        <span className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded flex items-center gap-1">
                                            <Megaphone size={10} /> News
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
