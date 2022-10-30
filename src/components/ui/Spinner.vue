<template>
	<div :class="{ 'p-6 w-full flex items-center justify-center': hasPadding }">
		<div
			:class="[
				'loading rounded-full flex items-center justify-center',
				border,
				size,
				color,
			]"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	border: {
		type: String,
		default: "border-2",
	},
	color: {
		type: String,
		default: "dark",
	},
	hasPadding: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: "w-12 h-12",
	},
});

const color = computed(() => {
	if (props.color === "brand") {
		return "border-rose-500/25 border-t-rose-500";
	}

	if (props.color === "light") {
		return "border-white/25 border-t-white";
	}

	return "border-black/25 border-t-black";
});
</script>
