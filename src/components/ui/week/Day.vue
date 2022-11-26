<template>
	<div
		:class="[
			'rounded-xl flex flex-col items-center px-4 py-3 cursor-pointer',
			curDate === date.fullDate
				? 'bg-rose-500 text-white'
				: ' hover:bg-slate-200',
		]"
		:title="date.fullDate"
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
defineProps({
	curDate: { type: String, default: "" },
	date: { type: Object, required: true },
});
</script>
