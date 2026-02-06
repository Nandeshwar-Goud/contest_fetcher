import { useEffect, useState } from "react";
import { Trophy, Clock, ExternalLink } from "lucide-react";
import {
    fetchLastFinishedContest,
    fetchContestStandings,
} from "../services/codeforcesContest";

const Rankings = () => {
    const [contest, setContest] = useState(null);
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const lastContest = await fetchLastFinishedContest();
                setContest(lastContest);

                const standings = await fetchContestStandings(lastContest.id);
                setRankings(standings);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Trophy className="text-yellow-500" size={28} />
                    <h1 className="text-3xl font-black uppercase tracking-tight">
                        Contest Rankings
                    </h1>
                </div>

                {contest && (
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                        <Clock size={14} />
                        {contest.name}
                    </div>
                )}
            </div>

            {/* Leaderboard */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl overflow-hidden">
                {loading ? (
                    <p className="p-6 text-slate-500 font-mono">
                        Loading last Codeforces contest…
                    </p>
                ) : (
                    rankings.map((user) => (
                        <div
                            key={user.rank}
                            className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 last:border-none hover:bg-slate-800/40 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-10 text-center font-bold text-slate-400">
                                    #{user.rank}
                                </span>

                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-slate-200">
                                        {user.handle}
                                    </p>

                                    <a
                                        href={`https://codeforces.com/profile/${user.handle}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-500 hover:text-blue-400 transition-colors"
                                        title="View Codeforces profile"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>

                            <div className="font-mono text-sm text-slate-300">
                                {user.points} pts
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Rankings;
