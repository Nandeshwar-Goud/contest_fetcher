export const formatIST = (dateString) => {
    
    const utcDate = new Date(dateString + "Z");

    return utcDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
