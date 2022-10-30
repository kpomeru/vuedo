<template>
	<button
		:class="[
			'rounded-md shrink-0 flex items-center justify-center space-x-2 text-sm',
			color,
			disabledStyle,
			size,
		]"
		type="button"
	>
		<slot></slot>
	</button>
</template>

<script setup>
import { computed } from "vue";
import { ButtonProps } from "../../../types";
import { buttonData } from "../../../defaults";
import { useUiStore } from "../../../stores/UiStore";
const props = defineProps(ButtonProps);
const uiStore = useUiStore();

const color = computed(() => buttonData.color[props.color]);
const disabledStyle = computed(() =>
	props.disabled || uiStore.pageLoading ? buttonData.disabled : ""
);

const size = computed(() => {
	const h = buttonData.sizeHeight[props.size];
	const w =
		props.size === "base" ? "px-5" : props.size === "sm" ? "px-4" : "px-6";
	return `${h} ${w}`;
});
</script>
