import { Search, RefreshCw } from "lucide-react";

const HomeHeader = ({
    searchQuery,        // ✅ must be here
    setSearchQuery,
    fetchContests,
    loading,
}) => {
    return (
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
                    Code <span className="text-green-600">Arena</span>
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        size={16}
                    />
                    <input
                        value={searchQuery}                 // ✅ controlled input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search algorithmic tasks..."
                        className="bg-slate-900/40 border border-slate-800/60 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500/50 transition-all w-64 lg:w-80"
                    />
                </div>

                <button
                    onClick={fetchContests}
                    className="p-3 bg-blue-600 rounded-xl hover:bg-green-500 transition-all"
                >
                    <RefreshCw
                        size={18}
                        className={loading ? "animate-spin" : ""}
                    />
                </button>
            </div>
        </header>
    );
};

export default HomeHeader;
