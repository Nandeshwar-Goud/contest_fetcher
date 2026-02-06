let lastCallTime = 0;
const MIN_INTERVAL = 1500; // 1.5 sec

export const rateLimit = async () => {
    const now = Date.now();
    const diff = now - lastCallTime;

    if (diff < MIN_INTERVAL) {
        await new Promise((res) =>
            setTimeout(res, MIN_INTERVAL - diff)
        );
    }

    lastCallTime = Date.now();
};
