import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Bell } from 'lucide-react';

const Schedule = ({ contests = [] }) => {
    // Function to calculate relative time
    const getRelativeTime = (startDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const diffInMs = start - now;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) return `${diffInDays}d ${diffInHours % 24}h remaining`;
        if (diffInHours > 0) return `${diffInHours}h remaining`;
        return "Starting soon";
    };

    return (
        <div className="bg-slate-900/30 border border-slate-800/60 rounded-[2rem] p-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Calendar className="text-blue-500" />
                        Contest Timeline
                    </h2>
                    <p className="text-slate-500 text-sm mt-1 font-mono tracking-tighter">
                        CHRONOLOGICAL_SEQUENCE_LOADED
                    </p>
                </div>
                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
                    View Full Calendar
                </button>
            </div>

            <div className="space-y-6">
                {contests.length > 0 ? (
                    contests.slice(0, 8).map((contest, idx) => (
                        <motion.div
                            key={contest.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative flex items-start gap-6 group"
                        >
                            {/* Timeline Line & Dot */}
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_#3b82f6] group-hover:scale-125 transition-transform"></div>
                                {idx !== 7 && <div className="w-[2px] h-20 bg-slate-800 group-hover:bg-blue-900/50 transition-colors"></div>}
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 bg-slate-800/20 border border-slate-800/40 p-5 rounded-2xl group-hover:border-blue-500/30 transition-all hover:bg-slate-800/40">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                            {contest.site.split('.')[0]}
                                        </span>
                                        <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                                            {contest.name}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-xs font-mono text-slate-400">{getRelativeTime(contest.start)}</p>
                                            <p className="text-[10px] text-slate-600 flex items-center justify-end gap-1">
                                                <Clock size={10} /> {contest.duration}H Session
                                            </p>
                                        </div>
                                        <button className="p-2 bg-slate-900 rounded-lg text-slate-500 hover:text-white hover:bg-blue-600 transition-all">
                                            <Bell size={16} />
                                        </button>
                                        <a href={contest.url} target="_blank" className="text-slate-600 hover:text-blue-400">
                                            <ChevronRight size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-slate-500 italic text-center py-10">No upcoming events in timeline.</p>
                )}
            </div>
        </div>
    );
};

export default Schedule;