<template>
	<button
		:class="[
			'rounded-md shrink-0 flex items-center justify-center',
			color,
			disabledStyle,
			size,
		]"
		type="button"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
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
		props.size === "base"
			? "w-12 sm:w-10"
			: props.size === "sm"
			? "w-10 sm:w-8"
			: "w-14 sm:w-12";
	return `${h} ${w}`;
});
</script>
