<template>
	<label :class="['block text-sm leading-5', style]">
		<slot></slot>
	</label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	disabled: { type: Boolean, default: false },
});
const style = computed(() =>
	props.disabled
		? "pointer-events-none opacity-50 cursor-not-allowed"
		: "cursor-pointer"
);
</script>
