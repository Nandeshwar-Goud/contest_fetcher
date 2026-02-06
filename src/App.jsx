import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, ExternalLink, RefreshCw, Search,
  Code2, Trophy, Globe, FilterX
} from 'lucide-react';
import Navbar from './components/Navbar';

const App = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlatform, setActivePlatform] = useState("All");

  // CLIST CONFIG - Replace with your actual credentials
  const CLIST_USER = import.meta.env.VITE_CLIST_USERNAME;
  const CLIST_KEY = import.meta.env.VITE_CLIST_API_KEY;

  // Strictly Algorithmic Resource IDs:
  // 1: Codeforces, 2: CodeChef, 63: LeetCode, 93: AtCoder, 25: HackerRank, 29: HackerEarth
  const CODING_RESOURCES = "1,2,12,25,26,29,63,65,73,93,102,117,120,126,164,179,240,324";

  const fetchContests = async () => {
    setLoading(true);
    try {
      const url = `https://clist.by/api/v4/contest/?upcoming=true&resource_ids=${CODING_RESOURCES}&order_by=start`;

      const response = await fetch(url, {
        headers: { 'Authorization': `ApiKey ${CLIST_USER}:${CLIST_KEY}` }
      });

      if (!response.ok) throw new Error("API Unauthorized");
      const data = await response.json();

      // THE ULTIMATE BLACKLIST
      const forbiddenTerms = [
        "math", "gaming", "puzzle", "kaggle", "cup", "trophy",
        "marathon", "webinar", "sprint", "hiring", "job", "datsteam", "ctftime"
      ];

      const formatted = data.objects
        .filter(c => {
          const title = c.event.toLowerCase();
          const host = c.host.toLowerCase();
          if (host.includes("naukri") || host.includes("codingninjas")) return true;
          // STRICT RULE 1: No Kaggle or Cup-specific hosts
          if (host.includes("kaggle") || host.includes("cup") || host.includes("datsteam") || host.includes("ctftime") || host.includes("ac")) return false;

          // STRICT RULE 2: No forbidden words in the title
          const hasForbiddenWord = forbiddenTerms.some(word => title.includes(word));

          return !hasForbiddenWord;
        })
        .map(c => ({
          id: c.id,
          name: c.event,
          site: c.host,
          start: c.start,
          duration: Math.floor(c.duration / 3600),
          url: c.href,
        }));

      setContests(formatted);
    } catch (error) {
      console.error("Clist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContests(); }, []);

  const filtered = useMemo(() => {
    return contests.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = activePlatform === "All" || c.site.includes(activePlatform.toLowerCase());
      return matchesSearch && matchesPlatform;
    });
  }, [searchQuery, contests, activePlatform]);

  const platforms = ["All", "Codeforces", "LeetCode", "CodeChef", "AtCoder", "Naukri"];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10 custom-scrollbar">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase italic">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
              Connection: Verified_Algorithm_Sync
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
              Code <span className="text-green-600">Arena</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search algorithmic tasks..."
                className="bg-slate-900/40 border border-slate-800/60 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500/50 backdrop-blur-xl transition-all w-64 lg:w-80"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={fetchContests} className="p-3 bg-blue-600 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-600/20 active:scale-95">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {/* QUICK FILTERS */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${activePlatform === p
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-green-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            ) : filtered.length > 0 ? (
              filtered.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))
            ) : (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-700 italic border-2 border-dashed border-slate-900 rounded-[3rem]">
                <FilterX size={48} className="mb-4 opacity-10" />
                <p className="font-mono text-sm tracking-widest uppercase">No verified coding contests found</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

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
          {contest.site.split('.')[0]}
        </span>
      </div>
      <Trophy size={14} className="text-slate-700 group-hover:text-green-500 transition-colors" />
    </div>

    <h3 className="text-lg font-bold leading-snug mb-8 min-h-[3rem] line-clamp-2 text-slate-200 group-hover:text-white transition-colors">
      {contest.name}
    </h3>

    <div className="mt-auto pt-6 border-t border-slate-800/40 space-y-5">
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-blue-500" />
          {new Date(contest.start).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
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

const SkeletonCard = () => (
  <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-[2.5rem] animate-pulse">
    <div className="w-16 h-4 bg-slate-800 rounded mb-6"></div>
    <div className="w-full h-5 bg-slate-800 rounded mb-2"></div>
    <div className="w-2/3 h-5 bg-slate-800 rounded mb-10"></div>
    <div className="w-full h-12 bg-slate-800 rounded-2xl"></div>
  </div>
);

export default App;