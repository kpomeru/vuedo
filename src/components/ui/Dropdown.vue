<template>
	<div class="relative" ref="target">
		<span class="cursor-pointer inline relative" @click="open = !open">
			<slot name="trigger"></slot>
		</span>

		<transition name="slide-in-up">
			<div
				v-if="open"
				:class="[
					' min-w-[192px] absolute top-full pt-2 z-10',
					alignTo === 'left' ? 'left-0' : 'right-0',
					// uiStore.sidebarOpen ? 'top-10' : 'top-14',
				]"
			>
				<div class="rounded-md bg-white border border-slate-200 py-2">
					<slot name="content"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useUiStore } from "../../stores/UiStore";
const uiStore = useUiStore();

const props = defineProps({
	alignTo: {
		type: String,
		default: "left",
	},
});

const target = ref(null);
onClickOutside(target, () => (open.value = false));

const open = ref(false);
</script>
