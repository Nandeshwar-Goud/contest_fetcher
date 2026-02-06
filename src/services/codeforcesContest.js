import { getCache, setCache } from "../utils/cache";
import { rateLimit } from "../utils/rateLimit";

const CONTEST_CACHE_KEY = "cf:lastFinishedContest";
const CONTEST_TTL = 6 * 60 * 60 * 1000; // 6 hours
const STANDINGS_TTL = 60 * 60 * 1000; // 1 hour

export const fetchLastFinishedContest = async () => {
    const cached = getCache(CONTEST_CACHE_KEY);
    if (cached) return cached;

    await rateLimit();

    const res = await fetch("https://codeforces.com/api/contest.list");
    const data = await res.json();

    if (data.status !== "OK") {
        throw new Error("Contest list fetch failed");
    }

    const lastFinished = data.result.find(
        (contest) => contest.phase === "FINISHED"
    );

    setCache(CONTEST_CACHE_KEY, lastFinished, CONTEST_TTL);
    return lastFinished;
};

export const fetchContestStandings = async (contestId) => {
    const cacheKey = `cf:standings:${contestId}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    await rateLimit();

    const url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=50`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
        throw new Error("Standings fetch failed");
    }

    const standings = data.result.rows
        .filter(row => row.party.members.length > 0)
        .map(row => ({
            rank: row.rank,
            handle: row.party.members[0].handle,
            points: row.points,
        }));

    setCache(cacheKey, standings, STANDINGS_TTL);
    return standings;
};
