import { parseUTC } from "./time";

// Detect Apple devices (Mac, iPhone, iPad)
const isAppleDevice = () => {
    return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
};

const formatGoogleDate = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const openGoogleCalendar = (contest) => {
    const start = parseUTC(contest.start);
    const end = new Date(start.getTime() + contest.duration * 60 * 60 * 1000);

    const startStr = formatGoogleDate(start);
    const endStr = formatGoogleDate(end);

    const text = encodeURIComponent(contest.name);
    const details = encodeURIComponent(`Contest Link: ${contest.url}`);
    const location = encodeURIComponent(contest.site);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;

    window.open(url, "_blank");
};

const downloadICS = (contest) => {
    const start = parseUTC(contest.start);
    const end = new Date(start.getTime() + contest.duration * 60 * 60 * 1000);

    const startICS = formatICSDate(start);
    const endICS = formatICSDate(end);

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${contest.name}
DESCRIPTION:${contest.url}
DTSTART:${startICS}
DTEND:${endICS}
LOCATION:${contest.site}
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Contest Reminder
END:VALARM
END:VEVENT
END:VCALENDAR
`.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${contest.name}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};

// Main function to use
export const addToCalendar = (contest) => {
    if (isAppleDevice()) {
        downloadICS(contest);   // Native Apple Calendar
    } else {
        openGoogleCalendar(contest);  // Google Calendar
    }
};
