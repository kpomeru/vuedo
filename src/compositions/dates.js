import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

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

	const formatDateLite = (d) => {
		return {
		fullDate: d.format("YYYY-MM-DD"),
		day: {
			date: d.format("D"),
			long: d.format("dddd"),
			ordinal: d.format("Do"),
			short: d.format("ddd"),
		},
		month: {
			long: d.format("MMMM"),
			number: d.format("M"),
			short: d.format("MMM"),
		},
	};
	}

	return { formatDate, formatDateLite };
};
