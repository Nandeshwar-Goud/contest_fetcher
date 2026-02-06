import { AnimatePresence } from "framer-motion";
import ContestCard from "./ContestCard";
import SkeletonCard from "./SkeletonCard";
import { FilterX } from "lucide-react";

const ContestGrid = ({ contests, loading }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <AnimatePresence>
            {loading
                ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                : contests.length > 0
                    ? contests.map((c) => <ContestCard key={c.id} contest={c} />)
                    : (
                        <div className="col-span-full py-24 flex flex-col items-center text-slate-700">
                            <FilterX size={48} />
                            <p>No verified coding contests found</p>
                        </div>
                    )}
        </AnimatePresence>
    </div>
);

export default ContestGrid;
