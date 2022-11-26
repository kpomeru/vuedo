<template>
	<div class="divide-y">
		<h4 v-if="viewDate" class="text-center md:text-left pb-4 text-rose-500">
			<span>{{
				`${viewDate.day.long}. ${viewDate.day.ordinal} ${
					viewDate.month.long
				} ${dayjs(viewDate.fullDate).format("YYYY")}`
			}}</span>
		</h4>

		<div
			class="flex overflow-x-auto items-center md:justify-between p-4 bg-slate-100 md:bg-transparent -mx-6 md:pb-0 md:px-0 md:m-0"
		>
			<span
				class="rounded-full h-8 w-8 bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shrink-0 grow-0 mr-4 cursor-pointer"
				title="Previous date"
				@click="setDate(-1)"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
			<div
				class="flex items-center justify-center md:justify-between grow"
			>
				<Day
					v-for="(i, j) in week"
					:key="`week-day-${j}`"
					:cur-date="(viewDate && viewDate.fullDate) || ''"
					:date="i"
					@click="viewDate = i"
				/>
			</div>
			<span
				class="rounded-full h-8 w-8 bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shrink-0 grow-0 ml-4 cursor-pointer"
				title="Next date"
				@click="setDate(1)"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</div>
	</div>
</template>

<script setup>
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { computed, onMounted, ref, watch } from "vue";

import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const projectStore = useProjectsStore();
const { viewDate } = storeToRefs(projectStore);


const formatDate = (d) => {
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
};

const week = computed(() => {
	const days = [];
	if (!viewDate.value) {
		return days;
	}

	for (let index = 0; index <= 6; index++) {
		const x = dayjs(viewDate.value.fullDate).day(index);
		days.push(formatDate(x));
	}

	return days;
});

const setDate = (v = 1) => {
	viewDate.value = formatDate(dayjs(viewDate.value.fullDate).add(v, "day"));
};

onMounted(() => {
	if (!viewDate.value) {
		viewDate.value = formatDate(dayjs());
	}
});
</script>
