import dayjs from "dayjs";

export const useDates = () => {
	const formatDate = (d) => {
		const date = d.toDate();
		const fd = dayjs(date);
		return {
			date: fd.format("YYYY-MM-DD"),
			day: fd.format("DD"),
			default: d,
			hour: fd.format("HH"),
			minute: fd.format("mm"),
			month: fd.format("MM"),
			ampm: fd.format("a"),
			seconds: fd.format("ss"),
			time: fd.format("HH:mm:ss"),
			year: fd.format("YYYY"),
		};
	};

	return { formatDate };
};
