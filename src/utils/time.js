// Parse CLIST / Codeforces time as UTC
export const parseUTC = (dateString) => {
    if (!dateString) return null;

    // Add Z only if not already present
    return new Date(
        dateString.endsWith("Z") ? dateString : dateString + "Z"
    );
};

// Format date in IST
export const formatIST = (dateString) => {
    const date = parseUTC(dateString);

    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
