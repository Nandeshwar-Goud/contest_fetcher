import { motion } from "framer-motion";
import { Clock, ExternalLink, Trophy, Globe } from "lucide-react";

const ContestCard = ({ contest }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-[2.5rem] flex flex-col hover:border-blue-500/30 transition-all duration-300 group backdrop-green-sm shadow-xl"
    >
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                <Globe size={10} />
                <span className="text-[9px] font-black uppercase tracking-tighter">
                    {contest.site.split(".")[0]}
                </span>
            </div>
            <Trophy
                size={14}
                className="text-slate-700 group-hover:text-green-500 transition-colors"
            />
        </div>

        <h3 className="text-lg font-bold leading-snug mb-8 min-h-[3rem] line-clamp-2 text-slate-200 group-hover:text-white transition-colors">
            {contest.name}
        </h3>

        <div className="mt-auto pt-6 border-t border-slate-800/40 space-y-5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                    <Clock size={12} className="text-blue-500" />
                    {new Date(contest.start).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
                <span>{contest.duration} Hours</span>
            </div>

            <a
                href={contest.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-white text-black font-black text-[10px] rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white transition-all uppercase tracking-widest shadow-lg shadow-white/5 active:scale-95"
            >
                Solve Task <ExternalLink size={12} />
            </a>
        </div>
    </motion.div>
);

export default ContestCard;
