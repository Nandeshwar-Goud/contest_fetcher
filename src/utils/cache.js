export const getCache = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
        const { data, expiry } = JSON.parse(cached);
        if (Date.now() > expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

export const setCache = (key, data, ttlMs) => {
    const payload = {
        data,
        expiry: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(payload));
};
