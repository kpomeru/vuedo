<template>
	<input
		:class="[
			'appearance-none block w-full px-4 items-center h-12 md:h-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition duration-150 ease-in-out sm:text-sm sm:leading-5  bg-white  disabled:bg-slate-200 disabled:cursor-not-allowed readonly:cursor-not-allowed placeholder:text-sm',
			iconSiblingStyle,
			style,
		]"
		:required="required"
		:type="type"
		:value="value"
		@input="$emit('update:value', $event.target.value)"
	/>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	error: { type: Boolean, default: false },
	icon: { type: String, default: "" },
	required: { type: Boolean, default: false },
	type: { type: String, default: "text" },
	value: { type: String },
});

defineEmits(["update:value"]);

const iconSiblingStyle = computed(() => {
	if (!props.icon) {
		return "";
	}

	return props.icon === "right"
		? "rounded-r-none border-r-0"
		: "rounded-l-none border-l-0";
});

const style = computed(() => {
	return props.error
		? "border-red-300 text-red-700 placeholder-red-300 focus:border-red-300 focus:ring-red"
		: "border-slate-300 placeholder-slate-300 focus:border-violet-500";
});
</script>
