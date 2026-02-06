import { Search, RefreshCw } from "lucide-react";

const HomeHeader = ({ setSearchQuery, fetchContests, loading }) => (
    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div>
            <div className="flex items-center gap-2 mb-3 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase italic">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connection: Verified_Algorithm_Sync
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                Code <span className="text-green-600">Arena</span>
            </h1>
        </div>

        <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search algorithmic tasks..."
                    className="bg-slate-900/40 border border-slate-800/60 rounded-xl py-2.5 pl-12 pr-4 text-sm w-64 lg:w-80"
                />
            </div>

            <button
                onClick={fetchContests}
                className="p-3 bg-blue-600 rounded-xl hover:bg-green-500"
            >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
    </header>
);

export default HomeHeader;
