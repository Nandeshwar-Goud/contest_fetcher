import { useEffect, useMemo, useState } from "react";

export const useContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activePlatform, setActivePlatform] = useState("All");

    const CLIST_USER = import.meta.env.VITE_CLIST_USERNAME;
    const CLIST_KEY = import.meta.env.VITE_CLIST_API_KEY;

    const CODING_RESOURCES =
        "1,2,12,25,26,29,63,65,73,93,102,117,120,126,164,179,240,324";

    const fetchContests = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://clist.by/api/v4/contest/?upcoming=true&resource_ids=${CODING_RESOURCES}&order_by=start`,
                {
                    headers: {
                        Authorization: `ApiKey ${CLIST_USER}:${CLIST_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("CLIST API failed");
            }

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
        } catch (err) {
            console.error(err);
            setContests([]);
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
        searchQuery,
        setSearchQuery,
        fetchContests,
    };
};

