<template>
	<div class="divide-y relative">
		<div class="flex items-center justify-between pb-4">
			<h4 v-if="viewDate" class="text-rose-500">
				<span>{{
					`${viewDate.day.long}, ${viewDate.day.ordinal} ${
						viewDate.month.short
					}. ${dayjs(viewDate.fullDate).format("YYYY")}`
				}}</span>
			</h4>
			<div class="relative">
				<input
					class="opacity-0 right-0 top-0 absolute pointer-events-none"
					ref="dateSelector"
					type="date"
					:value="(viewDate && viewDate.fullDate) || null"
					@change="updateDate"
				/>
				<!-- @change="(e) => (viewDate = formatDate(e.target.value))" -->
				<IconButton color="white" @click="dateSelector.showPicker()">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
						/>
						<path
							fill-rule="evenodd"
							d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
							clip-rule="evenodd"
						/>
					</svg>
				</IconButton>
			</div>
		</div>

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
import { computed, onMounted, ref } from "vue";

import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";
import { useDates } from "@/compositions/dates";
const { formatDateLite: formatDate } = useDates();

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const projectsStore = useProjectsStore();
const { viewDate } = storeToRefs(projectsStore);

const dateSelector = ref(null);

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

const updateDate = (e) => {
	viewDate.value = formatDate(dayjs(e.target.value));
};

onMounted(() => {
	if (!viewDate.value) {
		viewDate.value = formatDate(dayjs());
	}
});
</script>
