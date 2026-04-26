const getDateRange = (range) => {
    const now = new Date();
    let start;

    switch (range) {
        case "daily":
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;

        case "weekly":
            const temp = new Date(now);
            const firstDayOfWeek = temp.getDate() - temp.getDay();
            temp.setDate(firstDayOfWeek);
            start = new Date(temp);
            break;

        case "monthly":
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            break;

        case "yearly":
            start = new Date(now.getFullYear(), 0, 1);
            break;

        default:
            start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export default getDateRange;