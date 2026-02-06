import { useEffect, useMemo, useState } from "react";

/* ================= CACHE + RATE LIMIT HELPERS ================= */

const CACHE_KEY = "clist:upcomingContests";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

let lastApiCall = 0;
const RATE_LIMIT_MS = 2000;

const getCache = () => {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    try {
        const { data, expiry } = JSON.parse(raw);
        if (Date.now() > expiry) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data;
    } catch {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
};

const setCache = (data) => {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
            data,
            expiry: Date.now() + CACHE_TTL,
        })
    );
};

const rateLimit = async () => {
    const now = Date.now();
    const diff = now - lastApiCall;
    if (diff < RATE_LIMIT_MS) {
        await new Promise((r) => setTimeout(r, RATE_LIMIT_MS - diff));
    }
    lastApiCall = Date.now();
};

/* ===================== MAIN HOOK ===================== */

export const useContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activePlatform, setActivePlatform] = useState("All");

    const CLIST_USER = import.meta.env.VITE_CLIST_USERNAME;
    const CLIST_KEY = import.meta.env.VITE_CLIST_API_KEY;

    const CODING_RESOURCES =
        "1,2,12,25,26,29,63,65,73,93,102,117,120,126,164,179,240,324";

    const fetchContests = async (forceRefresh = false) => {
        setLoading(true);

        try {
            if (!forceRefresh) {
                const cached = getCache();
                if (cached) {
                    setContests(cached);
                    setLoading(false);
                    return;
                }
            }

            await rateLimit();

            const url = `https://clist.by/api/v4/contest/?upcoming=true&resource_ids=${CODING_RESOURCES}&order_by=start`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `ApiKey ${CLIST_USER}:${CLIST_KEY}`,
                },
            });

            const data = await response.json();

            const forbiddenTerms = [
                "math",
                "gaming",
                "puzzle",
                "kaggle",
                "cup",
                "trophy",
                "marathon",
                "webinar",
                "sprint",
                "hiring",
                "job",
                "datsteam",
                "ctftime",
            ];

            const formatted = data.objects
                .filter((c) => {
                    const title = c.event.toLowerCase();
                    const host = c.host.toLowerCase();

                    if (host.includes("naukri") || host.includes("codingninjas"))
                        return true;

                    if (
                        host.includes("kaggle") ||
                        host.includes("cup") ||
                        host.includes("datsteam") ||
                        host.includes("ctftime") ||
                        host.includes("ac")
                    )
                        return false;

                    return !forbiddenTerms.some((w) => title.includes(w));
                })
                .map((c) => ({
                    id: c.id,
                    name: c.event,
                    site: c.host,
                    start: c.start,
                    duration: Math.floor(c.duration / 3600),
                    url: c.href,
                }));

            setContests(formatted);
            setCache(formatted);
        } catch (err) {
            console.error("CLIST fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContests();
    }, []);

    const filtered = useMemo(() => {
        return contests.filter((c) => {
            const matchesSearch = c.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesPlatform =
                activePlatform === "All" ||
                c.site.toLowerCase().includes(activePlatform.toLowerCase());

            return matchesSearch && matchesPlatform;
        });
    }, [contests, searchQuery, activePlatform]);

    return {
        filtered,
        loading,
        platforms: ["All", "Codeforces", "LeetCode", "CodeChef", "AtCoder", "Naukri"],
        activePlatform,
        setActivePlatform,
        setSearchQuery,
        fetchContests,
    };
};
