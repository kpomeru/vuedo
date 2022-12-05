<template>
	<div
		:class="[
			'rounded-xl flex flex-col items-center px-4 py-3 cursor-pointer',
			curDate === date.fullDate
				? 'bg-rose-500 text-white'
				: ' hover:bg-slate-200',
			{ 'bg-indigo-500 text-white': dropState === date.fullDate },
		]"
		:title="date.fullDate"
		@drop="moveTask($event, { option: 'date', target: date.fullDate })"
		@dragover="
			(e) => {
				e.preventDefault();
				dropState = date.fullDate;
			}
		"
		@dragenter="
			(e) => {
				e.preventDefault();
				dropState = date.fullDate;
			}
		"
		@dragleave="
			(e) => {
				e.preventDefault();
				dropState = null;
			}
		"
	>
		<span class="uppercase text-xs">
			{{ date.day.short }}
		</span>
		<h5>
			{{ date.day.date }}
		</h5>
	</div>
</template>

<script setup>
import { useProjects } from "@/compositions/projects";
const { dropState, moveTask } = useProjects();

defineProps({
	curDate: { type: String, default: "" },
	date: { type: Object, required: true },
});
</script>
