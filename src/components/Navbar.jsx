import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Trophy, Settings, Terminal } from 'lucide-react';

const Navbar = ({ setView, currentView }) => {
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', view: 'dashboard' },
        { icon: <Calendar size={20} />, label: 'Schedule', view: 'schedule' },
        { icon: <Trophy size={20} />, label: 'Rankings', view: 'rankings' },
        { icon: <Settings size={20} />, label: 'Settings', view: 'settings' },
    ];

    return (
        <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>

                <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight text-white">BitWiseBeast</span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item, idx) => {
                    const isActive = currentView === item.view;

                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ x: 5 }}
                            onClick={() => setView(item.view)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors
        ${isActive
                                    ? 'bg-green-600/10 text-green-400'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </motion.div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-300 font-medium">Systems Nominal</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;