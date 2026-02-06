const SkeletonCard = () => (
    <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-[2.5rem] animate-pulse">
        <div className="w-16 h-4 bg-slate-800 rounded mb-6"></div>
        <div className="w-full h-5 bg-slate-800 rounded mb-2"></div>
        <div className="w-2/3 h-5 bg-slate-800 rounded mb-10"></div>
        <div className="w-full h-12 bg-slate-800 rounded-2xl"></div>
    </div>
);

export default SkeletonCard;
