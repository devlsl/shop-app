export const minutesSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const minutesPassed = Math.floor((now.getTime() - date.getTime()) / 60000);
    return minutesPassed;
};
