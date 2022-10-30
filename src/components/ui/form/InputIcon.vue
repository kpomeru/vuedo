<template>
	<span
		:class="[
			'flex items-center justify-center border h-12 md:h-10 px-4 md:px-3 rounded-md',
			activeBorder,
			borderStyle,
		]"
	>
		<slot></slot>
	</span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	error: { type: Boolean, default: false },
	position: { type: String, default: "left" },
});

const activeBorder = computed(() =>
	props.position === "left"
		? "border-r-0 rounded-r-none"
		: "border-l-0 rounded-l-none"
);

const borderStyle = computed(() => {
	return props.error
		? "border-red-300 focus:border-red-300 focus:ring-red"
		: "border-slate-300 focus:border-violet-500";
});
</script>
