import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Calendar,
    Trophy,
    Settings,
    Menu,
    X
} from 'lucide-react';

const Navbar = ({ setView, currentView }) => {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, view: 'dashboard' },
        { label: 'Schedule', icon: <Calendar size={20} />, view: 'schedule' },
        { label: 'Rankings', icon: <Trophy size={20} />, view: 'rankings' },
        { label: 'Settings', icon: <Settings size={20} />, view: 'settings' },
    ];

    const NavContent = () => (
        <div className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => (
                <motion.div
                    key={item.view}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                        setView(item.view);
                        setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${currentView === item.view
                        ? 'bg-green-600/10 text-green-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" className="w-8 h-8" />
                    <span className="font-bold text-white">BitWiseBeast</span>
                </div>

                <button onClick={() => setOpen(true)}>
                    <Menu className="text-white" size={24} />
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                            <span className="font-bold text-white">Menu</span>
                            <X
                                className="text-white cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <NavContent />
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <nav className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col h-screen sticky top-0">
                <div
                    className="p-6 flex items-center gap-3 cursor-pointer"
                    onClick={() => setView('dashboard')}
                >
                    <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold text-white">
                        BitWiseBeast
                    </span>
                </div>

                <NavContent />

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 p-4 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                            Status
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-300">
                                Systems Nominal
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
