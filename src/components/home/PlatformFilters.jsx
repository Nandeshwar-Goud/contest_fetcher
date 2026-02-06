const PlatformFilters = ({ platforms, activePlatform, setActivePlatform }) => (
    <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
        {platforms.map((p) => (
            <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${activePlatform === p
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}
            >
                {p}
            </button>
        ))}
    </div>
);

export default PlatformFilters;
